"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { AuthorMutationInput, ServerActionResponse } from "@/types/server";
import {
  AdminFormAddAuthorsData,
  AdminFormEditAuthorsData,
} from "@/components/admin/forms/AdminAuthorsForm/schema";
import { BLOB_STORAGE_PREFIXES } from "@/lib/constants";
import { adminRoutes } from "@/lib/routing";
import { wrapServerCall } from "../helpers/generic-helpers";
import { isDemoMode } from "@/lib/server/helpers/demo-mode";

// === MUTATIONS ===
export async function deleteAuthorById(
  id: string,
): Promise<ServerActionResponse<AuthorMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    const deleted = await prisma.author.delete({ where: { id } });

    revalidatePath(adminRoutes.authors);
    revalidatePath(adminRoutes.blogsCreate);

    return { id: deleted.id };
  });
}

export async function createAuthor(
  data: AdminFormAddAuthorsData,
): Promise<ServerActionResponse<AuthorMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id: `demo-${data.name.toLowerCase().replace(/\s+/g, "-")}` };
    }

    const imageFile = data.image;
    const imageFileName = BLOB_STORAGE_PREFIXES.AUTHORS + data.name;

    const blob = await put(imageFileName, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });

    const created = await prisma.author.create({
      data: {
        name: data.name,
        occupation: data.occupation,
        avatarUrl: blob.url,
      },
    });

    revalidatePath(adminRoutes.authors);
    revalidatePath(adminRoutes.blogsCreate);

    return { id: created.id };
  });
}

export async function updateAuthorById(
  id: string,
  data: AdminFormEditAuthorsData,
): Promise<ServerActionResponse<AuthorMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    revalidatePath(adminRoutes.authors);
    revalidatePath(adminRoutes.blogs);
    revalidatePath(adminRoutes.blogsCreate);

    // If there's a new image, upload it and update the avatarUrl
    if (data.image) {
      const imageFile = data.image;
      const imageFileName = BLOB_STORAGE_PREFIXES.AUTHORS + data.name;

      const blob = await put(imageFileName, imageFile, {
        access: "public",
        addRandomSuffix: true,
      });

      await prisma.author.update({
        where: { id },
        data: {
          name: data.name,
          occupation: data.occupation,
          avatarUrl: blob.url,
        },
      });

      return { id };
    }

    // If no new image, just update other fields
    await prisma.author.update({
      where: { id },
      data: {
        name: data.name,
        occupation: data.occupation,
      },
    });
    return { id };
  });
}
