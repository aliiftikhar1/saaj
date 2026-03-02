import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BlogLargeTile } from "./BlogLargeTile";

const meta: Meta<typeof BlogLargeTile> = {
  title: "Common/BlogTile/BlogLargeTile",
  component: BlogLargeTile,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A large blog tile component with image, title, description, category, author, and date. Features hover effects on the image with animated category tag.",
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
    datePublished: {
      control: "date",
      description: "The date the blog post was published",
    },
    timeToRead: {
      control: "number",
      description: "Estimated time to read (minutes)",
    },
    profileImageUrl: {
      control: "text",
      description: "URL of the author's profile image",
    },
    authorName: {
      control: "text",
      description: "Name of the author",
    },
    authorJobTitle: {
      control: "text",
      description: "Job title of the author",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/",
    title: "Latest Fashion Trends for 2024",
    description:
      "Discover the hottest fashion trends that are defining style this year, from sustainable fabrics to bold color palettes.",
    imageUrl: "/assets/cartelle-hero-image.jpg",
    alt: "Fashion model showcasing 2024 trends",
    category: "Fashion",
    datePublished: new Date("2024-06-01"),
    timeToRead: 4,
    profileImageUrl: "/assets/clothes-model.jpg",
    authorName: "Jane Doe",
    authorJobTitle: "Fashion Editor",
  },
};
