import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductTile } from "./ProductTile";

const meta = {
  title: "Common/ProductTile",
  component: ProductTile,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A product tile component that displays product information with image, name, and price. Links to individual product pages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique product identifier used for routing",
    },
    name: {
      control: "text",
      description: "Product name displayed below the image",
    },
    price: {
      control: { type: "number", min: 0, step: 0.01 },
      description: "Product price in dollars",
    },
    primaryImageUrl: {
      control: "text",
      description: "Main product image URL",
    },
    hoverImageUrl: {
      control: "text",
      description: "Alternative image shown on hover",
    },
  },
} satisfies Meta<typeof ProductTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "sample-product-1",
    name: "Classic White Sneakers",
    price: 89.99,
    primaryImageUrl: "/assets/clothes-model.jpg",
    hoverImageUrl: "/assets/clothes-model-hover.jpg",
  },
  render: (args) => (
    <div className="w-64">
      <ProductTile {...args} />
    </div>
  ),
};

export const ProductGrid: Story = {
  args: {
    id: "sample-product-1",
    name: "Classic White Sneakers",
    price: 89.99,
    primaryImageUrl: "/assets/clothes-model.jpg",
    hoverImageUrl: "/assets/clothes-model-hover.jpg",
  },
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
      <ProductTile
        id="product-1"
        name="Classic White Sneakers"
        price={89.99}
        primaryImageUrl="/assets/clothes-model.jpg"
        hoverImageUrl="/assets/clothes-model-hover.jpg"
      />
      <ProductTile
        id="product-2"
        name="Premium Leather Jacket"
        price={249.99}
        primaryImageUrl="/assets/hero-3.jpg"
        hoverImageUrl="/assets/hero-3.jpg"
      />
      <ProductTile
        id="product-3"
        name="Vintage Denim Jeans"
        price={129.99}
        primaryImageUrl="/assets/clothes-model.jpg"
        hoverImageUrl="/assets/clothes-model-hover.jpg"
      />
      <ProductTile
        id="product-4"
        name="Cotton Polo Shirt"
        price={59.99}
        primaryImageUrl="/assets/hero-3.jpg"
        hoverImageUrl="/assets/hero-3.jpg"
      />
      <ProductTile
        id="product-5"
        name="Designer Backpack"
        price={179.99}
        primaryImageUrl="/assets/clothes-model.jpg"
        hoverImageUrl="/assets/clothes-model-hover.jpg"
      />
      <ProductTile
        id="product-6"
        name="Casual Summer Dress"
        price={94.99}
        primaryImageUrl="/assets/hero-3.jpg"
        hoverImageUrl="/assets/hero-3.jpg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple ProductTile components displayed in a responsive grid layout, demonstrating how they work together in a product listing page.",
      },
    },
  },
};
