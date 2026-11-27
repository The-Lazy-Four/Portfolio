"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Renders the continuous scroll reading bar anchored directly along the header bottom border. */
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
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-[3px] bg-ink/15"
    >
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-cobalt"
      />
    </div>
  );
}
