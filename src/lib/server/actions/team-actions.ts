"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { TeamMemberMutationInput, ServerActionResponse } from "@/types/server";
import {
  AdminFormAddTeamData,
  AdminFormEditTeamData,
} from "@/components/admin/forms/AdminTeamForm/schema";
import { BLOB_STORAGE_PREFIXES } from "@/lib/constants";
import { adminRoutes, routes } from "@/lib/routing";
import { wrapServerCall } from "../helpers/generic-helpers";
import { isDemoMode } from "@/lib/server/helpers/demo-mode";

// === MUTATIONS ===
export async function deleteTeamMemberById(
  id: string,
): Promise<ServerActionResponse<TeamMemberMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    const deleted = await prisma.teamMember.delete({ where: { id } });

    revalidatePath(adminRoutes.team);
    revalidatePath(routes.about);

    return { id: deleted.id };
  });
}

export async function createTeamMember(
  data: AdminFormAddTeamData,
): Promise<ServerActionResponse<TeamMemberMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id: `demo-${data.name.toLowerCase().replace(/\s+/g, "-")}` };
    }

    const imageFile = data.image;
    const imageFileName = BLOB_STORAGE_PREFIXES.TEAM + data.name;

    const blob = await put(imageFileName, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });

    const maxOrder = await prisma.teamMember.aggregate({
      _max: { sortOrder: true },
    });

    const created = await prisma.teamMember.create({
      data: {
        name: data.name,
        position: data.position,
        imageSrc: blob.url,
        sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
      },
    });

    revalidatePath(adminRoutes.team);
    revalidatePath(routes.about);

    return { id: created.id };
  });
}

export async function updateTeamMemberById(
  id: string,
  data: AdminFormEditTeamData,
): Promise<ServerActionResponse<TeamMemberMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    revalidatePath(adminRoutes.team);
    revalidatePath(routes.about);

    if (data.image) {
      const imageFile = data.image;
      const imageFileName = BLOB_STORAGE_PREFIXES.TEAM + data.name;

      const blob = await put(imageFileName, imageFile, {
        access: "public",
        addRandomSuffix: true,
      });

      await prisma.teamMember.update({
        where: { id },
        data: {
          name: data.name,
          position: data.position,
          imageSrc: blob.url,
          sortOrder: data.sortOrder,
        },
      });

      return { id };
    }

    await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        position: data.position,
        sortOrder: data.sortOrder,
      },
    });
    return { id };
  });
}
