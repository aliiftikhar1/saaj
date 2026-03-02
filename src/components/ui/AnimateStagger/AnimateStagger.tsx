"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

import { SCROLL_ANIMATION_IN_VIEW_CONFIG } from "@/lib/animations";

type AnimateStaggerProps = {
  children?: React.ReactNode;
  className?: string;
  childClassName?: string;
  staggerDelay?: number;
  duration?: "short" | "normal" | "long";
  disableIsInView?: boolean;
};

export function AnimateStagger(props: AnimateStaggerProps) {
  // === PROPS ===
  const {
    children,
    className = "",
    childClassName = "",
    staggerDelay = 0.1,
    duration = "normal",
    disableIsInView = false,
  } = props;

  // === REF ===
  const ref = useRef<HTMLDivElement>(null);

  // === HOOKS ===
  const isInView = useInView(ref, SCROLL_ANIMATION_IN_VIEW_CONFIG);

  // === DURATION MAP ===
  const durationMap: { [key: string]: number } = {
    short: 0.15,
    normal: 0.3,
    long: 0.7,
  };
  const durationValue = durationMap[duration] || durationMap["normal"];

  // === FRAMER MOTION VARIANTS ===
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: "var(--animate-y, 200px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durationValue,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={disableIsInView ? "visible" : isInView ? "visible" : "hidden"}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div className={childClassName} key={index} variants={item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </motion.div>
  );
}
