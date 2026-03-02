import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnimateFadeIn } from "./AnimateFadeIn";

const meta = {
  title: "UI/AnimateFadeIn",
  component: AnimateFadeIn,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A fade-in animation component that triggers when elements come into view during scroll. Provides smooth opacity transitions with customizable duration and delay.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content to animate",
    },
    duration: {
      control: { type: "select" },
      options: ["short", "normal", "long"],
      description:
        "Animation duration - 'short' (0.15s), 'normal' (0.3s), 'long' (0.7s)",
    },
    delay: {
      control: { type: "range", min: 0, max: 2, step: 0.1 },
      description: "Delay before animation starts (in seconds)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the wrapper",
    },
  },
} satisfies Meta<typeof AnimateFadeIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hello World",
    duration: "normal",
    className: "text-2xl font-bold p-4 bg-gray-100 rounded",
  },
};

export const SlowAnimation: Story = {
  args: {
    children: "Slow Motion Fade",
    duration: "long",
    className: "text-3xl font-bold text-blue-600 p-4 bg-blue-50 rounded",
  },
};

export const WithDelay: Story = {
  args: {
    children: "Delayed Animation",
    duration: "normal",
    delay: 0.5,
    className:
      "text-2xl font-semibold text-purple-600 p-4 bg-purple-50 rounded",
  },
};
