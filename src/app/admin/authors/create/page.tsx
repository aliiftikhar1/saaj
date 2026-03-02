import { AdminAuthorsForm, AdminHeading } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Author",
};

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Author" />
      <AdminAuthorsForm />
    </div>
  );
}
