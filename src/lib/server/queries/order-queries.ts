import { Order, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import {
  OrderDashboardStats,
  GetAdminOrder,
  OrderWithCart,
} from "@/types/client";
import { wrapServerCall } from "../helpers";

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

export async function getOrderedOrders(): Promise<
  ServerActionResponse<OrderWithCart[]>
> {
  return wrapServerCall(async () => {
    const orders = await prisma.order.findMany({
      where: { status: OrderStatus.PAID },
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
      cart: {
        ...order.cart,
        items: order.cart.items.map((item) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
        })),
      },
    }));
  });
}

export async function getDashboardStats(): Promise<
  ServerActionResponse<OrderDashboardStats>
> {
  return wrapServerCall(async () => {
    const [totalOrdersCount, pendingOrdersCount, revenueData] =
      await Promise.all([
        prisma.order.count({
          where: { status: OrderStatus.PAID },
        }),
        prisma.order.count({
          where: { status: OrderStatus.PENDING },
        }),
        prisma.order.aggregate({
          where: { status: OrderStatus.PAID },
          _sum: {
            totalPrice: true,
          },
        }),
      ]);

    const totalRevenue = Number(revenueData._sum.totalPrice ?? 0);
    const averageOrderValue =
      totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

    return {
      totalRevenue,
      totalOrders: totalOrdersCount,
      pendingOrders: pendingOrdersCount,
      averageOrderValue,
    };
  });
}
