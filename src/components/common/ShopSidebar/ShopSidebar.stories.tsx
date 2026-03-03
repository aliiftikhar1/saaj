import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ShopSidebar } from "./ShopSidebar";
import { PRODUCT_CATEGORIES } from "@/lib";

const meta = {
  title: "Common/ShopSidebar",
  component: ShopSidebar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A navigation sidebar component for the shop page. Displays category filters including 'All', 'New arrivals', and an expandable 'Collections' accordion with seasonal collections.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ShopSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collections: PRODUCT_CATEGORIES,
  },
};

export const CollectionsOpen: Story = {
  args: {
    collections: PRODUCT_CATEGORIES,
    collectionsOpenByDefault: true,
  },
};
