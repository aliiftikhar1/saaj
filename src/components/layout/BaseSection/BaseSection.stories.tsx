import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BaseSection } from "./BaseSection";

const meta = {
  title: "Layout/BaseSection",
  component: BaseSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A base section component that provides consistent horizontal padding across different breakpoints. Used as a wrapper for main content areas.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "base-section-sample",
    children: (
      <div className="bg-neutral-06 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sample Content</h2>
        <p className="text-gray-700 mb-4">
          This is sample content inside the BaseSection component. The
          BaseSection provides consistent horizontal padding that adapts to
          different screen sizes.
        </p>
        <p className="text-gray-600">
          Padding values: px-5 (mobile), md:px-10 (medium screens), xl:px-12
          (extra large screens)
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The default BaseSection with sample content showing the responsive padding behavior.",
      },
    },
  },
};
