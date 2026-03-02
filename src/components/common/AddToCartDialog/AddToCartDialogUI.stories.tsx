import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { AddToCartDialogUI } from "./AddToCartDialogUI";
import { Button } from "@/components/ui/Button";
import { CheckoutButtonUI } from "../CheckoutButton";

const meta = {
  title: "Common/AddToCartDialog",
  component: AddToCartDialogUI,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A dialog component for displaying product information when items are added to cart. Built on Radix UI Dialog with custom styling matching the brand theme. Includes product image, name, price, size, and action buttons for viewing cart or checking out.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls the dialog open state",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when dialog open state changes",
    },
    productName: {
      control: "text",
      description: "Name of the product added to cart",
    },
    price: {
      control: "text",
      description: "Product price",
    },
    imageUrl: {
      control: "text",
      description: "URL of the product image",
    },
    size: {
      control: "text",
      description: "Selected size (optional)",
    },
    category: {
      control: "text",
      description: "Product type/category (optional)",
    },
    quantity: {
      control: { type: "number", min: 0, step: 1 },
      description: "Total items in cart for 'View Cart' button",
    },
  },
} satisfies Meta<typeof AddToCartDialogUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    productName: "Cashmere Blend Turtleneck Sweater",
    category: "Luxury Knitwear",
    price: "495.00",
    imageUrl: "/assets/clothes-model.jpg",
    size: "M",
    quantity: 3,
    open: false,
    onOpenChange: () => {},
    checkoutButton: (
      <CheckoutButtonUI
        className=""
        onClick={() => alert("Checkout clicked")}
        isLoading={false}
      />
    ),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 p-4">
        <Button text="Add to Cart" onClick={() => setOpen(true)} />
        <p className="text-sm text-neutral-08">
          Dialog state: {open ? "Open" : "Closed"}
        </p>
        <AddToCartDialogUI {...args} open={open} onOpenChange={setOpen} />
      </div>
    );
  },
};
