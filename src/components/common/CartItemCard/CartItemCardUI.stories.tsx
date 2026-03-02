import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CartItemCardUI } from "./CartItemCardUI";

const meta = {
  title: "Cart/CartItemCard",
  component: CartItemCardUI,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A card component for displaying individual cart items with product details, quantity controls, and delete functionality. Includes loading states, error handling, and responsive design for mobile and desktop views.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    slug: {
      control: "text",
      description: "Product URL slug for navigation",
    },
    title: {
      control: "text",
      description: "Product title",
    },
    image: {
      control: "text",
      description: "Product image URL",
    },
    size: {
      control: "object",
      description: "Size information with label",
    },
    quantity: {
      control: { type: "number", min: 1, max: 99 },
      description: "Current quantity in cart",
    },
    unitPrice: {
      control: "number",
      description: "Price per unit",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state for async operations",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    onIncrement: {
      action: "onIncrement",
      description: "Callback when quantity is increased",
    },
    onDecrement: {
      action: "onDecrement",
      description: "Callback when quantity is decreased",
    },
    onDelete: {
      action: "onDelete",
      description: "Callback when item is deleted",
    },
  },
} satisfies Meta<typeof CartItemCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slug: "cashmere-turtleneck-sweater",
    title: "Cashmere Blend Turtleneck Sweater",
    image: "/assets/clothes-model.jpg",
    size: {
      label: "M",
    },
    quantity: 2,
    unitPrice: 495.0,
    isLoading: false,
    error: null,
    onIncrement: () => {},
    onDecrement: () => {},
    onDelete: () => {},
  },
};

export const SingleItem: Story = {
  args: {
    slug: "classic-white-tee",
    title: "Classic White T-Shirt",
    image: "/assets/clothes-model.jpg",
    size: {
      label: "L",
    },
    quantity: 1,
    unitPrice: 29.99,
    isLoading: false,
    error: null,
    onIncrement: () => {},
    onDecrement: () => {},
    onDelete: () => {},
  },
};

export const MaxQuantity: Story = {
  args: {
    slug: "premium-denim-jeans",
    title: "Premium Stretch Denim Jeans",
    image: "/assets/clothes-model.jpg",
    size: {
      label: "32",
    },
    quantity: 99,
    unitPrice: 149.0,
    isLoading: false,
    error: null,
    onIncrement: () => {},
    onDecrement: () => {},
    onDelete: () => {},
  },
};

export const Loading: Story = {
  args: {
    slug: "wool-coat",
    title: "Merino Wool Winter Coat",
    image: "/assets/clothes-model.jpg",
    size: {
      label: "XL",
    },
    quantity: 1,
    unitPrice: 750.0,
    isLoading: true,
    error: null,
    onIncrement: () => {},
    onDecrement: () => {},
    onDelete: () => {},
  },
};

export const WithError: Story = {
  args: {
    slug: "leather-jacket",
    title: "Genuine Leather Biker Jacket",
    image: "/assets/clothes-model.jpg",
    size: {
      label: "M",
    },
    quantity: 3,
    unitPrice: 899.0,
    isLoading: false,
    error: "Cart cannot exceed 100 items total. You can add 2 more items.",
    onIncrement: () => {},
    onDecrement: () => {},
    onDelete: () => {},
  },
};

export const LongProductName: Story = {
  args: {
    slug: "ultra-premium-limited-edition",
    title:
      "Ultra Premium Limited Edition Handcrafted Italian Merino Wool Cashmere Blend Overcoat",
    image: "/assets/clothes-model.jpg",
    size: {
      label: "M",
    },
    quantity: 1,
    unitPrice: 1299.99,
    isLoading: false,
    error: null,
    onIncrement: () => {},
    onDecrement: () => {},
    onDelete: () => {},
  },
};
