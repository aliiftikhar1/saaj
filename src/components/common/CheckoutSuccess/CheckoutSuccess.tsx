"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCartCount } from "@/providers";
import { clearCart } from "@/lib/server/actions";
import { CheckoutSuccessUI } from "./CheckoutSuccessUI";
import { routes } from "@/lib/routing/routes";

type CheckoutSuccessProps = {
  orderNumber?: string;
  email?: string;
  trackingToken?: string;
};

const REDIRECT_DELAY_MS = 4000;

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  // === PROPS ===
  const { orderNumber, email, trackingToken } = props;

  // === CONTEXT ===
  const { refreshCartCount } = useCartCount();
  const router = useRouter();

  // Guard so this only runs once even if the component re-renders
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    clearCart();
    refreshCartCount();

    const timer = setTimeout(() => {
      router.push(routes.shop);
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CheckoutSuccessUI orderNumber={orderNumber} email={email} trackingToken={trackingToken} />;
}
