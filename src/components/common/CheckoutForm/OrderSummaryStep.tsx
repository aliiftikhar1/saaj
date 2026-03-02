"use client";

import { useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import { DeliveryDetailsData } from "./schema";
import { updateOrderDetails } from "@/lib/server/actions";
import { routes } from "@/lib";
import { OrderSummaryStepUI } from "./OrderSummaryStepUI";

type OrderSummaryStepProps = {
  stripeSessionId: string;
  deliveryData: DeliveryDetailsData | null;
  orderId: string;
};

export function OrderSummaryStep(props: OrderSummaryStepProps) {
  // === PROPS ===
  const { stripeSessionId, deliveryData, orderId } = props;

  // === STATE ===
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === STRIPE HOOKS ===
  const stripe = useStripe();
  const elements = useElements();

  // === FUNCTIONS ===
  const handleConfirmPayment = async () => {
    if (!deliveryData || !stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Retrieve the PaymentIntent to check its status
      const { paymentIntent } =
        await stripe.retrievePaymentIntent(stripeSessionId);

      console.log("Payment Intent:", paymentIntent);
      console.log(stripeSessionId + " --- id");

      // Check if payment is already complete
      if (paymentIntent?.status === "succeeded") {
        window.location.href = `/checkout/success?orderId=${orderId}`;
        return;
      }

      if (paymentIntent?.status === "processing") {
        setIsSubmitting(false);
        return;
      }

      // Update prisma order details with delivery data
      const updateResult = await updateOrderDetails(orderId, deliveryData);

      if (!updateResult.success) {
        setIsSubmitting(false);
        return;
      }

      // Confirm the payment with Stripe
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}${routes.checkoutSuccess}?orderId=${orderId}`,
        },
      });

      if (error) {
        console.error("Error confirming payment:", error);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    } finally {
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
