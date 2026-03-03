"use client";

import { useState } from "react";

import { DeliveryDetailsData } from "./schema";
import { updateOrderDetails, markOrderAsPaid } from "@/lib/server/actions";
import { routes } from "@/lib";
import { OrderSummaryStepUI } from "./OrderSummaryStepUI";

type OrderSummaryStepProps = {
  deliveryData: DeliveryDetailsData | null;
  orderId: string;
};

export function OrderSummaryStep(props: OrderSummaryStepProps) {
  // === PROPS ===
  const { deliveryData, orderId } = props;

  // === STATE ===
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === FUNCTIONS ===
  const handleConfirmPayment = async () => {
    if (!deliveryData) return;

    setIsSubmitting(true);

    try {
      // Save delivery details
      const updateResult = await updateOrderDetails(orderId, deliveryData);
      if (!updateResult.success) {
        setIsSubmitting(false);
        return;
      }

      // Mark order as paid (no Stripe)
      const paidResult = await markOrderAsPaid(orderId);
      if (!paidResult.success) {
        setIsSubmitting(false);
        return;
      }

      window.location.href = `${routes.checkoutSuccess}?orderId=${orderId}`;
    } catch (err) {
      console.error("Error placing order:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <OrderSummaryStepUI
      isSubmitting={isSubmitting}
      onConfirmPayment={handleConfirmPayment}
    />
  );
}
