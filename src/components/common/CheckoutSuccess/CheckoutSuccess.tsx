"use client";

import { useEffect, useRef } from "react";
import { useCartCount } from "@/providers";
import { clearCart } from "@/lib/server/actions";
import { CheckoutSuccessUI } from "./CheckoutSuccessUI";

type CheckoutSuccessProps = {
  orderNumber?: string;
  email?: string;
  trackingToken?: string;
};

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  // === PROPS ===
  const { orderNumber, email, trackingToken } = props;

  // === CONTEXT ===
  const { refreshCartCount } = useCartCount();

  // Guard so this only runs once even if the component re-renders
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    clearCart();
    refreshCartCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CheckoutSuccessUI orderNumber={orderNumber} email={email} trackingToken={trackingToken} />;
}
