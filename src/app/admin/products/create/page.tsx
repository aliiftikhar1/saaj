import { AdminProductsForm, AdminHeading } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Product" />
      <AdminProductsForm />
    </div>
  );
}
