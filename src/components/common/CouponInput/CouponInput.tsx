"use client";

import { useState } from "react";
import { toast } from "sonner";
import { applyCouponCode, removeCouponCode } from "@/lib/server/actions";

type CouponInputProps = {
  appliedCoupon?: {
    code: string;
    discountPercent: number;
  } | null;
};

export function CouponInput({ appliedCoupon }: CouponInputProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    setIsLoading(true);
    const result = await applyCouponCode(trimmed);
    setIsLoading(false);

    if (!result.success) {
      toast.error(result.error || "Invalid coupon code");
      return;
    }

    if (!result.data.valid) {
      toast.error(result.data.message || "Invalid coupon code");
      return;
    }

    toast.success(`Coupon applied! ${result.data.discountPercent}% off`);
    setCode("");
  };

  const handleRemove = async () => {
    setIsLoading(true);
    await removeCouponCode();
    setIsLoading(false);
    toast.success("Coupon removed");
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-sm px-3 py-2">
        <div>
          <span className="text-sm font-medium text-green-800">
            {appliedCoupon.code}
          </span>
          <span className="text-xs text-green-600 ml-2">
            {appliedCoupon.discountPercent}% off
          </span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          disabled={isLoading}
          className="text-xs text-red-600 hover:text-red-800 font-medium cursor-pointer disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Coupon code"
        className="flex-1 border border-neutral-04 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            void handleApply();
          }
        }}
      />
      <button
        type="button"
        onClick={handleApply}
        disabled={isLoading || !code.trim()}
        className="px-4 py-2 text-sm font-medium bg-black text-white rounded-sm hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? "..." : "Apply"}
      </button>
    </div>
  );
}
