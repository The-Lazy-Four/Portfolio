"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface MaskedLine {
  content: ReactNode;
}

interface MaskedTextProps {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  trigger?: "mount" | "scroll";
  baseDelay?: number;
  lineDelay?: number;
}

/** Reveals display typography line-by-line from masked vertical clipping tracks on load or scroll. */
export function MaskedText({
  lines,
  as = "h2",
  id,
  className = "",
  trigger = "scroll",
  baseDelay = 0,
  lineDelay = 0.08,
}: MaskedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Keep mount lines ready to animate immediately, and scroll lines resilient to anchor jumps.
  const [hasEntered, setHasEntered] = useState(trigger === "mount");

  useEffect(() => {
    if (shouldReduceMotion || trigger === "mount") {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    /** Reveals the text lines as soon as the element enters or has already passed the viewport. */
    function checkVisibility() {
      if (!element) {
        return false;
      }
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.94) {
        setHasEntered(true);
        return true;
      }
      return false;
    }

    // Trigger immediately on mount if already in view; otherwise observe natural scroll.
    const rafId = window.requestAnimationFrame(() => {
      if (checkVisibility()) {
        return;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || checkVisibility()) {
            setHasEntered(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(element);

    function handleScroll() {
      if (checkVisibility()) {
        observer.disconnect();
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldReduceMotion, trigger]);

  const Tag = as;

  return (
    <div ref={containerRef}>
      <Tag id={id} className={className}>
        {lines.map((lineContent, index) => (
          <span key={index} className="block overflow-hidden pb-[0.06em]">
            {shouldReduceMotion ? (
              <span className="block">{lineContent}</span>
            ) : (
              <motion.span
                className="block"
                initial={
                  trigger === "mount" ? { y: "108%", opacity: 0.2 } : false
                }
                animate={
                  hasEntered
                    ? { y: "0%", opacity: 1 }
                    : { y: "108%", opacity: 0.2 }
                }
                transition={{
                  duration: 0.62,
                  delay: baseDelay + index * lineDelay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {lineContent}
              </motion.span>
            )}
          </span>
        ))}
      </Tag>
    </div>
  );
}
