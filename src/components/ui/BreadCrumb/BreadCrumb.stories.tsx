import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BreadCrumb } from "./BreadCrumb";

const meta = {
  title: "UI/BreadCrumb",
  component: BreadCrumb,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A breadcrumb navigation component that displays a list of links separated by slashes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { type: "object" },
      description: "Array of breadcrumb items with label and optional href",
    },
  },
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Category" },
    ],
  },
} satisfies Meta<typeof BreadCrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Category" },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "Current Page" }],
  },
};

export const FourLevels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Electronics", href: "/shop/electronics" },
      { label: "Laptops" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Home" }],
  },
};
