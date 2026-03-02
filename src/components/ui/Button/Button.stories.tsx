import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A simple button component with text prop and clean styling variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
      description: "Button text content",
    },
    variant: {
      control: { type: "select" },
      options: ["dark", "light"],
      description: "Visual style variant of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the button",
    },
  },
  args: {
    text: "Button",
    variant: "dark",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    text: "Dark Button",
    variant: "dark",
  },
};

export const DarkAlternative: Story = {
  args: {
    text: "Dark Alternative Button",
    variant: "dark-alternative",
  },
  render: (args) => (
    <div className="bg-black p-10">
      <Button {...args} />
    </div>
  ),
};

export const Light: Story = {
  args: {
    text: "Light Button",
    variant: "light",
  },
};

export const Disabled: Story = {
  args: {
    text: "Disabled Button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    text: "Loading Button",
    isLoading: true,
  },
};

export const LightLoading: Story = {
  args: {
    text: "Loading Button",
    isLoading: true,
    variant: "light",
  },
};
