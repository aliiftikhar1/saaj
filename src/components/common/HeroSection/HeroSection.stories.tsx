import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroSection } from "./HeroSection";
import { BaseSection } from "@/components/layout";

const meta = {
  title: "Common/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A hero section component that displays a large background image. Uses the BaseSection wrapper for consistent padding and features rounded bottom corners.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <BaseSection id="hero">
      <HeroSection {...args} />
    </BaseSection>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The default hero section with the Cartelle hero image. The image fills the container with rounded bottom corners.",
      },
    },
  },
};
