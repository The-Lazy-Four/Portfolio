"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { HighlighterReveal } from "@/components/motion/KineticTypography";
import { ServiceDemonstration } from "@/components/visuals/ServiceDemonstration";
import { SERVICE_CATEGORIES } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

/** Renders Scene 03 (Services Experience) with a desktop pinned horizontal chapter stage and responsive mobile showcase. */
export function ServicesCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const horizontalTweenRef = useRef<gsap.core.Tween | null>(null);

  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [activeDisciplineIndex, setActiveDisciplineIndex] = useState(0);

  // Configure desktop horizontal pin choreography via gsap.matchMedia and graceful vertical layout on smaller screens.
  useEffect(() => {
    const section = sectionRef.current;
    const trackWrapper = trackWrapperRef.current;
    const track = trackRef.current;

    if (!section || !trackWrapper || !track) {
      return;
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(2),
        onEnterBack: () => setActiveSceneIndex(2),
      });

      if (reducedMotion) {
        return;
      }

      mm.add("(min-width: 1024px)", () => {
        const panelCount = SERVICE_CATEGORIES.length;

        const tween = gsap.to(track, {
          xPercent: (-100 * (panelCount - 1)) / panelCount,
          ease: "none",
          scrollTrigger: {
            trigger: trackWrapper,
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 1600)}`,
            onUpdate: (self) => {
              const nextIdx = Math.min(
                panelCount - 1,
                Math.max(0, Math.round(self.progress * (panelCount - 1)))
              );
              setActiveDisciplineIndex((prev) => (prev === nextIdx ? prev : nextIdx));
            },
          },
        });

        horizontalTweenRef.current = tween;
        return () => {
          horizontalTweenRef.current = null;
        };
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [reducedMotion, setActiveSceneIndex]);

  /** Scrolls desktop pinned timeline smoothly to the chosen service panel, or anchors natively on mobile. */
  function jumpToDiscipline(index: number) {
    setActiveDisciplineIndex(index);
    const tween = horizontalTweenRef.current;
    const st = tween?.scrollTrigger;

    if (st && window.innerWidth >= 1024 && !reducedMotion) {
      const progress = index / (SERVICE_CATEGORIES.length - 1);
      const targetY = st.start + progress * (st.end - st.start);
      scrollToTarget(targetY);
      return;
    }

    const targetEl = document.getElementById(`service-stage-${SERVICE_CATEGORIES[index].id}`);
    if (targetEl) {
      scrollToTarget(targetEl);
    }
  }

  return (
    <section
      id="scene-services"
      ref={sectionRef}
      aria-labelledby="services-cinema-heading"
      className="bg-pine text-paper"
    >
      {/* Desktop pinned stage wrapper (min-h-screen, generous pt-28 headroom below fixed header) */}
      <div
        ref={trackWrapperRef}
        className={`flex flex-col justify-between pt-20 pb-12 ${
          reducedMotion
            ? "lg:pt-24 lg:pb-16"
            : "lg:min-h-screen lg:overflow-hidden lg:pt-28"
        }`}
      >
        {/* Top stage header & instant jump rail */}
        <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 xl:pl-16">
          <div className="flex flex-col justify-between gap-5 border-b border-paper/15 pb-6 lg:flex-row lg:items-end">
            <div>
              <span className="font-mono text-xs tracking-[0.14em] text-amber uppercase">
                [03] · Services Experience
              </span>
              <HighlighterReveal
                as="h2"
                id="services-cinema-heading"
                lines={["Six connected capabilities.", "Interactive proof on every panel."]}
                barClassName="bg-amber"
                className="mt-2 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-paper sm:text-4xl lg:text-5xl"
              />
            </div>

            {/* Chapter jump pills */}
            <div
              role="tablist"
              aria-label="Service discipline stages"
              className="flex flex-wrap gap-1.5"
            >
              {SERVICE_CATEGORIES.map((service, index) => {
                const active = index === activeDisciplineIndex;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => jumpToDiscipline(index)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.06em] uppercase transition-colors ${
                      active
                        ? "border-accent bg-accent text-paper"
                        : "border-paper/20 bg-paper/5 text-paper/75 hover:border-paper/50 hover:text-paper"
                    }`}
                  >
                    <span>{service.number}</span>
                    <span className="hidden sm:inline">{service.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal 6-panel desktop track (collapses cleanly to vertical cards when reducedMotion is enabled or below 1024px) */}
        <div
          ref={trackRef}
          className={
            reducedMotion
              ? "mt-8 flex flex-col gap-10 px-5 sm:px-8 lg:px-12 xl:pl-16"
              : "mt-8 flex flex-col gap-10 px-5 sm:px-8 lg:mt-6 lg:w-[600%] lg:flex-row lg:gap-0 lg:px-0"
          }
        >
          {SERVICE_CATEGORIES.map((service) => (
            <article
              key={service.id}
              id={`service-stage-${service.id}`}
              className={
                reducedMotion
                  ? "scroll-mt-24 w-full"
                  : "scroll-mt-24 w-full lg:w-[16.666667%] lg:px-12 xl:pl-20"
              }
            >
              <div className="mx-auto grid max-w-[84rem] grid-cols-1 items-center gap-7 rounded-2xl border border-paper/15 bg-ink/45 p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-12 lg:gap-10">
                {/* Left editorial specification column */}
                <div className="space-y-4 lg:col-span-5">
                  <div className="flex items-center justify-between gap-4 border-b border-paper/15 pb-3 font-mono text-xs uppercase">
                    <span className="shrink-0 whitespace-nowrap text-amber">
                      ( N&deg; {service.number} )
                    </span>
                    <span className="truncate text-right text-paper/60">
                      {service.shortTitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl leading-tight font-bold tracking-tight text-paper sm:text-3xl">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-paper/80 sm:text-base">
                    {service.summary}
                  </p>

                  <ul className="space-y-2 border-y border-paper/15 py-4 text-xs text-paper/85">
                    {service.deliverables.slice(0, 5).map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <Link
                      href={`/services#${service.id}`}
                      data-cursor="SCOPE"
                      className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-xs font-semibold tracking-[0.04em] text-ink uppercase transition-colors hover:bg-amber"
                    >
                      View Full Deliverables
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="font-mono text-[11px] text-amber underline-offset-4 hover:underline"
                    >
                      Request This &rarr;
                    </Link>
                  </div>
                </div>

                {/* Right live interactive demonstration framed on warm paper for optical sharpness */}
                <div
                  data-cursor="INTERACT"
                  className="rounded-xl border border-rule bg-paper p-5 text-ink shadow-lg sm:p-6 lg:col-span-7"
                >
                  <ServiceDemonstration kind={service.diagramKind} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom horizontal track meter on desktop */}
        <div className="mx-auto mt-6 hidden w-full max-w-[90rem] items-center justify-between px-12 font-mono text-[10px] tracking-[0.12em] text-paper/60 uppercase lg:flex xl:pl-16">
          <span>
            Active Panel: {SERVICE_CATEGORIES[activeDisciplineIndex]?.number} —{" "}
            {SERVICE_CATEGORIES[activeDisciplineIndex]?.title}
          </span>
          <div className="h-1 w-64 overflow-hidden bg-paper/15">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{
                width: `${((activeDisciplineIndex + 1) / SERVICE_CATEGORIES.length) * 100}%`,
              }}
            />
          </div>
          <span>Scroll or Click Pills To Navigate</span>
        </div>
      </div>
    </section>
  );
}
