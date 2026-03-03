import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { TestimonialItem } from "@/types/client";
import { Testimonial } from "@prisma/client";
import { wrapServerCall } from "@/lib/server/helpers";

export async function getTestimonials(): Promise<
  ServerActionResponse<TestimonialItem[]>
> {
  return wrapServerCall(() =>
    prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  );
}

export async function getActiveTestimonials(): Promise<
  ServerActionResponse<TestimonialItem[]>
> {
  return wrapServerCall(() =>
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  );
}

export async function getTestimonialById(
  id: string,
): Promise<ServerActionResponse<Testimonial | null>> {
  return wrapServerCall(() =>
    prisma.testimonial.findUnique({
      where: { id },
    }),
  );
}
