import Link from "next/link";
import type { Metadata } from "next";

import { AdminHeading, AdminButton, AdminCouponsTable } from "@/components/admin";
import { getCoupons } from "@/lib/server/queries";
import { adminRoutes } from "@/lib";

export const metadata: Metadata = {
  title: "Coupons",
};

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminHeading heading="Coupons" />
        <Link href={adminRoutes.couponsCreate}>
          <AdminButton>Add Coupon</AdminButton>
        </Link>
      </div>
      {coupons.success ? (
        <AdminCouponsTable coupons={coupons.data} />
      ) : (
        <p className="mt-4 text-red-600">Error loading coupons.</p>
      )}
    </div>
  );
}
