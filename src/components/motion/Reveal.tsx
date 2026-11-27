"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

interface MotionProviderProps {
  children: ReactNode;
}

/** Wraps the application in Framer Motion with user reduced-motion preferences respected globally. */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  variant?: "rise" | "clip-up" | "scale";
}

/** Smoothly animates scrolled sections or visual masks into view without hiding jumped-to content. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  yOffset = 18,
  variant = "rise",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const element = containerRef.current;
    if (!element || typeof element.animate !== "function") {
      return;
    }

    // Do not hide or animate content already visible at or above the current scroll position.
    const initialRect = element.getBoundingClientRect();
    if (initialRect.top <= window.innerHeight * 0.95) {
      hasPlayedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (hasPlayedRef.current) {
            return;
          }
          if (entry.isIntersecting) {
            hasPlayedRef.current = true;

            const keyframes: Keyframe[] =
              variant === "clip-up"
                ? [
                    {
                      opacity: 0.3,
                      clipPath: "inset(14% 0% 0% 0%)",
                      transform: "translate3d(0, 14px, 0)",
                    },
                    {
                      opacity: 1,
                      clipPath: "inset(0% 0% 0% 0%)",
                      transform: "translate3d(0, 0, 0)",
                    },
                  ]
                : variant === "scale"
                  ? [
                      {
                        opacity: 0,
                        transform: "scale(0.96) translate3d(0, 12px, 0)",
                      },
                      {
                        opacity: 1,
                        transform: "scale(1) translate3d(0, 0, 0)",
                      },
                    ]
                  : [
                      {
                        opacity: 0,
                        transform: `translate3d(0, ${yOffset}px, 0)`,
                      },
                      {
                        opacity: 1,
                        transform: "translate3d(0, 0, 0)",
                      },
                    ];

            element.animate(keyframes, {
              duration: variant === "clip-up" ? 560 : 460,
              delay: Math.round(delay * 1000),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, shouldReduceMotion, variant, yOffset]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
