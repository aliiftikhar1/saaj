import Link from "next/link";
import type { Metadata } from "next";

import { adminRoutes, cn } from "@/lib";
import {
  AdminHeading,
  buttonVariants,
  AdminCollectionsTable,
} from "@/components/admin";
import { getCollections } from "@/lib/server/queries";

export const metadata: Metadata = { title: "Collections" };

export default async function Page() {
  const collections = await getCollections();
  if (!collections.success) {
    return <div>Error loading collections: {collections.error}</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-end">
        <AdminHeading heading="View Collections" />
        <div className="flex gap-3">
          <Link
            href={adminRoutes.collectionsCreate}
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
            )}
          >
            Add Collection
          </Link>
        </div>
      </div>
      <AdminCollectionsTable collections={collections.data} />
    </div>
  );
}
