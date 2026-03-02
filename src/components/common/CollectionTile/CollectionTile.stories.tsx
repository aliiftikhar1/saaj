import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CollectionTile } from "./CollectionTile";

const meta = {
  title: "Common/CollectionTile",
  component: CollectionTile,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A collection tile component that displays a collection with an image, title, and description. Links to the collection page when clicked.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "URL path for the collection link",
    },
    imageUrl: {
      control: "text",
      description: "Collection image URL",
    },
    title: {
      control: "text",
      description: "Collection title",
    },
    description: {
      control: "text",
      description: "Collection description text",
    },
  },
} satisfies Meta<typeof CollectionTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/collections/summer",
    imageUrl: "/assets/clothes-model.jpg",
    title: "Summer Collection",
    description: "Light and comfortable pieces perfect for warm weather.",
  },
  render: (args) => (
    <div className="w-80">
      <CollectionTile {...args} />
    </div>
  ),
};
