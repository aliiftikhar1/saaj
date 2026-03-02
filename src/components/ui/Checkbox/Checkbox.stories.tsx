import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A checkbox component with label support, controlled/uncontrolled modes, and clean styling variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique identifier for the checkbox",
    },
    label: {
      control: { type: "text" },
      description: "Label text displayed next to the checkbox",
    },
    variant: {
      control: { type: "select" },
      options: ["dark", "light"],
      description: "Visual style variant of the checkbox",
    },
    checked: {
      control: { type: "boolean" },
      description: "Controlled checked state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the checkbox",
    },
  },
  args: {
    id: "checkbox",
    label: "Checkbox label",
    variant: "light",
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    id: "light-checkbox",
    label: "I agree to the terms and conditions",
    variant: "light",
  },
};

export const Dark: Story = {
  args: {
    id: "dark-checkbox",
    label: "Subscribe to newsletter",
    variant: "dark",
  },
  render: (args) => (
    <div className="bg-neutral-11 p-10">
      <Checkbox {...args} />
    </div>
  ),
};

export const Checked: Story = {
  args: {
    id: "checked-checkbox",
    label: "This is checked",
    checked: true,
    variant: "light",
  },
};

export const CheckedDark: Story = {
  args: {
    id: "checked-dark-checkbox",
    label: "This is checked",
    checked: true,
    variant: "dark",
  },
  render: (args) => (
    <div className="bg-neutral-11 p-10">
      <Checkbox {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    id: "disabled-checkbox",
    label: "This option is disabled",
    disabled: true,
    variant: "light",
  },
};

export const DisabledChecked: Story = {
  args: {
    id: "disabled-checked-checkbox",
    label: "Disabled and checked",
    disabled: true,
    checked: true,
    variant: "light",
  },
};

export const Controlled: Story = {
  args: {
    id: "controlled-checkbox",
    label: "Toggle me (controlled)",
    variant: "light",
  },
  render: function ControlledCheckbox(args) {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
        <p className="text-sm text-neutral-10">
          Current state: {checked ? "Checked" : "Unchecked"}
        </p>
      </div>
    );
  },
};

export const LongLabel: Story = {
  args: {
    id: "long-label-checkbox",
    label:
      "I have read and agree to the terms of service, privacy policy, and cookie policy. I understand that my data will be processed according to these policies.",
    variant: "light",
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <div className="max-w-md">
      <Checkbox {...args} />
    </div>
  ),
};
