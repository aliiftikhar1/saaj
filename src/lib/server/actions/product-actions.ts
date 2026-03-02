"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { ProductCategoryEnum } from "@prisma/client";
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
        category: data.category as ProductCategoryEnum,
        slug: data.slug,
        isActive: data.isActive,
        images: data.imageUrls,
        sizeType: data.sizeType,

        sizes: {
          create: sizes,
        },
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
        category: data.category as ProductCategoryEnum,
        slug: data.slug,
        isActive: data.isActive,
        images: data.imageUrls,
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
