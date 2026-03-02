"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { CheckoutStep } from "@/types/client";
import { DeliveryDetailsData } from "./schema";
import { CircleCheckIcon } from "@/components/icons";
import { cn } from "@/lib";
import { DeliveryDetailsStep } from "./DeliveryDetailsStep";
import { OrderSummaryStep } from "./OrderSummaryStep";
import { PaymentStep } from "./PaymentStep";

type CheckoutFormComponentProps = {
  id: string;
  children: React.ReactNode;
  header: string;
  completed: boolean;
};

function CheckoutFormComponent(props: CheckoutFormComponentProps) {
  // === PROPS ===
  const { children, header, completed, id } = props;

  return (
    <div
      id={id}
      className={cn(
        "flex py-6 flex-col",
        completed && id === "1" && "border-y border-neutral-5",
        completed && id === "2" && "border-b border-neutral-5",
      )}
    >
      <div className={"flex items-center justify-between mb-4"}>
        <h2 className="text-2xl font-medium text-neutral-12 ">{header}</h2>
        {completed && <CircleCheckIcon />}
      </div>
      {children}
    </div>
  );
}

type CheckoutFormProps = {
  orderId: string;
  stripeSessionId: string;
};

export function CheckoutForm(props: CheckoutFormProps) {
  // === PROPS ===
  const { orderId, stripeSessionId } = props;

  // === STATE ===
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);

  const [deliveryData, setDeliveryData] = useState<DeliveryDetailsData | null>(
    null,
  );

  // === STRIPE HOOKS ===
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  // === FUNCTIONS ===
  const handleConfirmDelivery = (deliveryData: DeliveryDetailsData) => {
    setDeliveryData(deliveryData);
    setCurrentStep(2);

    // Wait for DOM to update, then scroll
    setTimeout(() => {
      const el = document.getElementById("2");
      if (!el) return;

      window.scrollTo({
        top: el.offsetTop - 500,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleConfirmPayment = () => {
    setCurrentStep(3);

    // Wait for DOM to update, then scroll
    setTimeout(() => {
      const el = document.getElementById("3");
      if (!el) return;

      window.scrollTo({
        top: el.offsetTop - 500,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleEditDelivery = () => {
    setCurrentStep(1);
  };

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: stripeSessionId }}
      >
        {/* Delivery Details Step */}
        <CheckoutFormComponent
          id="1"
          header="Delivery Details"
          completed={currentStep !== 1}
        >
          <DeliveryDetailsStep
            completed={currentStep !== 1}
            onEditDelivery={handleEditDelivery}
            onContinueToPayment={handleConfirmDelivery}
          />
        </CheckoutFormComponent>

        {/* Payment Step */}
        <CheckoutFormComponent
          id="2"
          header="Payment"
          completed={currentStep > 2}
        >
          <div className={currentStep > 1 ? "block" : "hidden"}>
            <PaymentStep
              completed={currentStep > 2}
              onContinue={handleConfirmPayment}
              onEditPaymentRequest={() => setCurrentStep(2)}
            />
          </div>
        </CheckoutFormComponent>

        {/* Order Summary Step */}
        <CheckoutFormComponent
          id="3"
          header="Order Summary"
          completed={currentStep > 3}
        >
          <div className={currentStep === 3 ? "block" : "hidden"}>
            <OrderSummaryStep
              stripeSessionId={stripeSessionId}
              deliveryData={deliveryData}
              orderId={orderId}
            />
          </div>
        </CheckoutFormComponent>
      </Elements>
    </div>
  );
}
