import { AdminProductsForm, AdminHeading } from "@/components/admin";
import { getCollections, getAllCategories } from "@/lib/server/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function Page() {
  const [collectionsResponse, categoriesResponse] = await Promise.all([
    getCollections(),
    getAllCategories(),
  ]);
  const collections = collectionsResponse.success
    ? collectionsResponse.data
    : [];
  const categories = categoriesResponse.success
    ? categoriesResponse.data
    : [];

  return (
    <div>
      <AdminHeading heading="Add Product" />
      <AdminProductsForm
        availableCollections={collections}
        availableCategories={categories}
      />
    </div>
  );
}
