"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { HighlighterReveal } from "@/components/motion/KineticTypography";
import { ProcessStageVisual } from "@/components/visuals/ProcessStageVisual";
import { PROCESS_STAGES } from "@/data/process";

gsap.registerPlugin(ScrollTrigger);

/** Renders Scene 05 (How We Work) using scroll-scrubbed desktop pinning and interactive 4-stage CAD visuals. */
export function ProcessCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const stageTriggerRef = useRef<ScrollTrigger | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [stageIndex, setStageIndex] = useState(0);

  const activeStage = PROCESS_STAGES[stageIndex] || PROCESS_STAGES[0];

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!section || !pinWrapper) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(4),
        onEnterBack: () => setActiveSceneIndex(4),
      });

      if (reducedMotion) return;

      mm.add("(min-width: 1024px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: pinWrapper,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          start: "top top",
          end: "+=1400",
          onUpdate: (self) => {
            const idx = Math.min(
              PROCESS_STAGES.length - 1,
              Math.max(0, Math.floor(self.progress * PROCESS_STAGES.length - 0.01))
            );
            setStageIndex((prev) => (prev === idx ? prev : idx));
          },
        });
        stageTriggerRef.current = trigger;
        return () => {
          stageTriggerRef.current = null;
        };
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [reducedMotion, setActiveSceneIndex]);

  /** Navigates directly to a specific process stage cleanly whether desktop-pinned or mobile. */
  function selectStage(index: number) {
    setStageIndex(index);
    const st = stageTriggerRef.current;
    if (st && window.innerWidth >= 1024 && !reducedMotion) {
      const targetProgress = (index + 0.12) / PROCESS_STAGES.length;
      const y = st.start + targetProgress * (st.end - st.start);
      scrollToTarget(y);
    }
  }

  return (
    <section
      id="scene-process"
      ref={sectionRef}
      aria-labelledby="process-cinema-heading"
      className="bg-ink text-paper xl:pl-11"
    >
      <div
        ref={pinWrapperRef}
        className="mx-auto flex max-w-[90rem] flex-col justify-center px-5 py-20 sm:px-8 sm:py-24 lg:min-h-screen lg:px-12 lg:pt-24 lg:pb-16"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-paper/15 pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono text-xs tracking-[0.14em] text-amber uppercase">
              [05] · How We Work
            </span>
            <HighlighterReveal
              as="h2"
              id="process-cinema-heading"
              lines={["Structured progression.", "From audit to continuous care."]}
              barClassName="bg-accent"
              className="mt-2 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-paper sm:text-5xl"
            />
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-paper/75">
            Scroll through or click any milestone below to trace how an idea moves
            from first discovery call to active daily support.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left milestone index column */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {PROCESS_STAGES.map((stage, index) => {
              const active = index === stageIndex;
              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => selectStage(index)}
                  aria-pressed={active}
                  className={`group flex items-start justify-between border px-5 py-4 text-left transition-all ${
                    active
                      ? "border-accent bg-pine text-paper shadow-md"
                      : "border-paper/15 bg-paper/[0.03] text-paper/70 hover:border-paper/35 hover:text-paper"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs ${
                          active ? "text-amber" : "text-accent"
                        }`}
                      >
                        [{stage.number}]
                      </span>
                      <span className="font-display text-xl font-bold tracking-tight">
                        {stage.title}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-paper/65">
                      {stage.focusLabel}
                    </p>
                  </div>

                  <span
                    className={`mt-1.5 h-2 w-2 rounded-full transition-colors ${
                      active ? "bg-accent" : "bg-paper/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right active architectural specification & technical blueprint stage */}
          <div className="rounded-2xl border border-paper/15 bg-pine p-7 sm:p-9 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-paper/15 pb-4">
              <span className="font-mono text-xs tracking-[0.12em] text-amber uppercase">
                Stage {activeStage.number} — {activeStage.focusLabel}
              </span>
              <span className="font-mono text-[10px] text-paper/60 uppercase">
                Step {stageIndex + 1} of {PROCESS_STAGES.length}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 items-center gap-7 sm:grid-cols-12">
              <div className="space-y-4 sm:col-span-7">
                <h3 className="font-display text-3xl font-bold tracking-tight text-paper">
                  {activeStage.title}
                </h3>
                <p className="text-sm leading-relaxed text-paper/85 sm:text-base">
                  {activeStage.summary}
                </p>

                <ul className="space-y-2.5 border-t border-paper/15 pt-4 text-xs text-paper/85">
                  {activeStage.clientReceives.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-5">
                <ProcessStageVisual stageIndex={stageIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
