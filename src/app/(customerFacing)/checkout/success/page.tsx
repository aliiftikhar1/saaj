import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { CheckoutSuccess } from "@/components/common/CheckoutSuccess/CheckoutSuccess";
import { getCurrentOrderById } from "@/lib/server/queries";
import { sendOrderConfirmationEmails } from "@/lib/server/actions/email-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function CheckoutSuccessPage(
  props: CheckoutSuccessPageProps,
) {
  // === PROPS ===
  const searchParams = await props.searchParams;
  const { orderId } = searchParams;

  // === FETCH DATA & REDIRECT ===
  if (!orderId) {
    redirect("/");
  }

  const order = await getCurrentOrderById(orderId);

  if (!order || !order.success || !order.data) {
    redirect("/");
  }

  // === SEND ORDER CONFIRMATION EMAILS (non-blocking) ===
  // Fire-and-forget: don't await so page renders immediately
  sendOrderConfirmationEmails(orderId).catch((err) => {
    console.error("[Checkout] Failed to send order confirmation emails:", err);
  });

  return (
    <div className="container mx-auto">
      <CheckoutSuccess
        orderNumber={order.data.orderNumber?.toString()}
        email={order.data.deliveryEmail || undefined}
      />
    </div>
  );
}
