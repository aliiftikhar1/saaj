"use server";

import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import { TestimonialMutationInput, ServerActionResponse } from "@/types/server";
import { CACHE_TAG_TESTIMONIAL } from "@/lib/constants/cache-tags";
import {
  AdminFormAddTestimonialData,
  AdminFormEditTestimonialData,
} from "@/components/admin/forms/AdminTestimonialsForm/schema";
import { BLOB_STORAGE_PREFIXES } from "@/lib/constants";
import { adminRoutes, routes } from "@/lib/routing";
import { wrapServerCall } from "../helpers/generic-helpers";
import { isDemoMode } from "@/lib/server/helpers/demo-mode";

export async function deleteTestimonialById(
  id: string,
): Promise<ServerActionResponse<TestimonialMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }
    const deleted = await prisma.testimonial.delete({ where: { id } });
    revalidatePath(adminRoutes.testimonials);
    revalidatePath(routes.home);
    revalidateTag(CACHE_TAG_TESTIMONIAL, "max");
    return { id: deleted.id };
  });
}

export async function createTestimonial(
  data: AdminFormAddTestimonialData,
): Promise<ServerActionResponse<TestimonialMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id: `demo-${data.name.toLowerCase().replace(/\s+/g, "-")}` };
    }

    let imageSrc: string | null = null;
    if (data.image) {
      const imageFileName =
        BLOB_STORAGE_PREFIXES.TESTIMONIALS +
        data.name.toLowerCase().replace(/\s+/g, "-");
      const blob = await put(imageFileName, data.image, {
        access: "public",
        addRandomSuffix: true,
      });
      imageSrc = blob.url;
    }

    const maxOrder = await prisma.testimonial.aggregate({
      _max: { sortOrder: true },
    });
    const created = await prisma.testimonial.create({
      data: {
        name: data.name,
        text: data.text,
        rating: data.rating,
        imageSrc,
        isActive: data.isActive,
        sortOrder: (maxOrder._max.sortOrder ?? 0) + 1,
      },
    });
    revalidatePath(adminRoutes.testimonials);
    revalidatePath(routes.home);
    revalidateTag(CACHE_TAG_TESTIMONIAL, "max");
    return { id: created.id };
  });
}

export async function updateTestimonialById(
  id: string,
  data: AdminFormEditTestimonialData,
): Promise<ServerActionResponse<TestimonialMutationInput>> {
  return wrapServerCall(async () => {
    if (isDemoMode()) {
      return { id };
    }

    const updateData: Record<string, unknown> = {
      name: data.name,
      text: data.text,
      rating: data.rating,
      isActive: data.isActive,
      sortOrder: data.sortOrder,
    };

    if (data.image) {
      const imageFileName =
        BLOB_STORAGE_PREFIXES.TESTIMONIALS +
        data.name.toLowerCase().replace(/\s+/g, "-");
      const blob = await put(imageFileName, data.image, {
        access: "public",
        addRandomSuffix: true,
      });
      updateData.imageSrc = blob.url;
    }

    await prisma.testimonial.update({
      where: { id },
      data: updateData,
    });

    revalidatePath(adminRoutes.testimonials);
    revalidatePath(routes.home);
    revalidateTag(CACHE_TAG_TESTIMONIAL, "max");
    return { id };
  });
}
