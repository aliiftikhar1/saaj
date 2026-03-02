"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib";
import { SCROLL_ANIMATION_IN_VIEW_CONFIG } from "@/lib/animations";

type AnimatedHeadingTextProps = {
  className?: string;
  text: string;
  variant?:
    | "home-screen"
    | "page-title"
    | "sub-page-title"
    | "product-page-title";
  disableIsInView?: boolean;
};

export function AnimatedHeadingText({
  text,
  variant = "page-title",
  className = "",
  disableIsInView = false,
}: AnimatedHeadingTextProps) {
  // === REF ===
  const ref = useRef<HTMLHeadingElement | null>(null);

  // === HOOKS ===
  const isInView = useInView(ref, SCROLL_ANIMATION_IN_VIEW_CONFIG);

  // === FUNCTIONS ===
  const words = text.split(" ");

  const staggerValueMap: { [key: string]: number } = {
    "home-screen": 0.03,
    "product-page-title": 0.03,
    "sub-page-title": 0.03,
    "page-title": 0.01,
  };

  // === FRAMER MOTION VARIANTS ===
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerValueMap[variant],
      },
    },
  };

  const letter: Variants = {
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
      <h3 className="sr-only">{text}</h3>
      <motion.h2
        ref={ref}
        className={cn(
          className,
          variant === "product-page-title" &&
            "font-medium text-2xl md:text-3xl xl:text-4xl",
          variant === "page-title" &&
            "text-4xl sm:text-5xl xl:text-7xl lg:text-6xl",
          variant === "home-screen" && "text-4xl! md:text-5xl! xl:text-6xl",
          variant === "sub-page-title" && "text-2xl md:text-3xl lg:text-4xl",
        )}
        variants={container}
        initial="hidden"
        animate={disableIsInView ? "visible" : isInView ? "visible" : "hidden"}
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={letter}
                style={{
                  display: "inline-block",
                  willChange: "transform, opacity, filter",
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.h2>
    </>
  );
}
