import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavbarSubMenu } from "./NavbarSubMenu";
import { navbarMockSubItems } from "./data";

const meta = {
  title: "Layout/NavbarUI/NavbarSubMenu",
  component: NavbarSubMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The dropdown submenu component for the navigation bar. Displays additional navigation options when triggered.",
      },
    },
  },
  argTypes: {
    show: {
      control: "boolean",
    },
    subItems: {
      control: "object",
    },
  },
  args: {
    show: true,
    subItems: navbarMockSubItems,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavbarSubMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Show: Story = {
  args: {
    show: true,
    subItems: navbarMockSubItems,
  },
  parameters: {
    docs: {
      description: {
        story: "The default navbar dropdown submenu appearance.",
      },
    },
  },
};

export const ButtonToShow: Story = {
  args: {
    show: false,
    subItems: navbarMockSubItems,
  },
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setShow(!show)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {show ? "Hide" : "Show"} Submenu
        </button>
        <NavbarSubMenu show={show} subItems={navbarMockSubItems} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive story with a button to toggle the submenu visibility. Click the button to see the smooth animations.",
      },
    },
  },
};
