import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BlogTile } from "./BlogTile";

const meta: Meta<typeof BlogTile> = {
  title: "Common/BlogTile",
  component: BlogTile,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A blog tile component with image, title, description and category. Features hover effects on the image with animated category tag.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "The URL the tile links to",
    },
    title: {
      control: "text",
      description: "The blog post title",
    },
    description: {
      control: "text",
      description: "The blog post description",
    },
    imageUrl: {
      control: "text",
      description: "The URL of the blog post image",
    },
    alt: {
      control: "text",
      description: "Alt text for the image",
    },
    category: {
      control: "text",
      description: "The blog post category",
    },
    isBlogPage: {
      control: "boolean",
      description:
        "If true, styles the tile for use on the blog page (vertical stack layout) always",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  args: {
    href: "/",
    title: "Latest Fashion Trends for 2024",
    description:
      "Discover the hottest fashion trends that are defining style this year, from sustainable fabrics to bold color palettes.",
    imageUrl: "/assets/cartelle-hero-image.jpg",
    alt: "Fashion model showcasing 2024 trends",
    category: "Fashion",
  },
};

export const BlogPage: Story = {
  args: {
    href: "/",
    title: "Latest Fashion Trends for 2024",
    description:
      "Discover the hottest fashion trends that are defining style this year, from sustainable fabrics to bold color palettes.",
    imageUrl: "/assets/cartelle-hero-image.jpg",
    alt: "Fashion model showcasing 2024 trends",
    category: "Fashion",
    isBlogPage: true,
  },
};
