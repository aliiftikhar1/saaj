import Link from "next/link";

import { getButtonStyles } from "@/components";
import { routes } from "@/lib/routing/routes";
import { CircleCheckIcon } from "@/components/icons";

type CheckoutSuccessUIProps = {
  orderNumber?: string;
  email?: string;
};

export function CheckoutSuccessUI(props: CheckoutSuccessUIProps) {
  // === PROPS ===
  const { orderNumber, email } = props;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 gap-8">
      <CircleCheckIcon size="L" />

      <h2 className="text-2xl font-medium text-neutral-12">Order Confirmed!</h2>

      <div className="text-neutral-10 text-base text-center max-w-md space-y-2">
        <p>
          Thank you for your purchase. Your order has been successfully placed
          and is being processed.
        </p>
        {orderNumber && (
          <p className="font-medium text-neutral-11">
            Order Number: #{orderNumber}
          </p>
        )}
        {email && (
          <p className="text-sm">
            A confirmation email has been sent to{" "}
            <span className="font-medium">{email}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link href={routes.shop} className={getButtonStyles("dark")}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
