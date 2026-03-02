import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OrderSummaryStepUI } from "./OrderSummaryStepUI";

const meta = {
  title: "Checkout/CheckoutForm/OrderSummaryStepUI",
  component: OrderSummaryStepUI,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Order summary step UI for the checkout flow. Includes terms text and submit payment button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isSubmitting: {
      control: "boolean",
      description: "Whether the payment submission is in progress",
    },
    onConfirmPayment: {
      action: "confirmPayment",
      description: "Callback when submit payment is clicked",
    },
  },
} satisfies Meta<typeof OrderSummaryStepUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSubmitting: false,
    onConfirmPayment: () => {},
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
    onConfirmPayment: () => {},
  },
};
