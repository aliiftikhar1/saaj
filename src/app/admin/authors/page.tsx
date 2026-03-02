import Link from "next/link";
import type { Metadata } from "next";

import { adminRoutes, cn } from "@/lib";
import {
  AdminHeading,
  buttonVariants,
  AdminAuthorsTable,
} from "@/components/admin";
import { getAuthors } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Authors",
};

export default async function Page() {
  // === QUERIES ===
  const authors = await getAuthors();

  if (!authors.success) {
    return <div>Error loading authors: {authors.error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-end">
        <AdminHeading heading="View Authors" />
        <div className="flex gap-3">
          <Link
            href={adminRoutes.authorsCreate}
            className={cn(
              buttonVariants({ variant: "default", size: "default" }),
            )}
          >
            Add Author
          </Link>
        </div>
      </div>
      <AdminAuthorsTable authors={authors.data} />
    </div>
  );
}
