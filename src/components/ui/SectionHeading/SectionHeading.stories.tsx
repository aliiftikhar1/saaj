import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionHeading } from "./SectionHeading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A section heading component with an animated main heading and a subtitle. Uses AnimatedHeadingText for smooth letter-by-letter animations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: "text",
      description: "Main heading text with animated letter effects",
    },
    subheading: {
      control: "text",
      description: "Subtitle text displayed below the main heading",
    },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "New Arrivals",
    subheading: "Discover our latest collection",
  },
};
