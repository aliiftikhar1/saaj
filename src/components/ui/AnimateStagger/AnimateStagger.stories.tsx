import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnimateStagger } from "./AnimateStagger";

const meta = {
  title: "UI/AnimateStagger",
  component: AnimateStagger,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A staggered animation component that animates multiple child elements with a delay between each one. Ideal for lists, grids, and card layouts where you want elements to appear in sequence.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The child elements to animate",
    },
    staggerDelay: {
      control: { type: "range", min: 0.05, max: 0.5, step: 0.05 },
      description: "Delay between each child animation (in seconds)",
    },
    duration: {
      control: { type: "select" },
      options: ["short", "normal", "long"],
      description:
        "Animation duration - 'short' (0.15s), 'normal' (0.3s), 'long' (0.7s)",
    },
    disableIsInView: {
      control: "boolean",
      description: "Disable scroll trigger and animate immediately",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the wrapper",
    },
  },
} satisfies Meta<typeof AnimateStagger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    staggerDelay: 0.1,
    duration: "normal",
    className: "flex flex-col gap-4",
  },
  render: (args) => (
    <AnimateStagger {...args}>
      <div className="p-4 bg-blue-100 rounded">Item 1</div>
      <div className="p-4 bg-green-100 rounded">Item 2</div>
      <div className="p-4 bg-yellow-100 rounded">Item 3</div>
      <div className="p-4 bg-red-100 rounded">Item 4</div>
    </AnimateStagger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The default staggered animation with multiple items in a column layout.",
      },
    },
  },
};

export const GridLayout: Story = {
  args: {
    staggerDelay: 0.15,
    duration: "long",
    className: "grid grid-cols-2 gap-4",
  },
  render: (args) => (
    <AnimateStagger {...args}>
      <div className="p-6 bg-purple-100 rounded-lg text-center">
        <h3 className="font-bold">Card 1</h3>
        <p>Description text</p>
      </div>
      <div className="p-6 bg-pink-100 rounded-lg text-center">
        <h3 className="font-bold">Card 2</h3>
        <p>Description text</p>
      </div>
      <div className="p-6 bg-indigo-100 rounded-lg text-center">
        <h3 className="font-bold">Card 3</h3>
        <p>Description text</p>
      </div>
      <div className="p-6 bg-teal-100 rounded-lg text-center">
        <h3 className="font-bold">Card 4</h3>
        <p>Description text</p>
      </div>
    </AnimateStagger>
  ),
  parameters: {
    docs: {
      description: {
        story: "Staggered animation in a grid layout with cards.",
      },
    },
  },
};

export const FastStagger: Story = {
  args: {
    staggerDelay: 0.05,
    duration: "short",
    className: "flex gap-2",
  },
  render: (args) => (
    <AnimateStagger {...args}>
      <div className="w-12 h-12 bg-red-400 rounded-full"></div>
      <div className="w-12 h-12 bg-orange-400 rounded-full"></div>
      <div className="w-12 h-12 bg-yellow-400 rounded-full"></div>
      <div className="w-12 h-12 bg-green-400 rounded-full"></div>
      <div className="w-12 h-12 bg-blue-400 rounded-full"></div>
      <div className="w-12 h-12 bg-purple-400 rounded-full"></div>
    </AnimateStagger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Fast staggered animation with circles appearing quickly in sequence.",
      },
    },
  },
};

export const SlowStagger: Story = {
  args: {
    staggerDelay: 0.3,
    duration: "long",
    className: "flex flex-col gap-6 max-w-md",
  },
  render: (args) => (
    <AnimateStagger {...args}>
      <div className="p-6 bg-slate-100 rounded-lg border">
        <h4 className="font-semibold mb-2">Feature 1</h4>
        <p className="text-gray-600">
          This is a feature description that explains the benefit.
        </p>
      </div>
      <div className="p-6 bg-slate-100 rounded-lg border">
        <h4 className="font-semibold mb-2">Feature 2</h4>
        <p className="text-gray-600">
          Another feature with its own description and benefits.
        </p>
      </div>
      <div className="p-6 bg-slate-100 rounded-lg border">
        <h4 className="font-semibold mb-2">Feature 3</h4>
        <p className="text-gray-600">
          The final feature completing the set of offerings.
        </p>
      </div>
    </AnimateStagger>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Slow, dramatic staggered animation perfect for feature cards or testimonials.",
      },
    },
  },
};
