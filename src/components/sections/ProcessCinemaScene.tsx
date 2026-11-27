"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";

interface ProcessMilestone {
  number: string;
  title: string;
  summary: string;
  outcome: string;
}

const PROCESS_MILESTONES: ProcessMilestone[] = [
  {
    number: "01",
    title: "Discover",
    summary: "We understand your business and its goals.",
    outcome:
      "We review how customers currently find you online, look at what isn't working, and clarify what matters most.",
  },
  {
    number: "02",
    title: "Strategize",
    summary: "We decide what your business actually needs.",
    outcome:
      "Instead of selling unnecessary extras, we agree on a clear, practical plan tailored to your budget and timeline.",
  },
  {
    number: "03",
    title: "Build & Implement",
    summary: "We design and implement the solutions.",
    outcome:
      "Our team designs, builds, and connects your website, Google visibility, apps, or review tools under one roof.",
  },
  {
    number: "04",
    title: "Manage & Grow",
    summary: "We continue supporting and improving your digital presence.",
    outcome:
      "After launch we stay involved—handling updates, improvements, hosting, and ongoing support as your business grows.",
  },
];

/** Renders a clean four-stage interactive working process section for the About page. */
export function ProcessCinemaScene() {
  const { reducedMotion } = useCinemaEngine();
  const [stageIndex, setStageIndex] = useState(0);
  const activeStage = PROCESS_MILESTONES[stageIndex];

  return (
    <section
      id="scene-process"
      aria-labelledby="process-cinema-heading"
      className="relative border-t border-white/10 bg-[#0D0815]/50 py-16 text-[#F5F1FA] sm:py-24"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
        <div className="border-b border-white/10 pb-8">
          <p className="text-xs font-medium text-[#A78BFA]">How we work</p>
          <h2
            id="process-cinema-heading"
            className="mt-2 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-[#F5F1FA]"
          >
            A clear path from first conversation to{" "}
            <span className="font-serif font-normal italic text-[#FF9FFC]">
              steady growth.
            </span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          {/* Four-step interactive index */}
          <div className="divide-y divide-white/10 border-y border-white/10 lg:col-span-5">
            {PROCESS_MILESTONES.map((step, index) => {
              const active = index === stageIndex;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setStageIndex(index)}
                  className="flex min-h-[52px] w-full items-center justify-between gap-4 py-4 text-left transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`text-xs font-semibold transition-colors ${
                        active ? "text-[#FF9FFC]" : "text-[#91869F]"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`font-display text-lg font-semibold transition-colors sm:text-xl ${
                        active
                          ? "text-[#F5F1FA]"
                          : "text-[#91869F] hover:text-[#C7BDD5]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      active ? "bg-[#5227FF]" : "bg-white/15"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Active stage detail */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.number}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="space-y-4"
              >
                <span className="block font-display text-4xl font-semibold text-[#5227FF]/60 sm:text-5xl">
                  {activeStage.number}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#F5F1FA] sm:text-3xl">
                  {activeStage.title} — {activeStage.summary}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-[#C7BDD5]">
                  {activeStage.outcome}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
