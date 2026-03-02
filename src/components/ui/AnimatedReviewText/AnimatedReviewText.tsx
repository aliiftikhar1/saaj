"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

import { SCROLL_ANIMATION_IN_VIEW_CONFIG } from "@/lib/animations";

type AnimatedReviewTextProps = {
  text: string;
  className?: string;
  wordStaggerDelay?: number;
  disableIsInView?: boolean;
  animationTriggered?: boolean;
};

export function AnimatedReviewText({
  text,
  className = "",
  wordStaggerDelay = 0.1,
  disableIsInView = false,
  animationTriggered = false,
}: AnimatedReviewTextProps) {
  // === REF ===
  const ref = useRef<HTMLDivElement | null>(null);

  // === HOOKS ===
  const isInView = useInView(ref, SCROLL_ANIMATION_IN_VIEW_CONFIG);

  // === FUNCTIONS ===
  const words = text.split(" ");

  // === FRAMER MOTION VARIANTS ===
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: wordStaggerDelay,
      },
    },
  };

  const word: Variants = {
    hidden: {
      opacity: 0.001,
      filter: "blur(10px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.div
        ref={ref}
        className={className}
        variants={container}
        initial="hidden"
        animate={
          disableIsInView
            ? animationTriggered
              ? "visible"
              : "hidden"
            : isInView
              ? "visible"
              : "hidden"
        }
        aria-hidden="true"
      >
        {words.map((wordText, wordIndex) => (
          <motion.span
            key={wordIndex}
            variants={word}
            style={{
              display: "inline-block",
              marginRight: wordIndex < words.length - 1 ? "0.25rem" : "0",
              willChange: "transform, opacity, filter",
            }}
          >
            {wordText}
          </motion.span>
        ))}
      </motion.div>
    </>
  );
}
