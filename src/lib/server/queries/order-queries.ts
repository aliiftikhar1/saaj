import { unstable_cache } from "next/cache";

import { Order, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import {
  OrderDashboardStats,
  GetAdminOrder,
  OrderWithCart,
  DashboardRecentOrder,
} from "@/types/client";
import { wrapServerCall } from "../helpers";
import { CACHE_TAG_CART } from "@/lib/constants/cache-tags";

export async function getCurrentOrderById(
  orderId: string,
): Promise<ServerActionResponse<Order | null>> {
  return wrapServerCall(async () => {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    return order;
  });
}

export async function getAdminOrderById(
  orderId: string,
): Promise<ServerActionResponse<GetAdminOrder | null>> {
  return wrapServerCall(async () => {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        cart: {
          include: {
            items: {
              select: {
                id: true,
                quantity: true,
                unitPrice: true,
                title: true,
                image: true,
                size: {
                  select: {
                    label: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return {
      ...order,
      totalPrice: Number(order.totalPrice),
      shippingAmount: order.shippingAmount ? Number(order.shippingAmount) : null,
      discountAmount: order.discountAmount ? Number(order.discountAmount) : null,
      cart: {
        ...order.cart,
        items: order.cart.items.map((item) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
        })),
      },
    };
  });
}

const getOrderedOrdersCached = unstable_cache(
  async () => {
    const orders = await prisma.order.findMany({
      include: {
        cart: {
          include: {
            items: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return orders.map((order) => ({
      ...order,
      totalPrice: Number(order.totalPrice),
      shippingAmount: order.shippingAmount ? Number(order.shippingAmount) : null,
      discountAmount: order.discountAmount ? Number(order.discountAmount) : null,
      cart: {
        ...order.cart,
        items: order.cart.items.map((item) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
        })),
      },
    }));
  },
  [CACHE_TAG_CART, "ordered-orders"],
  { tags: [CACHE_TAG_CART], revalidate: 60 },
);

export async function getOrderedOrders(): Promise<
  ServerActionResponse<OrderWithCart[]>
> {
  return wrapServerCall(() => getOrderedOrdersCached());
}

export async function getDashboardStats(): Promise<
  ServerActionResponse<OrderDashboardStats>
> {
  return wrapServerCall(async () => {
    const [paidCount, pendingCount, revenueData, statusGroups, recentRaw] =
      await Promise.all([
        prisma.order.count({ where: { status: OrderStatus.PAID } }),
        prisma.order.count({ where: { status: OrderStatus.PENDING } }),
        prisma.order.aggregate({
          where: { status: OrderStatus.PAID },
          _sum: { totalPrice: true },
        }),
        prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
        prisma.order.findMany({
          take: 6,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            orderNumber: true,
            delieveryName: true,
            deliveryEmail: true,
            totalPrice: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    const totalRevenue = Number(revenueData._sum.totalPrice ?? 0);
    const averageOrderValue = paidCount > 0 ? totalRevenue / paidCount : 0;

    const statusBreakdown: Record<string, number> = {};
    statusGroups.forEach((g) => {
      statusBreakdown[g.status] = g._count._all;
    });

    const recentOrders: DashboardRecentOrder[] = recentRaw.map((o) => ({
      ...o,
      totalPrice: Number(o.totalPrice),
    }));

    return {
      totalRevenue,
      totalOrders: paidCount,
      pendingOrders: pendingCount,
      averageOrderValue,
      statusBreakdown,
      recentOrders,
    };
  });
}
