import type { Metadata } from "next";

import { AdminHeading } from "@/components/admin";
import { AdminBroadcastForm } from "@/components/admin/ui/AdminBroadcastForm";
import { getNewsletterSubscribers } from "@/lib/server/actions/email-actions";

export const metadata: Metadata = {
  title: "Send Newsletter",
};

export default async function AdminBroadcastPage() {
  const subscribersResult = await getNewsletterSubscribers();
  const count = subscribersResult.success ? subscribersResult.data.length : 0;

  return (
    <div>
      <AdminHeading heading="Send Newsletter" />
      <AdminBroadcastForm subscriberCount={count} />
    </div>
  );
}
