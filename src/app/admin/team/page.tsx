import Link from "next/link";
import type { Metadata } from "next";

import { adminRoutes, cn } from "@/lib";
import {
  AdminHeading,
  buttonVariants,
  AdminTeamTable,
} from "@/components/admin";
import { getTeamMembers } from "@/lib/server/queries";

export const metadata: Metadata = { title: "Team Members" };

export default async function Page() {
  const members = await getTeamMembers();
  if (!members.success) {
    return <div>Error loading team members: {members.error}</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-end">
        <AdminHeading heading="View Team Members" />
        <div className="flex gap-3">
          <Link
            href={adminRoutes.teamCreate}
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
            )}
          >
            Add Team Member
          </Link>
        </div>
      </div>
      <AdminTeamTable members={members.data} />
    </div>
  );
}
