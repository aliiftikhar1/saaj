import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { CheckoutButtonUI } from "./CheckoutButtonUI";

const meta = {
  title: "Checkout/CheckoutButton",
  component: CheckoutButtonUI,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A button component for initiating the checkout process. Styled to match the brand theme and intended for use in cart or checkout flows.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling the button",
    },
    onClick: {
      action: "onClick",
      description: "Callback when the button is clicked",
    },
    isLoading: {
      control: "boolean",
      description: "Indicates if the button is in a loading state",
    },
  },
} satisfies Meta<typeof CheckoutButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    className: "",
    onClick: () => {},
    isLoading: false,
  },
  render: (args) => {
    const [clicked, setClicked] = useState(false);

    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 p-4">
        <CheckoutButtonUI
          {...args}
          onClick={() => {
            setClicked(true);
            if (args.onClick) {
              args.onClick();
            }
          }}
        />
        <p className="text-sm text-neutral-08">
          Button state: {clicked ? "Clicked" : "Not Clicked"}
        </p>
      </div>
    );
  },
};
