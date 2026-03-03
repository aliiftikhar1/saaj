"use server";

import { revalidatePath } from "next/cache";
import { Order, OrderStatus, PaymentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { wrapServerCall } from "../helpers";
import { DeliveryDetailsData } from "@/components";
import { cookies } from "next/headers";
import { COOKIE_CART_ID } from "@/lib/constants";
import { adminRoutes } from "@/lib/routing";

// === QUERIES ===
export async function getCurrentOrder(): Promise<
  ServerActionResponse<Order | null>
> {
  return wrapServerCall(async () => {
    const cookieStore = await cookies();
    const cartId = cookieStore.get(COOKIE_CART_ID)?.value;

    const order = await prisma.order.findUnique({
      where: { cartId },
    });

    return order;
  });
}

// === MUTATIONS ===
export async function updateOrderDetails(
  orderId: string,
  input: DeliveryDetailsData,
): Promise<ServerActionResponse<string>> {
  return wrapServerCall(async () => {
    // Validate order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    if (existingOrder.status !== OrderStatus.PENDING) {
      throw new Error("Order cannot be modified");
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        delieveryName: input.fullName,
        deliveryEmail: input.email,
        deliveryPhone: input.phone,
        deliveryStreetAddress: input.address,
        deliveryCity: input.city,
        deliveryState: input.state,
        deliveryPostcode: input.zipCode,
        deliveryCountry: input.country,

        billingName: input.fullName,
        billingStreetAddress: input.useSameBillingAddress
          ? input.address
          : input.billingAddress,
        billingCity: input.useSameBillingAddress
          ? input.city
          : input.billingCity,
        billingState: input.useSameBillingAddress
          ? input.state
          : input.billingState,
        billingPostcode: input.useSameBillingAddress
          ? input.zipCode
          : input.billingZipCode,
        billingCountry: input.useSameBillingAddress
          ? input.country
          : input.billingCountry,

        orderNote: input.orderNote ?? null,

        updatedAt: new Date(),
      },
    });

    revalidatePath(adminRoutes.orders);

    return orderId;
  });
}

/** Update order status (admin) */
export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<ServerActionResponse<{ id: string; status: string }>> {
  return wrapServerCall(async () => {
    const validStatuses = Object.values(OrderStatus);
    if (!validStatuses.includes(status as OrderStatus)) {
      throw new Error(`Invalid order status: ${status}`);
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as OrderStatus, updatedAt: new Date() },
    });

    revalidatePath(adminRoutes.orders);
    revalidatePath(`${adminRoutes.orders}/${orderId}`);

    return { id: updated.id, status: updated.status };
  });
}

/** Update payment status (admin) */
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: string,
): Promise<ServerActionResponse<{ id: string; paymentStatus: string }>> {
  return wrapServerCall(async () => {
    const validStatuses = Object.values(PaymentStatus);
    if (!validStatuses.includes(paymentStatus as PaymentStatus)) {
      throw new Error(`Invalid payment status: ${paymentStatus}`);
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: paymentStatus as PaymentStatus, updatedAt: new Date() },
    });

    revalidatePath(adminRoutes.orders);
    revalidatePath(`${adminRoutes.orders}/${orderId}`);

    return { id: updated.id, paymentStatus: updated.paymentStatus };
  });
}
