import type { Metadata } from "next";

import { AdminHeading } from "@/components/admin";
import { AdminSiteContentForm } from "@/components/admin/forms/AdminSiteContentForm";
import { getAllSiteContent } from "@/lib/server/queries";
import { seedSiteContentDefaults } from "./seed";

export const metadata: Metadata = { title: "Site Content" };

export default async function Page() {
  // Ensure defaults are seeded
  await seedSiteContentDefaults();

  const content = await getAllSiteContent();
  if (!content.success) {
    return <div>Error loading site content: {content.error}</div>;
  }
  return (
    <div>
      <AdminHeading heading="Site Content" />
      <p className="text-neutral-10 text-sm mb-4">
        Manage all text content displayed on the storefront. Changes are
        reflected immediately.
      </p>
      <AdminSiteContentForm items={content.data} />
    </div>
  );
}
