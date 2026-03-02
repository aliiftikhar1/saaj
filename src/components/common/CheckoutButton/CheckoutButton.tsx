"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CheckoutButtonUI } from "./CheckoutButtonUI";
import { initiateCheckout } from "@/lib/server/actions";
import { CART_STATUS_CHECKOUT, routes } from "@/lib";

type CheckoutButtonProps = {
  className?: string;
  onOpenChange?: (open: boolean) => void;
};

export function CheckoutButton(props: CheckoutButtonProps) {
  // === PROPS ===
  const { className = "", onOpenChange = () => {} } = props;

  // === STATE ===
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // === HOOKS ===
  const router = useRouter();

  // === FUNCTIONS ===
  const onClick = async () => {
    setIsLoading(true);

    const res = await initiateCheckout(CART_STATUS_CHECKOUT);

    if (!res.success) {
      setIsError(true);
      setIsLoading(false);
      return;
    }
    router.push(routes.checkout);
    onOpenChange(false);
  };

  return (
    <>
      <CheckoutButtonUI
        isLoading={isLoading}
        className={className}
        onClick={onClick}
      />
      {isError && (
        <p className="mt-2 text-sm text-red-500">
          An error occurred during checkout. Please try again.
        </p>
      )}
    </>
  );
}
