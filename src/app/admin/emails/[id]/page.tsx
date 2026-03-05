import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AdminHeading } from "@/components/admin";
import { AdminEmailTemplateForm } from "@/components/admin/ui/AdminEmailTemplateForm";
import { getEmailTemplate } from "@/lib/server/actions/email-actions";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const result = await getEmailTemplate(id);
  return { title: result.success && result.data ? `Edit: ${result.data.name}` : "Edit Template" };
}

export default async function AdminEmailEditPage(props: Props) {
  const { id } = await props.params;
  const result = await getEmailTemplate(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div>
      <AdminHeading heading={`Edit: ${result.data.name}`} />
      <AdminEmailTemplateForm template={result.data} />
    </div>
  );
}
