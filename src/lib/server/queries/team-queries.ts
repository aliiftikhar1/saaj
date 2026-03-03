import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { TeamMemberItem } from "@/types/client";
import { TeamMember } from "@prisma/client";
import { wrapServerCall } from "@/lib/server/helpers";

// === FETCHES ===
export async function getTeamMembers(): Promise<
  ServerActionResponse<TeamMemberItem[]>
> {
  return wrapServerCall(() =>
    prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  );
}

export async function getTeamMemberById(
  id: string,
): Promise<ServerActionResponse<TeamMember | null>> {
  return wrapServerCall(() =>
    prisma.teamMember.findUnique({
      where: { id },
    }),
  );
}
