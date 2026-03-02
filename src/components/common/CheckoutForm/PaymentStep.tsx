"use client";

import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { PaymentStepUI } from "./PaymentStepUI";

type PaymentStepProps = {
  onContinue: () => void;
  onEditPaymentRequest: () => void;
  completed: boolean;
};

export function PaymentStep(props: PaymentStepProps) {
  // === PROPS ===
  const { onContinue, onEditPaymentRequest, completed } = props;

  // === STRIPE HOOKS ===
  const stripe = useStripe();
  const elements = useElements();

  // === STATE ===
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [paymentMethodType, setPaymentMethodType] = useState<string>("");

  // === FUNCTIONS ===
  const handleContinueToReview = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsValidating(true);

    // Submit the payment element to validate
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setIsValidating(false);
      return;
    }

    setIsValidating(false);
    onContinue();
  };

  return (
    <PaymentStepUI
      completed={completed}
      onContinue={handleContinueToReview}
      onEditPaymentRequest={onEditPaymentRequest}
      isValidating={isValidating}
      paymentMethodType={paymentMethodType}
      paymentElement={
        <PaymentElement
          onChange={(e) => setPaymentMethodType(e?.value?.type || "")}
        />
      }
    />
  );
}
