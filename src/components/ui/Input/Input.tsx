import * as React from "react";

import { cn } from "@/lib";

type InputProps = React.ComponentProps<"input"> & {
  variant?: "dark" | "light";
  isError?: boolean;
};

export function Input(props: InputProps) {
  // --- PROPS ---
  const { variant = "dark", className, isError, ...inputProps } = props;

  // --- CLASSES ---
  const inputClass = cn(
    // Layout & Positioning
    "px-6 py-3 inline-flex items-center text-start",
    // Appearance
    "rounded-4xl text-body-medium-light",
    // Always reserve border width to prevent layout shift
    "border border-1 border-transparent",
    // Focus States
    "focus:outline-none focus:border-blue-400",
    // Error States
    isError && "border-red-500 focus:border-red-400",

    // Variant Classes
    variant === "dark" &&
      "bg-neutral-11 text-white placeholder:text-neutral-08",
    variant === "light" &&
      "bg-neutral-01 placeholder:text-neutral-08 text-black",

    className,
  );

  return <input className={inputClass} {...inputProps} />;
}
