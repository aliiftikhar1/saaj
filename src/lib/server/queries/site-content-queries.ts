import { prisma } from "@/lib/prisma";
import { ServerActionResponse } from "@/types/server";
import { SiteContentItem } from "@/types/client";
import { SiteContent } from "@prisma/client";
import { wrapServerCall } from "@/lib/server/helpers";

// === FETCHES ===
export async function getAllSiteContent(): Promise<
  ServerActionResponse<SiteContentItem[]>
> {
  return wrapServerCall(() =>
    prisma.siteContent.findMany({
      orderBy: { key: "asc" },
    }),
  );
}

export async function getSiteContentByKey(
  key: string,
): Promise<ServerActionResponse<SiteContent | null>> {
  return wrapServerCall(() =>
    prisma.siteContent.findUnique({
      where: { key },
    }),
  );
}

export async function getSiteContentById(
  id: string,
): Promise<ServerActionResponse<SiteContent | null>> {
  return wrapServerCall(() =>
    prisma.siteContent.findUnique({
      where: { id },
    }),
  );
}

export async function getSiteContentMap(): Promise<
  ServerActionResponse<Record<string, string>>
> {
  return wrapServerCall(async () => {
    const items = await prisma.siteContent.findMany();
    return items.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>,
    );
  });
}
