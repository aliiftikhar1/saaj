import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnimatedHeadingText } from "./AnimatedHeadingText";

const meta = {
  title: "UI/AnimatedHeadingText",
  component: AnimatedHeadingText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An animated text component that animates each letter individually with staggered timing. Creates a smooth blur and slide-in effect for headings and important text.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "The text content to animate",
    },
    variant: {
      control: { type: "select" },
      options: ["home-screen", "page-title"],
      description:
        "Animation timing variant - 'home-screen' is slower (0.03s stagger), 'page-title' is faster (0.01s stagger)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the wrapper",
    },
  },
} satisfies Meta<typeof AnimatedHeadingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Hello World",
    variant: "page-title",
    className: "text-2xl font-bold",
  },
  parameters: {
    docs: {
      description: {
        story: "The default animated text with standard timing and styling.",
      },
    },
  },
};

export const SlowAnimation: Story = {
  args: {
    text: "Slow Motion Text",
    variant: "home-screen",
    className: "text-3xl font-bold text-blue-600",
  },
  parameters: {
    docs: {
      description: {
        story: "Slower animation timing for a more dramatic effect.",
      },
    },
  },
};

export const FastAnimation: Story = {
  args: {
    text: "Quick Animation",
    variant: "page-title",
    className: "text-xl font-medium text-green-600",
  },
  parameters: {
    docs: {
      description: {
        story: "Fast animation timing for rapid text reveal.",
      },
    },
  },
};

export const LongText: Story = {
  args: {
    text: "This is a longer piece of text to demonstrate how the animation works with multiple words and longer sentences.",
    variant: "page-title",
    className: "text-lg text-gray-700 max-w-md text-center",
  },
  parameters: {
    docs: {
      description: {
        story: "Animation applied to longer text content.",
      },
    },
  },
};

export const HeadingStyle: Story = {
  args: {
    text: "Cartelle Store",
    variant: "home-screen",
    className:
      "text-4xl font-black text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text",
  },
  parameters: {
    docs: {
      description: {
        story: "Styled as a gradient heading with bold typography.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    text: "Custom Design",
    variant: "home-screen",
    className: "text-3xl font-extrabold text-red-500 tracking-wider uppercase",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example with custom styling including spacing and case transformation.",
      },
    },
  },
};
