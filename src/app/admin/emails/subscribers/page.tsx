import type { Metadata } from "next";

import { AdminHeading } from "@/components/admin";
import { AdminSubscribersTable } from "@/components/admin/ui/AdminSubscribersTable";
import { getNewsletterSubscribers } from "@/lib/server/actions/email-actions";

export const metadata: Metadata = {
  title: "Newsletter Subscribers",
};

export default async function AdminSubscribersPage() {
  const result = await getNewsletterSubscribers();

  return (
    <div>
      <AdminHeading heading="Newsletter Subscribers" />
      {result.success ? (
        <AdminSubscribersTable subscribers={result.data} />
      ) : (
        <p className="mt-4 text-red-600">Error loading subscribers.</p>
      )}
    </div>
  );
}
