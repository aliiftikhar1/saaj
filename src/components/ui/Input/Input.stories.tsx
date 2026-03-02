import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A simple input component with text prop and clean styling variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["dark", "light"],
      description: "Visual style variant of the input",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the input",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Input type",
    },
  },
  args: {
    variant: "dark",
    disabled: false,
    placeholder: "Enter text...",
    type: "text",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    variant: "dark",
    placeholder: "Dark input placeholder",
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    placeholder: "Light input placeholder",
  },
  globals: {
    backgrounds: {
      value: "dark"
    }
  },
};

export const WithValue: Story = {
  args: {
    variant: "dark",
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    variant: "dark",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const Password: Story = {
  args: {
    variant: "dark",
    placeholder: "Enter password",
    type: "password",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Error input",
    isError: true,
  },
};
