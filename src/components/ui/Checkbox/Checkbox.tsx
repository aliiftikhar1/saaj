"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib";

type CheckboxProps = {
  id: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  variant?: "dark" | "light";
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
};

export function Checkbox(props: CheckboxProps) {
  // === PROPS ===
  const {
    id,
    label,
    checked,
    onCheckedChange,
    variant = "light",
    disabled = false,
    className,
    labelClassName,
  } = props;

  // === CLASSES ===
  const checkboxClass = cn(
    // Layout & Size
    "h-4.5 w-4.5 shrink-0",
    // Appearance
    "rounded border-2 transition-all",
    // Focus States
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
    // Disabled States
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Variant Classes
    variant === "dark" && [
      "border-neutral-08 bg-neutral-11",
      "data-[state=checked]:bg-white data-[state=checked]:border-white",
    ],
    variant === "light" && [
      "border-neutral-05 bg-white",
      "data-[state=checked]:bg-neutral-11 data-[state=checked]:border-neutral-11",
    ],
    className,
  );

  const labelClass = cn(
    "text-base font-medium cursor-pointer select-none",
    variant === "dark" ? "text-white" : "text-neutral-10",
    disabled && "cursor-not-allowed opacity-50",
    labelClassName,
  );

  const iconClass = cn(
    "h-3.5 w-3.5",
    variant === "dark" ? "text-neutral-11" : "text-white",
  );

  return (
    <div className="flex items-center gap-3">
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={checkboxClass}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check className={iconClass} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </div>
  );
}
