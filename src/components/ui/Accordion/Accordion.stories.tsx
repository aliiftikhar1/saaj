import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A collapsible accordion component built with Radix UI primitives. Supports single or multiple items open at once.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Whether only one or multiple items can be open at once",
    },
    collapsible: {
      control: { type: "boolean" },
      description: "Whether items can be collapsed (only for single type)",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          We offer a 30-day return policy on all items. Products must be in
          original condition with tags attached.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          Standard shipping typically takes 5-7 business days. Express shipping
          is available for 2-3 day delivery.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
        <AccordionContent>
          Yes, we ship to over 100 countries worldwide. International shipping
          times vary by location.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion {...args} className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
        <AccordionContent>
          We accept all major credit cards, PayPal, Apple Pay, and Google Pay.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I track my order?</AccordionTrigger>
        <AccordionContent>
          {
            "Yes, once your order ships, you'll receive a tracking number via email."
          }
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What about gift wrapping?</AccordionTrigger>
        <AccordionContent>
          Gift wrapping is available for $5 per item. Select this option at
          checkout.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  args: {
    type: "single",
    collapsible: true,
    defaultValue: "item-2",
  },
  render: (args) => (
    <Accordion {...args} className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent>
          All our products are made from high-quality materials and undergo
          rigorous quality testing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
        <AccordionContent>
          Free shipping on orders over $50. Standard delivery takes 5-7 business
          days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Customer Support</AccordionTrigger>
        <AccordionContent>
          Our customer support team is available 24/7 via email, phone, or live
          chat.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
