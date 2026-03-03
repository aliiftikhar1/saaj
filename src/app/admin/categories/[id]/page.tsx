import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminHeading, AdminCategoriesForm } from "@/components/admin";
import { getCategoryById } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Edit Category",
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category.success || !category.data) {
    notFound();
  }

  return (
    <div>
      <AdminHeading heading="Edit Category" />
      <AdminCategoriesForm isEditMode categoryData={category.data} />
    </div>
  );
}
