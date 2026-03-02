import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TeamMemberCard } from "./TeamMemberCard";

const meta = {
  title: "Common/TeamMemberCard",
  component: TeamMemberCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A team member card component that displays a team member's image with their name and position overlaid on a gradient. Features a bottom-aligned text overlay with a dark gradient for readability.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    imageSrc: {
      control: "text",
      description: "Path to the team member's image",
    },
    name: {
      control: "text",
      description: "Team member's full name",
    },
    position: {
      control: "text",
      description: "Team member's role or position",
    },
    sizes: {
      control: "text",
      description: "Image sizes attribute for responsive loading",
    },
  },
} satisfies Meta<typeof TeamMemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: "/assets/about-us-team-member-1.jpg",
    name: "Sarah Johnson",
    position: "Creative Director",
  },
  render: (args) => (
    <div style={{ width: 320, height: 400 }}>
      <TeamMemberCard {...args} />
    </div>
  ),
};

export const CEO: Story = {
  args: {
    imageSrc: "/assets/about-us-team-member-2.jpg",
    name: "Michael Chen",
    position: "Chief Executive Officer",
  },
  render: (args) => (
    <div style={{ width: 320, height: 400 }}>
      <TeamMemberCard {...args} />
    </div>
  ),
};

export const Designer: Story = {
  args: {
    imageSrc: "/assets/about-us-team-member-3.jpg",
    name: "Emily Rodriguez",
    position: "Lead Designer",
  },
  render: (args) => (
    <div style={{ width: 320, height: 400 }}>
      <TeamMemberCard {...args} />
    </div>
  ),
};
