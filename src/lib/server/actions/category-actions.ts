"use server";

import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import { CategoryMutationInput, ServerActionResponse } from "@/types/server";
import { adminRoutes, routes } from "@/lib/routing";
import { BLOB_STORAGE_PREFIXES, CACHE_TAG_CATEGORY } from "@/lib/constants";
import { wrapServerCall } from "../helpers/generic-helpers";
import { isDemoMode } from "@/lib/server/helpers/demo-mode";

type CategoryInput = {
  name: string;
  slug: string;
  tagline?: string;
  imageUrl?: string;
  image?: Blob;
};

// === MUTATIONS ===
export async function createCategory(
  data: CategoryInput,
): Promise<ServerActionResponse<CategoryMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id: `demo-${data.slug}` };
    }

    let resolvedImageUrl = data.imageUrl ?? "";

    if (data.image && data.image.size > 0) {
      const blob = await put(
        BLOB_STORAGE_PREFIXES.CATEGORIES + data.slug,
        data.image,
        { access: "public", addRandomSuffix: true },
      );
      resolvedImageUrl = blob.url;
    }

    const maxOrder = await prisma.category.aggregate({
      _max: { sortOrder: true },
    });

    const created = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline ?? "",
        imageUrl: resolvedImageUrl,
        sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
      },
    });

    revalidatePath(adminRoutes.categories);
    revalidatePath(routes.shop);
    revalidateTag(CACHE_TAG_CATEGORY, "max");

    return { id: created.id };
  });
}

export async function updateCategoryById(
  id: string,
  data: CategoryInput,
): Promise<ServerActionResponse<CategoryMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    let resolvedImageUrl = data.imageUrl ?? "";

    if (data.image && data.image.size > 0) {
      const blob = await put(
        BLOB_STORAGE_PREFIXES.CATEGORIES + data.slug,
        data.image,
        { access: "public", addRandomSuffix: true },
      );
      resolvedImageUrl = blob.url;
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline ?? "",
        imageUrl: resolvedImageUrl,
      },
    });

    revalidatePath(adminRoutes.categories);
    revalidatePath(routes.shop);
    revalidateTag(CACHE_TAG_CATEGORY, "max");

    return { id: updated.id };
  });
}

export async function deleteCategoryById(
  id: string,
): Promise<ServerActionResponse<CategoryMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    // Before deleting, unassign products from this category
    await prisma.product.updateMany({
      where: { categoryId: id },
      data: { categoryId: null },
    });

    const deleted = await prisma.category.delete({ where: { id } });

    revalidatePath(adminRoutes.categories);
    revalidatePath(routes.shop);
    revalidateTag(CACHE_TAG_CATEGORY, "max");

    return { id: deleted.id };
  });
}
