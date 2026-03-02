"use client";

import * as React from "react";
import * as AdminDropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib";
function AdminDropdownMenu({
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Root>) {
  return (
    <AdminDropdownMenuPrimitive.Root
      data-slot="admin-dropdown-menu"
      {...props}
    />
  );
}

function AdminDropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Portal>) {
  return (
    <AdminDropdownMenuPrimitive.Portal
      data-slot="admin-dropdown-menu-portal"
      {...props}
    />
  );
}

function AdminDropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Trigger>) {
  return (
    <AdminDropdownMenuPrimitive.Trigger
      data-slot="admin-dropdown-menu-trigger"
      {...props}
    />
  );
}

function AdminDropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Content>) {
  return (
    <AdminDropdownMenuPrimitive.Portal>
      <AdminDropdownMenuPrimitive.Content
        data-slot="admin-dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-admin-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-admin-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </AdminDropdownMenuPrimitive.Portal>
  );
}

function AdminDropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Group>) {
  return (
    <AdminDropdownMenuPrimitive.Group
      data-slot="admin-dropdown-menu-group"
      {...props}
    />
  );
}

function AdminDropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <AdminDropdownMenuPrimitive.Item
      data-slot="admin-dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function AdminDropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.CheckboxItem>) {
  return (
    <AdminDropdownMenuPrimitive.CheckboxItem
      data-slot="admin-dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <AdminDropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </AdminDropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </AdminDropdownMenuPrimitive.CheckboxItem>
  );
}

function AdminDropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.RadioGroup>) {
  return (
    <AdminDropdownMenuPrimitive.RadioGroup
      data-slot="admin-dropdown-menu-radio-group"
      {...props}
    />
  );
}

function AdminDropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.RadioItem>) {
  return (
    <AdminDropdownMenuPrimitive.RadioItem
      data-slot="admin-dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <AdminDropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </AdminDropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </AdminDropdownMenuPrimitive.RadioItem>
  );
}

function AdminDropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <AdminDropdownMenuPrimitive.Label
      data-slot="admin-dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function AdminDropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Separator>) {
  return (
    <AdminDropdownMenuPrimitive.Separator
      data-slot="admin-dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function AdminDropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="admin-dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

function AdminDropdownMenuSub({
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.Sub>) {
  return (
    <AdminDropdownMenuPrimitive.Sub
      data-slot="admin-dropdown-menu-sub"
      {...props}
    />
  );
}

function AdminDropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <AdminDropdownMenuPrimitive.SubTrigger
      data-slot="admin-dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </AdminDropdownMenuPrimitive.SubTrigger>
  );
}

function AdminDropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof AdminDropdownMenuPrimitive.SubContent>) {
  return (
    <AdminDropdownMenuPrimitive.SubContent
      data-slot="admin-dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-Admindropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

export {
  AdminDropdownMenu,
  AdminDropdownMenuPortal,
  AdminDropdownMenuTrigger,
  AdminDropdownMenuContent,
  AdminDropdownMenuGroup,
  AdminDropdownMenuLabel,
  AdminDropdownMenuItem,
  AdminDropdownMenuCheckboxItem,
  AdminDropdownMenuRadioGroup,
  AdminDropdownMenuRadioItem,
  AdminDropdownMenuSeparator,
  AdminDropdownMenuShortcut,
  AdminDropdownMenuSub,
  AdminDropdownMenuSubTrigger,
  AdminDropdownMenuSubContent,
};
