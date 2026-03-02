"use client";

import { cn } from "@/lib";
import Link from "next/link";

type LinkType = {
  href: string;
  text: string;
  variant?: "default" | "on-dark" | "on-dark-secondary";
  onMouseEnter?: () => void;
};

export function CustomLink(props: LinkType) {
  // --- PROPS ---
  const { href, text, variant = "default", onMouseEnter = () => {} } = props;

  // === FUNCTIONS ===
  const showHoverEffect = () => variant === "on-dark" || variant === "default";

  // --- CLASSES ---
  const linkClass = cn(
    "relative inline-block",

    showHoverEffect() && "transition-colors duration-200 w-fit",
    showHoverEffect() &&
      "before:absolute before:bottom-[-2px] before:left-0 before:h-[1px] before:w-0 before:bg-current",
    showHoverEffect() &&
      "hover:before:w-full hover:before:transition-all hover:before:duration-300 hover:before:ease-in-out",

    variant === "default" && "text-navbar",
    variant === "on-dark" && "text-neutral-06 hover:text-white",
    variant === "on-dark-secondary" && "text-white hover:underline",
  );

  return (
    <Link onMouseEnter={onMouseEnter} href={href} className={linkClass}>
      {text}
    </Link>
  );
}
