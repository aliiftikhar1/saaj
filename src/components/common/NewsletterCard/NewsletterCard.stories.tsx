import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NewsletterCard } from "./NewsletterCard";

const meta = {
  title: "Common/NewsletterCard",
  component: NewsletterCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A newsletter card component that encourages users to subscribe to email updates, displaying a title, description, email input, sign-up button, and an accompanying image.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof NewsletterCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="p-5 bg-neutral-10">
      <NewsletterCard />
    </div>
  ),
};
