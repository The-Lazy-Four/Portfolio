"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";

gsap.registerPlugin(ScrollTrigger);

interface HighlighterRevealProps {
  lines: string[];
  className?: string;
  barClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  id?: string;
  delaySeconds?: number;
}

/** Reveals headline lines with solid highlighter wipe blocks inspired by Lando Norris' editorial motion language. */
export function HighlighterReveal({
  lines,
  className = "",
  barClassName = "bg-accent",
  as: Component = "h2",
  id,
  delaySeconds = 0,
}: HighlighterRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { reducedMotion } = useCinemaEngine();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const textEls = container.querySelectorAll<HTMLElement>("[data-hl-text]");
      const barEls = container.querySelectorAll<HTMLElement>("[data-hl-bar]");

      gsap.set(textEls, { opacity: 0 });
      gsap.set(barEls, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        delay: delaySeconds,
        scrollTrigger: {
          trigger: container,
          start: "top 86%",
          once: true,
        },
      });

      textEls.forEach((textEl, index) => {
        const barEl = barEls[index];
        const offset = index * 0.1;

        tl.to(
          barEl,
          {
            scaleX: 1,
            duration: 0.34,
            ease: "power3.inOut",
          },
          offset
        )
          .set(textEl, { opacity: 1 }, offset + 0.33)
          .set(barEl, { transformOrigin: "right center" }, offset + 0.34)
          .to(
            barEl,
            {
              scaleX: 0,
              duration: 0.36,
              ease: "power3.out",
            },
            offset + 0.35
          );
      });
    }, container);

    return () => context.revert();
  }, [delaySeconds, reducedMotion, lines.length]);

  return (
    <Component id={id} className={className}>
      <span ref={containerRef} className="block">
        {lines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="relative block w-fit max-w-full overflow-hidden"
          >
            <span data-hl-text className="relative z-0 block">
              {line}
            </span>
            {!reducedMotion && (
              <span
                data-hl-bar
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0.5 inset-x-0 z-10 ${barClassName}`}
              />
            )}
          </span>
        ))}
      </span>
    </Component>
  );
}

interface ScrubbedStatementProps {
  text: string;
  accentWord?: string;
  className?: string;
  id?: string;
}

/** Scrubs word-by-word text illumination tied directly to scroll progress, adapted from Terminal Industries. */
export function ScrubbedStatement({
  text,
  accentWord,
  className = "",
  id,
}: ScrubbedStatementProps) {
  const wrapperRef = useRef<HTMLParagraphElement | null>(null);
  const { reducedMotion } = useCinemaEngine();
  const words = text.split(" ");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      const wordSpans = wrapper.querySelectorAll<HTMLElement>("[data-scrub-word]");
      gsap.set(wordSpans, { opacity: 0.36 });

      gsap.to(wordSpans, {
        opacity: 1,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 90%",
          end: "top 38%",
          scrub: 0.45,
        },
      });
    }, wrapper);

    return () => context.revert();
  }, [reducedMotion, text]);

  return (
    <p id={id} ref={wrapperRef} className={className}>
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,—–]/g, "");
        const isAccent =
          accentWord &&
          cleanWord.toLowerCase() === accentWord.toLowerCase();

        return (
          <span
            key={`${word}-${index}`}
            data-scrub-word
            className={`inline-block ${
              isAccent ? "font-serif font-normal italic text-accent" : ""
            }`}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </p>
  );
}

interface ParallaxContourFieldProps {
  children?: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

/** Renders continuous vector topographic contours that drift subtly on scroll to unify separate scenes. */
export function ParallaxContourField({
  children,
  variant = "light",
  className = "",
}: ParallaxContourFieldProps) {
  const strokeColor =
    variant === "dark" ? "rgba(246, 243, 236, 0.07)" : "rgba(22, 26, 24, 0.065)";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M-40 160 C 260 60, 480 280, 780 180 C 1080 80, 1260 260, 1500 140"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />
        <path
          d="M-60 300 C 220 190, 520 420, 860 310 C 1160 210, 1310 380, 1520 270"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />
        <path
          d="M-40 480 C 310 350, 560 590, 920 470 C 1200 375, 1340 530, 1500 440"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />
        <ellipse
          cx="1160"
          cy="240"
          rx="210"
          ry="130"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />
        <ellipse
          cx="260"
          cy="520"
          rx="260"
          ry="150"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
