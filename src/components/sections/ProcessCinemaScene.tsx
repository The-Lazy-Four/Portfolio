"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { HighlighterReveal } from "@/components/motion/KineticTypography";
import { ProcessStageVisual } from "@/components/visuals/ProcessStageVisual";
import { PROCESS_STAGES } from "@/data/process";

gsap.registerPlugin(ScrollTrigger);

/** Renders Scene 05 (How We Work) across Electric Cobalt color blocking while preserving pinned ScrollTrigger step progression. */
export function ProcessCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const stageTriggerRef = useRef<ScrollTrigger | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [stageIndex, setStageIndex] = useState(0);

  const activeStage = PROCESS_STAGES[stageIndex] || PROCESS_STAGES[0];

  // Preserve exact GSAP ScrollTrigger pinning and 4-stage progress mapping.
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
              Math.max(
                0,
                Math.floor(self.progress * PROCESS_STAGES.length - 0.01)
              )
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

  /** Navigates cleanly to the selected stage inside the pinned scroll range or inline stack. */
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
      className="bg-cobalt text-ivory"
    >
      <div
        ref={pinWrapperRef}
        className="mx-auto flex max-w-[90rem] flex-col justify-center px-5 py-20 sm:px-8 sm:py-24 lg:min-h-screen lg:px-12 lg:pt-28 lg:pb-16"
      >
        <div className="flex flex-col justify-between gap-6 border-b-[3px] border-ivory pb-8 lg:flex-row lg:items-end">
          <div>
            <span className="inline-block border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold tracking-[0.14em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
              [05] · How We Work
            </span>
            <HighlighterReveal
              as="h2"
              id="process-cinema-heading"
              lines={["Structured progression.", "From audit to continuous care."]}
              barClassName="bg-ink"
              className="mt-3 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ivory uppercase sm:text-5xl"
            />
          </div>

          <p className="max-w-sm border-2 border-ink bg-ivory p-4 text-sm leading-relaxed text-ink shadow-[4px_4px_0px_#151515]">
            Scroll through or click any milestone below to trace how a project
            moves from first discovery audit to long-term support.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left brutalist milestone buttons */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {PROCESS_STAGES.map((stage, index) => {
              const active = index === stageIndex;
              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() => selectStage(index)}
                  aria-pressed={active}
                  className={`group flex items-start justify-between border-2 px-5 py-4 text-left transition-all ${
                    active
                      ? "border-ink bg-acid text-ink shadow-[6px_6px_0px_#151515]"
                      : "border-ivory/50 bg-ink/85 text-ivory hover:border-acid hover:bg-ink"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`border px-2 py-0.5 font-mono text-xs font-bold ${
                          active
                            ? "border-ink bg-ink text-acid"
                            : "border-ivory/30 bg-cobalt text-ivory"
                        }`}
                      >
                        [{stage.number}]
                      </span>
                      <span className="font-display text-xl font-extrabold tracking-tight uppercase">
                        {stage.title}
                      </span>
                    </div>
                    <p
                      className={`mt-1.5 font-mono text-[11px] uppercase ${
                        active ? "text-ink/80" : "text-ivory/65"
                      }`}
                    >
                      {stage.focusLabel}
                    </p>
                  </div>

                  <span
                    className={`mt-2 h-3 w-3 border border-ink ${
                      active ? "bg-orange" : "bg-ivory/25"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right active architectural blueprint panel */}
          <div className="border-[3px] border-ink bg-ink p-7 text-ivory shadow-[8px_8px_0px_#E9FF45] sm:p-9 lg:col-span-7">
            <div className="flex items-center justify-between border-b-2 border-ivory/25 pb-4">
              <span className="bg-orange px-2.5 py-1 font-mono text-xs font-bold tracking-[0.12em] text-ivory uppercase">
                Stage {activeStage.number} — {activeStage.focusLabel}
              </span>
              <span className="font-mono text-xs font-bold text-acid uppercase">
                Step {stageIndex + 1} of {PROCESS_STAGES.length}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 items-center gap-7 sm:grid-cols-12">
              <div className="space-y-4 sm:col-span-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-extrabold text-acid/45">
                    {activeStage.number}
                  </span>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight text-ivory uppercase">
                    {activeStage.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-ivory/90 sm:text-base">
                  {activeStage.summary}
                </p>

                <ul className="space-y-2.5 border-t-2 border-ivory/20 pt-4 text-xs text-ivory/90">
                  {activeStage.clientReceives.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-1 h-2.5 w-2.5 shrink-0 border border-ivory bg-acid"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-2 border-ivory bg-cobalt/40 p-2 sm:col-span-5">
                <ProcessStageVisual stageIndex={stageIndex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
