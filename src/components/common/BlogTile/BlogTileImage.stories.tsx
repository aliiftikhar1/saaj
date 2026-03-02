import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BlogTileImage } from "./BlogTileImage";

const meta: Meta<typeof BlogTileImage> = {
  title: "Common/BlogTile/BlogTileImage",
  component: BlogTileImage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An image component for blog tiles with hover effects and rounded corners. Features a border transition on hover and optimized image loading.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    imageUrl: {
      control: "text",
      description: "The URL of the image to display",
    },
    alt: {
      control: "text",
      description: "Alt text for accessibility",
    },
    category: {
      control: "text",
      description: "Category label for the blog post",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "/assets/hero-3.jpg",
    alt: "Blog post featured image",
    category: "Guide",
  },
  render: (args) => (
    <div className="relative group w-80 h-80">
      <BlogTileImage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Blog tile image within a container showing how it fills the available space with proper aspect ratio.",
      },
    },
  },
};
