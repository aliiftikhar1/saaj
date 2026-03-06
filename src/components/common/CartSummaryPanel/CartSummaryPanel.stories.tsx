import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CartSummaryPanelUI } from "./CartSummaryPanelUI";
import { CheckoutButtonUI } from "../CheckoutButton";

const meta = {
  title: "Cart/CartSummaryPanel",
  component: CartSummaryPanelUI,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A summary panel component that displays cart totals including subtotal, shipping costs, and final total. Features a sticky positioning on desktop viewports and includes a checkout button. Typically displayed alongside cart items in the shopping cart page.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    summary: {
      control: "object",
      description: "Cart summary with subtotal, shipping, and total amounts",
    },
  },
} satisfies Meta<typeof CartSummaryPanelUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const checkoutBtnProps = {
  className: "w-full",
  onClick: () => alert("Checkout clicked"),
  isLoading: false,
};

export const Default: Story = {
  args: {
    summary: {
      subtotal: "Rs.1,234.56",
      shipping: "Rs.15.00",
      total: "Rs.1,249.56",
      itemCount: 5,
    },
    checkoutButton: <CheckoutButtonUI {...checkoutBtnProps} />,
  },
};

export const SmallOrder: Story = {
  args: {
    summary: {
      subtotal: "Rs.29.99",
      shipping: "Rs.8.00",
      total: "Rs.37.99",
      itemCount: 1,
    },
    checkoutButton: <CheckoutButtonUI {...checkoutBtnProps} />,
  },
};

export const FreeShipping: Story = {
  args: {
    summary: {
      subtotal: "Rs.495.00",
      shipping: "Free",
      total: "Rs.495.00",
      itemCount: 2,
    },
    checkoutButton: <CheckoutButtonUI {...checkoutBtnProps} />,
  },
};

export const LargeOrder: Story = {
  args: {
    summary: {
      subtotal: "Rs.12,459.99",
      shipping: "Rs.25.00",
      total: "Rs.12,484.99",
      itemCount: 25,
    },
    checkoutButton: <CheckoutButtonUI {...checkoutBtnProps} />,
  },
};

export const Loading: Story = {
  args: {
    summary: {
      subtotal: "Rs.12,459.99",
      shipping: "Rs.25.00",
      total: "Rs.12,484.99",
      itemCount: 25,
    },
    checkoutButton: <CheckoutButtonUI {...checkoutBtnProps} isLoading={true} />,
  },
};
