"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Renders a hairline scroll reading progress bar along the bottom edge of the fixed header. */
export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] bg-white/10"
    >
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-[#5227FF]"
      />
    </div>
  );
}
