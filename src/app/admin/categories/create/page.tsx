import type { Metadata } from "next";
import { AdminHeading, AdminCategoriesForm } from "@/components/admin";

export const metadata: Metadata = {
  title: "Create Category",
};

export default function CreateCategoryPage() {
  return (
    <div>
      <AdminHeading heading="Create Category" />
      <AdminCategoriesForm />
    </div>
  );
}
