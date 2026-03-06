import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { CartStatus, OrderStatus, PaymentStatus } from "@prisma/client";
import { adminRoutes } from "@/lib";
import { CACHE_TAG_CART, CACHE_TAG_PRODUCT } from "@/lib/constants/cache-tags";
import { isDemoMode } from "@/lib/server/helpers";

// === SETUP ====
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    console.error("Stripe webhook misconfigured: missing secrets");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error("No orderId in payment intent metadata");
        break;
      }

      const cartId = await prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({
          where: { id: orderId },
          include: {
            cart: {
              include: { items: true },
            },
          },
        });

        if (!order || order.paymentStatus === OrderStatus.PAID) return null;

        if (!isDemoMode()) {
          await Promise.all(
            order.cart.items.map((item) =>
              tx.size.update({
                where: { id: item.sizeId },
                data: {
                  stockReserved: { decrement: item.quantity },
                  stockTotal: { decrement: item.quantity },
                },
              }),
            ),
          );
        }

        await Promise.all([
          tx.order.update({
            where: { id: orderId },
            data: {
              status: OrderStatus.PAID,
              paymentStatus: PaymentStatus.PAID,
            },
          }),
          tx.cart.update({
            where: { id: order.cartId },
            data: {
              status: CartStatus.ORDERED,
              checkoutAt: new Date(),
            },
          }),
        ]);

        return order.cartId;
      });

      if (cartId) {
        // Increment coupon usage if order had a coupon
        try {
          const paidOrder = await prisma.order.findUnique({
            where: { id: orderId },
            select: { couponCode: true },
          });
          if (paidOrder?.couponCode) {
            await prisma.coupon.update({
              where: { code: paidOrder.couponCode },
              data: { currentUses: { increment: 1 } },
            });
          }
        } catch (err) {
          console.error("Failed to increment coupon usage:", err);
        }

        revalidateTag(CACHE_TAG_CART, "max");
        revalidateTag(CACHE_TAG_PRODUCT, "max");
        revalidatePath(adminRoutes.orders);
        revalidatePath(adminRoutes.products);

        // Send confirmation emails exactly once — here in the webhook, not on the success page
        try {
          const { sendOrderConfirmationEmails } = await import("@/lib/server/actions/email-actions");
          await sendOrderConfirmationEmails(orderId);
        } catch (emailErr) {
          console.error("[Webhook] Failed to send order confirmation emails:", emailErr);
        }
      }

      break;
    }

    // Handle failed payment intent
    case "payment_intent.payment_failed": {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      const failedOrderId = failedPayment.metadata.orderId;

      if (failedOrderId) {
        try {
          const existingOrder = await prisma.order.findUnique({
            where: { id: failedOrderId },
          });

          if (!existingOrder) {
            console.error(`Order ${failedOrderId} not found`);
            break;
          }

          if (existingOrder.paymentStatus === PaymentStatus.FAILED) {
            console.log(`Order ${failedOrderId} already marked as FAILED`);
            break;
          }

          await prisma.order.update({
            where: { id: failedOrderId },
            data: {
              paymentStatus: PaymentStatus.FAILED,
              updatedAt: new Date(),
            },
          });
          console.log(`Order ${failedOrderId} payment failed`);
        } catch (error) {
          console.error(`Error updating failed order ${failedOrderId}:`, error);
        }
      }
      break;
    }

    case "charge.refunded": {
      const refundedCharge = event.data.object as Stripe.Charge;
      const refundedOrderId = refundedCharge.metadata?.orderId;

      if (refundedOrderId) {
        try {
          await prisma.order.update({
            where: { id: refundedOrderId },
            data: {
              status: OrderStatus.REFUNDED,
              paymentStatus: PaymentStatus.REFUNDED,
              updatedAt: new Date(),
            },
          });
          console.log(`Order ${refundedOrderId} refunded`);
          revalidatePath(adminRoutes.orders);
        } catch (error) {
          console.error(`Error refunding order ${refundedOrderId}:`, error);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
