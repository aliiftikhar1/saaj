import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeliveryDetailsStep } from "./DeliveryDetailsStep";

const meta = {
  title: "Checkout/CheckoutForm/DeliveryDetailsStep",
  component: DeliveryDetailsStep,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Delivery details form step for the checkout flow. Includes delivery and billing details with validation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    completed: {
      control: "boolean",
      description: "Whether the delivery step is completed",
    },
    onEditDelivery: {
      action: "editDelivery",
      description: "Callback for editing delivery details",
    },
    onContinueToPayment: {
      action: "continueToPayment",
      description: "Callback when the form submits",
    },
  },
} satisfies Meta<typeof DeliveryDetailsStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    completed: false,
    onEditDelivery: () => {},
    onContinueToPayment: () => {},
  },
};

export const Completed: Story = {
  args: {
    completed: true,
    onEditDelivery: () => {},
    onContinueToPayment: () => {},
  },
};
