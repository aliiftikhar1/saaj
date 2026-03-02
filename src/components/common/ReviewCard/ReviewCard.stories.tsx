import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ReviewCard } from "./ReviewCard";

const meta = {
  title: "Common/ReviewCard",
  component: ReviewCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A review card component that displays customer feedback with star rating, review text, and reviewer information including their photo, name, and title.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    rating: {
      control: { type: "range", min: 1, max: 5, step: 1 },
      description: "Star rating from 1 to 5",
    },
    reviewText: {
      control: "text",
      description: "The customer review text",
    },
    reviewerName: {
      control: "text",
      description: "Name of the reviewer",
    },
    reviewerTitle: {
      control: "text",
      description: "Job title or description of the reviewer",
    },
    reviewerImageUrl: {
      control: "text",
      description: "URL for the reviewer's profile image",
    },
  },
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rating: 5,
    reviewText:
      "Absolutely love the quality and fit! The fabric is so soft and comfortable. I've already ordered three more pieces from this collection.",
    reviewerName: "Sarah Johnson",
    reviewerTitle: "Verified Customer",
    reviewerImageUrl: "/assets/clothes-model.jpg",
  },

  render: (args) => (
    <div className="p-5 bg-neutral-10">
      <ReviewCard {...args} />,
    </div>
  ),
};
