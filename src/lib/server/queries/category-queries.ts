import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { Category } from "@prisma/client";
import { wrapServerCall } from "@/lib/server/helpers";

// === FETCHES ===
export async function getAllCategories(): Promise<
  ServerActionResponse<Category[]>
> {
  return wrapServerCall(() =>
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  );
}

export async function getCategoryById(
  id: string,
): Promise<ServerActionResponse<Category | null>> {
  return wrapServerCall(() =>
    prisma.category.findUnique({
      where: { id },
    }),
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<ServerActionResponse<Category | null>> {
  return wrapServerCall(() =>
    prisma.category.findUnique({
      where: { slug },
    }),
  );
}
