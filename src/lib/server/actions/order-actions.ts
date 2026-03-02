"use server";

import { revalidatePath } from "next/cache";
import { Order, OrderStatus } from "@prisma/client";

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

        updatedAt: new Date(),
      },
    });

    revalidatePath(adminRoutes.orders);

    return orderId;
  });
}
