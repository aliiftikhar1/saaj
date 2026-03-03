import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { CollectionItem } from "@/types/client";
import { Collection } from "@prisma/client";
import { wrapServerCall } from "@/lib/server/helpers";

// === FETCHES ===
export async function getCollections(): Promise<
  ServerActionResponse<CollectionItem[]>
> {
  return wrapServerCall(() =>
    prisma.collection.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  );
}

export async function getCollectionById(
  id: string,
): Promise<ServerActionResponse<Collection | null>> {
  return wrapServerCall(() =>
    prisma.collection.findUnique({
      where: { id },
    }),
  );
}
