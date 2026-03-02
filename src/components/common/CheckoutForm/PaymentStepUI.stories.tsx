import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaymentStepUI } from "./PaymentStepUI";

const meta = {
  title: "Checkout/CheckoutForm/PaymentStepUI",
  component: PaymentStepUI,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Payment step UI for the checkout flow. Renders a payment element placeholder and continue button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    completed: {
      control: "boolean",
      description: "Whether the payment step is completed",
    },
    paymentMethodType: {
      control: "text",
      description: "Payment method type used for summary display",
    },
    isValidating: {
      control: "boolean",
      description: "Whether the payment is validating",
    },
    onContinue: {
      action: "continue",
      description: "Continue to review callback",
    },
    onEditPaymentRequest: {
      action: "editPayment",
      description: "Edit payment callback",
    },
  },
} satisfies Meta<typeof PaymentStepUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const paymentElementPlaceholder = (
  <div className="border border-neutral-5 rounded-md p-4 text-sm text-neutral-10">
    Payment Element Placeholder
  </div>
);

export const Default: Story = {
  args: {
    completed: false,
    isValidating: false,
    paymentMethodType: "card",
    paymentElement: paymentElementPlaceholder,
    onContinue: () => {},
    onEditPaymentRequest: () => {},
  },
};

export const Completed: Story = {
  args: {
    completed: true,
    isValidating: false,
    paymentMethodType: "card",
    paymentElement: paymentElementPlaceholder,
    onContinue: () => {},
    onEditPaymentRequest: () => {},
  },
};

export const Validating: Story = {
  args: {
    completed: false,
    isValidating: true,
    paymentMethodType: "card",
    paymentElement: paymentElementPlaceholder,
    onContinue: () => {},
    onEditPaymentRequest: () => {},
  },
};
