import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ReviewCardsSection } from "./ReviewCardsSection";
import { mockReviews } from "./data";

const meta = {
  title: "Common/ReviewCardsSection",
  component: ReviewCardsSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A scrolling reviews section that displays customer feedback in a continuous left-to-right animation. Perfect for showcasing testimonials and building social proof.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    reviews: {
      control: "object",
      description:
        "Array of review objects with rating, text, and reviewer information",
    },
  },
} satisfies Meta<typeof ReviewCardsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    reviews: mockReviews,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The default reviews section with continuous scrolling animation. Reviews move from right to left and loop infinitely for engaging social proof display.",
      },
    },
  },
};
