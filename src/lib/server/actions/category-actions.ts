"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { CategoryMutationInput, ServerActionResponse } from "@/types/server";
import { adminRoutes, routes } from "@/lib/routing";
import { wrapServerCall } from "../helpers/generic-helpers";
import { isDemoMode } from "@/lib/server/helpers/demo-mode";

// === MUTATIONS ===
export async function createCategory(data: {
  name: string;
  slug: string;
  tagline?: string;
  imageUrl?: string;
}): Promise<ServerActionResponse<CategoryMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id: `demo-${data.slug}` };
    }

    const maxOrder = await prisma.category.aggregate({
      _max: { sortOrder: true },
    });

    const created = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline ?? "",
        imageUrl: data.imageUrl ?? "",
        sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
      },
    });

    revalidatePath(adminRoutes.categories);
    revalidatePath(routes.shop);

    return { id: created.id };
  });
}

export async function updateCategoryById(
  id: string,
  data: {
    name: string;
    slug: string;
    tagline?: string;
    imageUrl?: string;
  },
): Promise<ServerActionResponse<CategoryMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline ?? "",
        imageUrl: data.imageUrl ?? "",
      },
    });

    revalidatePath(adminRoutes.categories);
    revalidatePath(routes.shop);

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

    return { id: deleted.id };
  });
}
