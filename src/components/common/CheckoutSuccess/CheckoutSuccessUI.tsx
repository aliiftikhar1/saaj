import Link from "next/link";

import { getButtonStyles } from "@/components";
import { routes } from "@/lib/routing/routes";
import { CircleCheckIcon } from "@/components/icons";

type CheckoutSuccessUIProps = {
  orderNumber?: string;
  email?: string;
  trackingToken?: string;
};

export function CheckoutSuccessUI(props: CheckoutSuccessUIProps) {
  // === PROPS ===
  const { orderNumber, email, trackingToken } = props;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 gap-8">
      <CircleCheckIcon size="L" />

      <div className="text-center">
        <h2 className="text-2xl font-medium text-neutral-12 mb-1">Order Confirmed!</h2>
        {orderNumber && (
          <p className="text-sm text-neutral-09 font-medium">Order #{orderNumber}</p>
        )}
      </div>

      <div className="text-neutral-10 text-base text-center max-w-md space-y-2">
        <p>
          Thank you for your purchase. Your order has been successfully placed
          and is being processed.
        </p>
        {email && (
          <p className="text-sm">
            A confirmation email has been sent to{" "}
            <span className="font-medium text-neutral-11">{email}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full max-w-xs">
        {trackingToken && (
          <Link
            href={`/track/${trackingToken}`}
            className={getButtonStyles("dark", "w-full justify-center")}
          >
            Track My Order
          </Link>
        )}
        <Link href={routes.shop} className={getButtonStyles(trackingToken ? "light" : "dark", "w-full justify-center")}>
          Continue Shopping
        </Link>
        <Link href={routes.home} className={getButtonStyles("light", "w-full justify-center")}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
