import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle group component that allows users to select from a set of options. Items are visually connected with rounded ends.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Whether to allow single or multiple selections",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable all toggle items",
    },
  },
  args: {
    type: "single",
    disabled: false,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  args: {
    type: "single",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="xs">XS</ToggleGroupItem>
      <ToggleGroupItem value="s">S</ToggleGroupItem>
      <ToggleGroupItem value="m">M</ToggleGroupItem>
      <ToggleGroupItem value="l">L</ToggleGroupItem>
      <ToggleGroupItem value="xl">XL</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Alignment: Story = {
  args: {
    type: "single",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultipleSelection: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
      <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
      <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: {
    type: "single",
    disabled: true,
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="xs">XS</ToggleGroupItem>
      <ToggleGroupItem value="s">S</ToggleGroupItem>
      <ToggleGroupItem value="m">M</ToggleGroupItem>
    </ToggleGroup>
  ),
};
