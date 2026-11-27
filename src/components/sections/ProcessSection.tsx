"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { ProcessStageVisual } from "@/components/visuals/ProcessStageVisual";
import { PROCESS_STAGES } from "@/data/process";

/** Renders the Neo-Brutalist sticky 4-stage process journey used on /about while preserving existing scroll/spring logic. */
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

  /** Scrolls smoothly to the selected process stage on click. */
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
      className="border-b-[3px] border-ink bg-cobalt text-ivory"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-6 border-b-[3px] border-ivory pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-block border-2 border-ink bg-acid px-2.5 py-0.5 font-mono text-xs font-bold tracking-[0.1em] text-ink uppercase">
              WG / 03 — Our Process
            </span>
            <MaskedText
              as="h2"
              id="process-heading"
              className="mt-4 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ivory uppercase sm:text-5xl"
              lines={[
                "A continuous journey from",
                <span key="proc-l2" className="font-serif font-normal lowercase italic text-acid">
                  first conversation to long-term growth.
                </span>,
              ]}
            />
          </div>

          <p className="max-w-sm border-2 border-ink bg-ivory p-4 text-sm leading-relaxed text-ink shadow-[4px_4px_0px_#151515]">
            Four clear stages—so you always know what we are building, why it
            matters, and how it stays cared for after launch.
          </p>
        </div>

        {/* Desktop sticky panel + scrolling stages */}
        <div className="mt-12 hidden grid-cols-12 gap-12 lg:grid">
          <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="border-[3px] border-ink bg-ink p-6 text-ivory shadow-[8px_8px_0px_#E9FF45]">
              <div className="flex items-baseline justify-between border-b-2 border-ivory/25 pb-4">
                <div>
                  <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-acid uppercase">
                    Active Stage
                  </span>
                  <p className="mt-1 font-display text-2xl font-extrabold text-ivory uppercase">
                    {activeStage.number} — {activeStage.title}
                  </p>
                </div>
                <span className="bg-orange px-2 py-0.5 font-mono text-xs font-bold text-ivory">
                  {activeStage.number} / 04
                </span>
              </div>

              <div className="my-5">
                <ProcessStageVisual stageIndex={activeStageIndex} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] font-bold tracking-wider text-ivory/80 uppercase">
                  <span>Journey Progress</span>
                  <span className="text-acid">{activeStage.focusLabel}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden border border-ivory bg-cobalt/40 p-0.5">
                  {shouldReduceMotion ? (
                    <div
                      className="h-full bg-acid"
                      style={{ width: `${((activeStageIndex + 1) / 4) * 100}%` }}
                    />
                  ) : (
                    <motion.div
                      style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
                      className="h-full w-full bg-acid"
                    />
                  )}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {PROCESS_STAGES.map((stage, index) => {
                  const isActive = index === activeStageIndex;
                  return (
                    <button
                      key={stage.number}
                      type="button"
                      onClick={() => jumpToStage(index)}
                      aria-pressed={isActive}
                      className={`border-2 py-2 font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? "border-ink bg-acid text-ink"
                          : "border-ivory/35 bg-ink text-ivory hover:border-acid"
                      }`}
                    >
                      {stage.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

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
                  className={`border-[3px] p-8 transition-all duration-300 ${
                    isActive
                      ? "border-ink bg-ivory text-ink shadow-[8px_8px_0px_#E9FF45]"
                      : "border-ivory/50 bg-ink/85 text-ivory hover:border-acid"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 font-mono text-xs font-bold tracking-[0.1em] uppercase ${
                        isActive
                          ? "bg-orange text-ivory"
                          : "bg-cobalt text-ivory"
                      }`}
                    >
                      Stage {stage.number} · {stage.focusLabel}
                    </span>
                    <span className="font-display text-4xl font-extrabold opacity-30">
                      {stage.number}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight uppercase">
                    {stage.number} — {stage.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed opacity-90">
                    {stage.summary}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t-2 border-current/20 pt-5">
                    {stage.clientReceives.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm font-medium"
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isActive ? "text-cobalt" : "text-acid"
                          }`}
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
                className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-acid px-7 py-3.5 font-mono text-xs font-extrabold text-ink uppercase shadow-[5px_5px_0px_#151515] hover:bg-orange hover:text-ivory"
              >
                Begin at Stage 01 — Discover
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet accordion journey */}
        <div className="mt-10 space-y-4 lg:hidden">
          {PROCESS_STAGES.map((stage, index) => {
            const isActive = index === activeStageIndex;
            return (
              <div
                key={stage.number}
                className={`border-2 transition-colors ${
                  isActive
                    ? "border-ink bg-ivory text-ink shadow-[5px_5px_0px_#E9FF45]"
                    : "border-ivory/50 bg-ink text-ivory"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveStageIndex(index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <div>
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-cobalt" : "text-acid"
                      }`}
                    >
                      {stage.number} · {stage.focusLabel}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-extrabold uppercase">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="border border-current px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
                    {isActive ? "Active" : "View"}
                  </span>
                </button>

                {isActive && (
                  <div className="space-y-4 border-t-2 border-ink p-5">
                    <ProcessStageVisual stageIndex={index} />
                    <p className="text-sm leading-relaxed text-ink">
                      {stage.summary}
                    </p>
                    <ul className="space-y-2">
                      {stage.clientReceives.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed font-semibold text-ink"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt"
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
