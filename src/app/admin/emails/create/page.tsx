import type { Metadata } from "next";

import { AdminHeading } from "@/components/admin";
import { AdminEmailTemplateForm } from "@/components/admin/ui/AdminEmailTemplateForm";

export const metadata: Metadata = {
  title: "New Email Template",
};

export default function AdminEmailCreatePage() {
  return (
    <div>
      <AdminHeading heading="New Email Template" />
      <AdminEmailTemplateForm />
    </div>
  );
}
