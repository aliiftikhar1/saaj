"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HomeVideoSectionWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // === REFS ===
  const sectionRef = useRef<HTMLElement | null>(null);

  // === HOOKS ===
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const scaledScrollYProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["40%", "100%"],
  );

  return (
    <div className="relative flex justify-center h-[90vh]">
      <motion.section
        className="flex h-full w-full max-w-full!"
        style={{
          alignItems: "flex-end",
          scale: scaledScrollYProgress,
        }}
        ref={sectionRef}
        id="section-home-video"
      >
        {children}
      </motion.section>
    </div>
  );
}
