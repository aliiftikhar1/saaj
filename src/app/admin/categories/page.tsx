import Link from "next/link";
import type { Metadata } from "next";

import { AdminHeading, AdminButton, AdminCategoriesTable } from "@/components/admin";
import { getAllCategories } from "@/lib/server/queries";
import { adminRoutes } from "@/lib";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminHeading heading="Categories" />
        <Link href={adminRoutes.categoriesCreate}>
          <AdminButton>Add Category</AdminButton>
        </Link>
      </div>
      {categories.success ? (
        <AdminCategoriesTable categories={categories.data} />
      ) : (
        <p className="mt-4 text-red-600">Error loading categories.</p>
      )}
    </div>
  );
}
