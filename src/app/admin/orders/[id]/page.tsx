import { AdminHeading, AdminOrderView } from "@/components/admin";
import type { Metadata } from "next";
import { getAdminOrderById } from "@/lib/server/queries";

type AdminOrderPageProps = { params: { id: string } };

export async function generateMetadata(
  props: AdminOrderPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const order = await getAdminOrderById(id);

  if (!order.success || !order.data) {
    return {
      title: "Order",
    };
  }

  return {
    title: `Order #${order.data.orderNumber}`,
  };
}

export default async function Page({ params }: AdminOrderPageProps) {
  // === PARAMS ===
  const { id } = await params;

  // === QUERIES ===
  const order = await getAdminOrderById(id);

  if (!order.success || !order.data) {
    return <p>Order not found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <AdminHeading heading="View Order" />
      <AdminOrderView order={order.data} />
    </div>
  );
}
