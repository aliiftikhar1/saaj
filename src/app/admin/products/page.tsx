import { AdminHeading, AdminProductsTable } from "@/components/admin";
import type { Metadata } from "next";
import { getAllProductsWithTotalSold } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page() {
  // === QUERIES ===
  const products = await getAllProductsWithTotalSold();

  if (!products.success) {
    return <div>Error loading products: {products.error}</div>;
  }

  return (
    <div>
      <AdminHeading heading="View Products" />

      <AdminProductsTable products={products.data} />
    </div>
  );
}
