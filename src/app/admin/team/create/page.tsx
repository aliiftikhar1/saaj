import { AdminTeamForm, AdminHeading } from "@/components/admin";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Team Member" };

export default async function Page() {
  return (
    <div>
      <AdminHeading heading="Add Team Member" />
      <AdminTeamForm />
    </div>
  );
}
