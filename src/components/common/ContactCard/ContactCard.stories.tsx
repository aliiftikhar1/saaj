import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactCard } from "./ContactCard";
import { Mail } from "lucide-react";

const meta = {
  title: "Common/ContactCard",
  component: ContactCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A contact card component that displays an icon, title, and description. Optionally becomes a link when an href is provided.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    href: {
      control: "text",
      description: "Optional URL. When provided, the card renders as a link.",
    },
    title: {
      control: "text",
      description: "Card title",
    },
    description: {
      control: "text",
      description: "Supporting text for the card",
    },
    icon: {
      control: false,
      description: "Icon displayed next to the title",
    },
  },
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Email Us",
    description: "Get in touch with our support team for help and inquiries.",
    icon: <Mail size={24} />,
  },
  render: (args) => (
    <div className="w-80">
      <ContactCard {...args} />
    </div>
  ),
};

export const AsLink: Story = {
  args: {
    href: "/contact",
    title: "Contact Support",
    description: "Reach out to our support team via email or phone.",
    icon: <Mail size={24} />,
  },
  render: (args) => (
    <div className="w-80">
      <ContactCard {...args} />
    </div>
  ),
};
