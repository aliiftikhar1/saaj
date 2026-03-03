"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { Decimal } from "@prisma/client/runtime/library";

import { prisma } from "@/lib/prisma";
import { ProductMutationInput, ServerActionResponse } from "@/types/server";
import { adminRoutes } from "@/lib/routing";
import { wrapServerCall } from "../helpers/generic-helpers";
import { CACHE_TAG_PRODUCT, SIZE_TEMPLATES } from "@/lib/constants";
import { AdminProductsFormNoFileData } from "@/components/admin/forms/AdminProductsForm/schema";
import { isDemoMode } from "@/lib/server/helpers/demo-mode";

// === MUTATIONS ===
export async function createProduct(
  data: AdminProductsFormNoFileData,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id: `demo-${data.slug}` };
    }

    if (!data.sizeType) {
      throw new Error("sizeType is required");
    }

    const sizes = SIZE_TEMPLATES[data.sizeType].map((size) => ({
      label: size,
      stockTotal: 10, // mock stock value, in real app this would come from form data
    }));

    const created = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: new Decimal(data.price),
        compareAtPrice: data.compareAtPrice
          ? new Decimal(data.compareAtPrice)
          : null,
        categoryId: data.category || null,
        slug: data.slug,
        isActive: data.isActive,
        images: data.imageUrls,
        sizeType: data.sizeType,

        sizes: {
          create: sizes,
        },

        ...(data.collectionIds?.length
          ? { collections: { connect: data.collectionIds.map((id) => ({ id })) } }
          : {}),
      },
    });

    revalidatePath(adminRoutes.products);
    revalidateTag(CACHE_TAG_PRODUCT, "default");

    return { id: created.id };
  });
}

export async function updateProductById(
  id: string,
  data: AdminProductsFormNoFileData,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    const created = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        compareAtPrice: data.compareAtPrice
          ? new Decimal(data.compareAtPrice)
          : null,
        categoryId: data.category || null,
        slug: data.slug,
        isActive: data.isActive,
        images: data.imageUrls,
        collections: {
          set: (data.collectionIds || []).map((cid) => ({ id: cid })),
        },
      },
    });

    revalidatePath(adminRoutes.products);
    revalidateTag(CACHE_TAG_PRODUCT, "default");

    return { id: created.id };
  });
}

export async function deleteProductById(
  id: string,
): Promise<ServerActionResponse<ProductMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    const deleted = await prisma.product.delete({ where: { id } });

    revalidatePath(adminRoutes.products);
    revalidateTag(CACHE_TAG_PRODUCT, "default");

    return { id: deleted.id };
  });
}

/** Toggle the isFeatured flag on a product */
export async function toggleProductFeatured(
  id: string,
): Promise<ServerActionResponse<{ id: string; isFeatured: boolean }>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id, isFeatured: false };
    }

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Product not found");

    const updated = await prisma.product.update({
      where: { id },
      data: { isFeatured: !product.isFeatured },
    });

    revalidatePath(adminRoutes.products);
    revalidateTag(CACHE_TAG_PRODUCT, "default");

    return { id: updated.id, isFeatured: updated.isFeatured };
  });
}
