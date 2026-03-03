import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdminHeading, AdminCouponsForm } from "@/components/admin";
import { getCouponById } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Edit Coupon",
};

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coupon = await getCouponById(id);

  if (!coupon.success || !coupon.data) {
    notFound();
  }

  return (
    <div>
      <AdminHeading heading="Edit Coupon" />
      <AdminCouponsForm isEditMode couponData={coupon.data} />
    </div>
  );
}
