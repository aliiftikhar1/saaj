import { getTeamMemberById } from "@/lib/server/queries";
import type { Metadata } from "next";
import { AdminTeamForm, AdminHeading } from "@/components/admin";

type AdminTeamMemberPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata(
  props: AdminTeamMemberPageProps,
): Promise<Metadata> {
  const { id } = await props.params;
  const data = await getTeamMemberById(id);
  if (!data.success || !data.data) {
    return { title: "Edit Team Member" };
  }
  return { title: `Edit ${data.data.name}` };
}

export default async function Page({ params }: AdminTeamMemberPageProps) {
  const { id } = await params;
  const data = await getTeamMemberById(id);
  if (!data.success || !data.data) {
    return <p>Team member not found.</p>;
  }
  return (
    <section>
      <AdminHeading heading="Edit Team Member" />
      <AdminTeamForm isEditMode={true} teamMemberData={data.data} />
    </section>
  );
}
