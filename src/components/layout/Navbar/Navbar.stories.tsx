import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavbarUI } from "./NavbarUI";

const meta = {
  title: "Layout/NavbarUI",
  component: NavbarUI,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main navigation bar component for the Cartelle mock store. Contains brand name, navigation links, and search icon.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavbarUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "The default navbar appearance with all navigation links.",
      },
    },
  },
};

export const ItemsInCart: Story = {
  args: {
    itemCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "The default navbar appearance with all navigation links.",
      },
    },
  },
};
