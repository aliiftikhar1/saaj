"use client";

import { useEffect } from "react";
import { useCartCount } from "@/providers";
import { clearCart } from "@/lib/server/actions";
import { CheckoutSuccessUI } from "./CheckoutSuccessUI";

type CheckoutSuccessProps = {
  orderNumber?: string;
  email?: string;
};

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  // === PROPS ===
  const { orderNumber, email } = props;

  // === CONTEXT ===
  const { refreshCartCount } = useCartCount();

  // EFFECTS
  useEffect(() => {
    clearCart();
    refreshCartCount();
  }, [refreshCartCount]);

  return <CheckoutSuccessUI orderNumber={orderNumber} email={email} />;
}
