import { AdminHeading, AdminOrdersTable } from "@/components/admin";
import type { Metadata } from "next";
import { getOrderedOrders } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function Page() {
  // === QUERIES ===
  const orders = await getOrderedOrders();

  if (!orders.success) {
    return <div>Error loading orders: {orders.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Orders" />

      <AdminOrdersTable orders={orders.data} />
    </div>
  );
}
