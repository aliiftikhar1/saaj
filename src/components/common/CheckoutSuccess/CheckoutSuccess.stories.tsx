import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckoutSuccessUI } from "./CheckoutSuccessUI";

const meta = {
  title: "Checkout/CheckoutSuccess",
  component: CheckoutSuccessUI,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A confirmation screen shown after a successful checkout. Displays an order confirmation message and optional order/email details.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orderNumber: {
      control: "text",
      description: "Optional order number to display",
    },
    email: {
      control: "text",
      description: "Optional email to display",
    },
  },
} satisfies Meta<typeof CheckoutSuccessUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orderNumber: "12345",
    email: "customer@example.com",
  },
};

export const WithoutOrderNumber: Story = {
  args: {
    email: "customer@example.com",
  },
};

export const WithoutEmail: Story = {
  args: {
    orderNumber: "12345",
  },
};

export const Minimal: Story = {
  args: {},
};
