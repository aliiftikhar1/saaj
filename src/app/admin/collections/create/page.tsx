import { AdminCollectionsForm, AdminHeading } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Collection" };

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Collection" />
      <AdminCollectionsForm />
    </div>
  );
}
