import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "../Button";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A customizable dialog component built on Radix UI Dialog primitive. Features mobile-first bottom sheet on small screens and top-right positioning on desktop. Includes overlay, close button, and flexible content areas with header, body, and footer.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button text="Open Dialog" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a basic dialog with header and description.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">Dialog content goes here.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button text="Open Dialog with Footer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to continue? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button text="Cancel" variant="light" />
            </DialogClose>
            <DialogClose asChild>
              <Button text="Confirm" variant="dark" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button text="Open Dialog (No Close Button)" />
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog has the close button hidden. Use the buttons below to
              close.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button text="Close" variant="dark" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <Button text="Toggle Dialog" onClick={() => setOpen(!open)} />
        <p className="text-sm text-neutral-08">
          Dialog state: {open ? "Open" : "Closed"}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog is controlled by external state.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm">
                The dialog state is managed by a React state variable.
              </p>
            </div>
            <DialogFooter>
              <Button
                text="Close Programmatically"
                onClick={() => setOpen(false)}
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
