import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSiteContentMap } from "@/lib/server/queries";

const FALLBACK_DELIVERY: Record<string, string> = {
  PENDING:    "7–10 business days",
  PAID:       "5–7 business days",
  PROCESSING: "5–7 business days",
  SHIPPED:    "2–4 business days",
  DELIVERED:  "Delivered",
  CANCELLED:  "—",
  REFUNDED:   "—",
};

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token || typeof token !== "string" || token.length < 10 || token.length > 64) {
    return NextResponse.json(
      { error: "Invalid tracking ID" },
      { status: 400 },
    );
  }

  const [order, siteContentResult] = await Promise.all([
    prisma.order.findUnique({
      where: { trackingToken: token },
      select: {
        orderNumber: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        delieveryName: true,
        deliveryCity: true,
        deliveryState: true,
        deliveryCountry: true,
        shippingAmount: true,
        discountAmount: true,
        couponCode: true,
        totalPrice: true,
        cart: {
          select: {
            items: {
              select: {
                title: true,
                quantity: true,
                unitPrice: true,
                image: true,
                size: { select: { label: true } },
              },
            },
          },
        },
      },
    }),
    getSiteContentMap(),
  ]);

  if (!order) {
    return NextResponse.json(
      { error: "Order not found. Please check your tracking ID and try again." },
      { status: 404 },
    );
  }

  const siteContent = siteContentResult.success ? siteContentResult.data : {};
  const status = order.status;
  let estimatedDelivery = "—";
  if (status === "DELIVERED") estimatedDelivery = "Delivered";
  else if (status !== "CANCELLED" && status !== "REFUNDED") {
    const key = `delivery_estimate_${status.toLowerCase()}`;
    estimatedDelivery = siteContent[key] || FALLBACK_DELIVERY[status] || "—";
  }

  return NextResponse.json({
    orderNumber: order.orderNumber,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    customerName: order.delieveryName,
    deliveryCity: order.deliveryCity,
    deliveryState: order.deliveryState,
    deliveryCountry: order.deliveryCountry,
    shippingAmount: order.shippingAmount ? Number(order.shippingAmount) : 0,
    discountAmount: order.discountAmount ? Number(order.discountAmount) : 0,
    couponCode: order.couponCode,
    totalPrice: Number(order.totalPrice),
    estimatedDelivery,
    items: order.cart.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      image: item.image,
      size: item.size.label,
    })),
  });
}
