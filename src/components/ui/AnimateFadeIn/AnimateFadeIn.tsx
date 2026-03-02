"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  SCROLL_ANIMATION_IN_VIEW_CONFIG,
  SCROLL_ANIMATION_IN_VIEW_CONFIG_NO_MARGIN,
} from "@/lib/animations";

type AnimateFadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: "short" | "normal" | "long";
  hidden?: boolean;
  noMargin?: boolean;
};

export function AnimateFadeIn(props: AnimateFadeInProps) {
  // === PROPS ===
  const {
    children,
    className = "",
    delay = 0.1,
    duration = "long",
    hidden = false,
    noMargin = false,
  } = props;

  // === REF ===
  const ref = useRef<HTMLDivElement>(null);

  // === HOOKS ===
  const isInView = useInView(
    ref,
    noMargin
      ? SCROLL_ANIMATION_IN_VIEW_CONFIG_NO_MARGIN
      : SCROLL_ANIMATION_IN_VIEW_CONFIG,
  );

  // === DURATION MAP ===
  // match tailwind duration classes
  const durationMap: { [key: string]: number } = {
    short: 0.15,
    normal: 0.3,
    long: 0.7,
  };
  const durationValue = durationMap[duration] || durationMap["normal"];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: hidden ? 0 : isInView ? 1 : 0 }}
      transition={{ delay, duration: durationValue, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
