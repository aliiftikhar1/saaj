import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyCart } from "./EmptyCart";

const meta = {
  title: "Cart/EmptyCart",
  component: EmptyCart,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An empty state component displayed when the shopping cart has no items. Features a centered layout with a heading, descriptive text, and a call-to-action button to continue shopping. Provides clear user guidance and a path to start adding products.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto border border-neutral-04 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-neutral-02">
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
