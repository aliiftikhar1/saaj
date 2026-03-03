"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui";
import { cn } from "@/lib";

type PaymentStepProps = {
  onContinue: () => void;
  onEditPaymentRequest: () => void;
  completed: boolean;
};

export function PaymentStep(props: PaymentStepProps) {
  // === PROPS ===
  const { onContinue, onEditPaymentRequest, completed } = props;

  return (
    <div className="space-y-4">
      {/* Completed summary */}
      <motion.div
        animate={{ opacity: completed ? 1 : 0, height: completed ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-neutral-02 overflow-hidden flex border border-neutral-5 rounded-md justify-between items-start"
      >
        <div className="space-y-1 text-sm text-neutral-10 p-4">
          <p>Payment Method: Cash on Delivery</p>
        </div>
        <button
          onClick={onEditPaymentRequest}
          className="text-sm p-4 text-neutral-12 cursor-pointer font-medium underline"
        >
          Edit
        </button>
      </motion.div>

      {/* Payment form */}
      <motion.div
        className={cn(
          "overflow-hidden",
          completed ? "pointer-events-none" : "pointer-events-auto",
        )}
        animate={{ opacity: completed ? 0 : 1, height: completed ? 0 : "auto" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="rounded-md border border-neutral-5 bg-neutral-02 p-5 space-y-2">
          <p className="text-sm font-medium text-neutral-12">Cash on Delivery</p>
          <p className="text-sm text-neutral-10">
            Your order will be confirmed and payment collected upon delivery.
          </p>
        </div>
        <Button
          onClick={onContinue}
          variant="dark"
          text="Continue to Review"
          className="mt-6 w-full"
        />
      </motion.div>
    </div>
  );
}
