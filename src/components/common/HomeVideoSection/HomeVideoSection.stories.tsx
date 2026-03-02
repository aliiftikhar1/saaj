import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HomeVideoSection } from "./HomeVideoSection";
import { HomeVideoSectionWrapper } from "./HomeVideoSectionClient";

const meta: Meta<typeof HomeVideoSection> = {
  title: "Common/HomeVideoSection",
  component: HomeVideoSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full-screen video section with overlay gradient and centered text. Features autoplay video with fallback poster and responsive text sizing.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The default home video section with background video, gradient overlay, and centered headline text.",
      },
    },
  },
};

export const WithWrapper: Story = {
  render: () => {
    return (
      <>
        <div className="h-screen" />
        <HomeVideoSectionWrapper>
          <HomeVideoSection />
        </HomeVideoSectionWrapper>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "The home video section with the animated wrapper that scales from 40% to 100% based on scroll position.",
      },
    },
  },
};
