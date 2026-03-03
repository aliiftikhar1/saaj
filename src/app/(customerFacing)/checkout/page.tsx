import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { BaseSection } from "@/components";
import { getCart } from "@/lib/server/queries/cart-queries";
import { CheckoutCartSidebar } from "@/components";
import { getCurrentOrder } from "@/lib/server/actions";
import { CheckoutForm } from "@/components/common/CheckoutForm/CheckoutForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  // === FETCH DATA ===
  const cartResult = await getCart();
  const orderResult = await getCurrentOrder();

  // === REDIRECT IF NO CART/ORDER ===
  if (
    !orderResult.success ||
    !orderResult.data ||
    !orderResult.data.stripeSessionId ||
    !cartResult.success ||
    cartResult.data.items.length === 0
  ) {
    redirect("/cart");
  }

  // === PREPARE DATA ===
  const { items, summary } = cartResult.data;
  const { id: orderId, stripeSessionId } = orderResult.data;

  // === COUPON DISCOUNT INFO ===
  const order = orderResult.data;
  let discount: { code: string; percent: number; amount: string } | null = null;

  if (order.couponCode && order.discountPercent && order.discountAmount) {
    const discountAmt = Number(order.discountAmount);
    discount = {
      code: order.couponCode,
      percent: order.discountPercent,
      amount: `$${discountAmt.toFixed(2)}`,
    };
    // Recalculate discounted total from subtotal
    const subtotalNum = parseFloat(summary.subtotal.replace(/[^0-9.]/g, ""));
    summary.discountedTotal = `$${(subtotalNum - discountAmt).toFixed(2)}`;
  }

  // === SHIPPING INFO ===
  const shippingAmount = order.shippingAmount ? Number(order.shippingAmount) : 0;

  // === TOTAL (from order — includes discount + shipping, matches Stripe charge) ===
  const orderTotal = Number(order.totalPrice);
  summary.total = `$${orderTotal.toFixed(2)}`;
  // If discount is applied, discountedTotal is not needed separately — total already reflects it
  if (discount) {
    summary.discountedTotal = `$${orderTotal.toFixed(2)}`;
  }

  return (
    <main>
      <BaseSection id="checkout-section" className="pb-16 md:pb-25">
        <div className="flex flex-col gap-6 pt-6 md:pt-10">
          <h1 className="pb-2 md:self-center md:pb-4 font-medium text-3xl">
            Checkout
          </h1>

          {/* Mobile: Cart above, Desktop: Side-by-side */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Cart shown above on mobile only */}
            <div className="md:hidden">
              <CheckoutCartSidebar items={items} summary={summary} discount={discount} shippingAmount={shippingAmount} />
            </div>

            {/* Form */}
            <div className="w-full md:w-[60%]">
              <CheckoutForm
                orderId={orderId}
                stripeSessionId={stripeSessionId}
              />
            </div>

            {/* Cart sidebar on desktop */}
            <div className="hidden md:block w-full md:w-[40%]">
              <CheckoutCartSidebar items={items} summary={summary} discount={discount} shippingAmount={shippingAmount} />
            </div>
          </div>
        </div>
      </BaseSection>
    </main>
  );
}
