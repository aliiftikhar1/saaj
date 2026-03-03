import type { Metadata } from "next";
import { AdminHeading, AdminCouponsForm } from "@/components/admin";

export const metadata: Metadata = {
  title: "Create Coupon",
};

export default function CreateCouponPage() {
  return (
    <div>
      <AdminHeading heading="Create Coupon" />
      <AdminCouponsForm />
    </div>
  );
}
