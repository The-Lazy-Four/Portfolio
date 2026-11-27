"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { ProcessStageVisual } from "@/components/visuals/ProcessStageVisual";
import { PROCESS_STAGES } from "@/data/process";

/** Renders a sticky scroll-driven 4-stage client journey on deep pine with dynamic progression feedback. */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
  });

  // Update the active sticky stage automatically as each chapter enters reading focus.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stageRefs.current.forEach((stageElement, index) => {
      if (!stageElement) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveStageIndex(index);
            }
          }
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0.01,
        }
      );

      observer.observe(stageElement);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  /** Scrolls smoothly to a selected process stage when clicked on desktop. */
  function jumpToStage(index: number) {
    setActiveStageIndex(index);
    const target = stageRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const activeStage = PROCESS_STAGES[activeStageIndex];

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="border-b border-pine-soft bg-pine text-paper"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {/* Top headline */}
        <div className="flex flex-col justify-between gap-6 border-b border-paper/15 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
              WG / 03 — Our Process
            </span>
            <MaskedText
              as="h2"
              id="process-heading"
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-paper sm:text-5xl"
              lines={[
                "A continuous journey from",
                <span key="proc-l2" className="font-serif font-normal italic text-paper/85">
                  first conversation to long-term growth.
                </span>,
              ]}
            />
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-paper/75">
            Four clear stages—so you always know what we are building, why it
            matters, and how it stays cared for after launch.
          </p>
        </div>

        {/* Desktop sticky visual + scrolling chapters */}
        <div className="mt-12 hidden grid-cols-12 gap-12 lg:grid">
          {/* Left sticky progression stage */}
          <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="border border-paper/15 bg-pine-soft/45 p-6">
              <div className="flex items-baseline justify-between border-b border-paper/15 pb-4">
                <div>
                  <span className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">
                    Active Stage
                  </span>
                  <p className="mt-1 font-display text-2xl font-bold text-paper">
                    {activeStage.number} — {activeStage.title}
                  </p>
                </div>
                <span className="font-mono text-xs text-paper/65">
                  {activeStage.number} / 04
                </span>
              </div>

              {/* Dynamic stage blueprint visual */}
              <div className="my-5">
                <ProcessStageVisual stageIndex={activeStageIndex} />
              </div>

              {/* Scroll-linked continuous progression indicator */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] tracking-wider text-paper/65 uppercase">
                  <span>Journey Progress</span>
                  <span>{activeStage.focusLabel}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-paper/15">
                  {shouldReduceMotion ? (
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${((activeStageIndex + 1) / 4) * 100}%` }}
                    />
                  ) : (
                    <motion.div
                      style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
                      className="h-full w-full bg-accent"
                    />
                  )}
                </div>
              </div>

              {/* Stage quick-jump buttons */}
              <div className="mt-5 grid grid-cols-4 gap-2">
                {PROCESS_STAGES.map((stage, index) => {
                  const isActive = index === activeStageIndex;
                  return (
                    <button
                      key={stage.number}
                      type="button"
                      onClick={() => jumpToStage(index)}
                      aria-pressed={isActive}
                      className={`border py-2 font-mono text-xs transition-colors ${
                        isActive
                          ? "border-accent bg-accent text-paper"
                          : "border-paper/20 text-paper/75 hover:border-paper/50 hover:text-paper"
                      }`}
                    >
                      {stage.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 narrative stages */}
          <div className="space-y-8 lg:col-span-7">
            {PROCESS_STAGES.map((stage, index) => {
              const isActive = index === activeStageIndex;
              return (
                <article
                  key={stage.number}
                  ref={(element) => {
                    stageRefs.current[index] = element;
                  }}
                  onMouseEnter={() => setActiveStageIndex(index)}
                  className={`border p-8 transition-all duration-300 ${
                    isActive
                      ? "border-accent bg-pine-soft/75"
                      : "border-paper/15 bg-pine-soft/25 opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
                      Stage {stage.number} · {stage.focusLabel}
                    </span>
                    <span className="font-display text-3xl font-bold text-paper/25">
                      {stage.number}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-paper">
                    {stage.number} — {stage.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-paper/85">
                    {stage.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-paper/15 pt-5">
                    {stage.clientReceives.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-paper/90"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent-hover"
              >
                Begin at Stage 01 — Discover
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet vertical interactive journey */}
        <div className="mt-10 space-y-4 lg:hidden">
          {PROCESS_STAGES.map((stage, index) => {
            const isActive = index === activeStageIndex;
            return (
              <div
                key={stage.number}
                className={`border transition-colors ${
                  isActive
                    ? "border-accent bg-pine-soft/75"
                    : "border-paper/15 bg-pine-soft/30"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveStageIndex(index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <div>
                    <span className="font-mono text-xs text-accent">
                      {stage.number} · {stage.focusLabel}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-paper">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-paper/70">
                    {isActive ? "Active" : "View"}
                  </span>
                </button>

                {isActive && (
                  <div className="space-y-4 border-t border-paper/15 p-5">
                    <ProcessStageVisual stageIndex={index} />
                    <p className="text-sm leading-relaxed text-paper/85">
                      {stage.summary}
                    </p>
                    <ul className="space-y-2">
                      {stage.clientReceives.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-paper/90"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
