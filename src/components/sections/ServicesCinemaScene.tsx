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

interface ServicePanelTheme {
  cardClass: string;
  numberBadgeClass: string;
  titleClass: string;
  summaryClass: string;
  deliverableTextClass: string;
  bulletClass: string;
  buttonClass: string;
  linkClass: string;
  swapMediaFirst: boolean;
}

// Per-service distinct Neo-Brutalist color blocking so all 6 capabilities read like bespoke editorial posters
const SERVICE_PANEL_THEMES: ServicePanelTheme[] = [
  {
    cardClass:
      "border-[3px] border-ink bg-cobalt text-ivory shadow-[8px_8px_0px_#E9FF45]",
    numberBadgeClass: "bg-acid text-ink border-2 border-ink",
    titleClass: "text-ivory",
    summaryClass: "text-ivory/90",
    deliverableTextClass: "text-ivory",
    bulletClass: "text-acid",
    buttonClass:
      "border-2 border-ink bg-acid text-ink shadow-[4px_4px_0px_#151515] hover:bg-orange hover:text-ivory",
    linkClass: "text-acid hover:text-ivory",
    swapMediaFirst: false,
  },
  {
    cardClass:
      "border-[3px] border-ink bg-ivory text-ink shadow-[8px_8px_0px_#F0522B]",
    numberBadgeClass: "bg-orange text-ivory border-2 border-ink",
    titleClass: "text-ink",
    summaryClass: "text-slate",
    deliverableTextClass: "text-ink",
    bulletClass: "text-cobalt",
    buttonClass:
      "border-2 border-ink bg-ink text-ivory shadow-[4px_4px_0px_#3155F5] hover:bg-cobalt",
    linkClass: "text-cobalt hover:text-orange",
    swapMediaFirst: true,
  },
  {
    cardClass:
      "border-[3px] border-ivory bg-ink text-ivory shadow-[8px_8px_0px_#3155F5]",
    numberBadgeClass: "bg-cobalt text-ivory border-2 border-ivory",
    titleClass: "text-ivory",
    summaryClass: "text-ivory/85",
    deliverableTextClass: "text-ivory/90",
    bulletClass: "text-acid",
    buttonClass:
      "border-2 border-ink bg-acid text-ink shadow-[4px_4px_0px_#3155F5] hover:bg-orange hover:text-ivory",
    linkClass: "text-acid hover:text-orange",
    swapMediaFirst: false,
  },
  {
    cardClass:
      "border-[3px] border-ink bg-acid text-ink shadow-[8px_8px_0px_#151515]",
    numberBadgeClass: "bg-ink text-acid border-2 border-ink",
    titleClass: "text-ink",
    summaryClass: "text-ink/85",
    deliverableTextClass: "text-ink font-medium",
    bulletClass: "text-orange",
    buttonClass:
      "border-2 border-ink bg-orange text-ivory shadow-[4px_4px_0px_#151515] hover:bg-cobalt",
    linkClass: "text-ink hover:text-cobalt",
    swapMediaFirst: true,
  },
  {
    cardClass:
      "border-[3px] border-ink bg-concrete text-ink shadow-[8px_8px_0px_#E9FF45]",
    numberBadgeClass: "bg-ink text-ivory border-2 border-ink",
    titleClass: "text-ink",
    summaryClass: "text-slate",
    deliverableTextClass: "text-ink",
    bulletClass: "text-orange",
    buttonClass:
      "border-2 border-ink bg-cobalt text-ivory shadow-[4px_4px_0px_#151515] hover:bg-orange",
    linkClass: "text-cobalt hover:text-ink",
    swapMediaFirst: false,
  },
  {
    cardClass:
      "border-[3px] border-ink bg-orange text-ivory shadow-[8px_8px_0px_#151515]",
    numberBadgeClass: "bg-ink text-acid border-2 border-ink",
    titleClass: "text-ivory",
    summaryClass: "text-ivory/95",
    deliverableTextClass: "text-ivory",
    bulletClass: "text-acid",
    buttonClass:
      "border-2 border-ink bg-ivory text-ink shadow-[4px_4px_0px_#151515] hover:bg-acid",
    linkClass: "text-acid hover:text-ivory",
    swapMediaFirst: true,
  },
];

/** Renders Scene 03 (Services Experience) with 6 color-blocked Neo-Brutalist panels while preserving GSAP matchMedia horizontal pinning and reduced-motion layout. */
export function ServicesCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const horizontalTweenRef = useRef<gsap.core.Tween | null>(null);

  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [activeDisciplineIndex, setActiveDisciplineIndex] = useState(0);

  // Preserve exact GSAP desktop horizontal pin choreography and mobile stack behavior.
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
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (panelCount - 1),
              duration: { min: 0.2, max: 0.4 },
              delay: 0.05,
              ease: "power2.out",
            },
            onUpdate: (self) => {
              const nextIdx = Math.min(
                panelCount - 1,
                Math.max(0, Math.round(self.progress * (panelCount - 1)))
              );
              setActiveDisciplineIndex((prev) =>
                prev === nextIdx ? prev : nextIdx
              );
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

  /** Scrolls desktop pinned timeline smoothly to the selected service panel, or anchors natively on mobile/reduced motion. */
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

    const targetEl = document.getElementById(
      `service-stage-${SERVICE_CATEGORIES[index].id}`
    );
    if (targetEl) {
      scrollToTarget(targetEl);
    }
  }

  return (
    <section
      id="scene-services"
      ref={sectionRef}
      aria-labelledby="services-cinema-heading"
      className="wg-grid-pattern-dark bg-ink text-ivory"
    >
      <div
        ref={trackWrapperRef}
        className={`flex flex-col justify-between pt-20 pb-12 ${
          reducedMotion
            ? "lg:pt-24 lg:pb-16"
            : "lg:h-[100dvh] lg:max-h-[100dvh] lg:overflow-hidden lg:pt-[clamp(4.75rem,8dvh,5.5rem)] lg:pb-[clamp(0.65rem,1.6dvh,1.25rem)]"
        }`}
      >
        {/* Top stage header & brutalist chapter jump bar */}
        <div className="mx-auto w-full max-w-[90rem] shrink-0 px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-3 border-b-2 border-ivory/25 pb-4 lg:flex-row lg:items-end lg:gap-4 lg:pb-[clamp(0.45rem,1.2dvh,1rem)]">
            <div className="min-w-0">
              <span className="inline-block border-2 border-ivory bg-orange px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] text-ivory uppercase shadow-[3px_3px_0px_#E9FF45]">
                [03] · Services Experience
              </span>
              <HighlighterReveal
                as="h2"
                id="services-cinema-heading"
                lines={["Six connected capabilities.", "Interactive proof on every panel."]}
                barClassName="bg-acid"
                className="mt-2 font-display text-[clamp(1.35rem,2.1vw,2.25rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-ivory uppercase"
              />
            </div>

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
                    className={`inline-flex items-center gap-1.5 border-2 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.06em] uppercase transition-colors ${
                      active
                        ? "border-ink bg-acid text-ink shadow-[3px_3px_0px_#3155F5]"
                        : "border-ivory/35 bg-ink text-ivory/80 hover:border-acid hover:text-acid"
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

        {/* Preserved 600% horizontal track on desktop / vertical stack on mobile or reduced-motion */}
        <div
          ref={trackRef}
          className={
            reducedMotion
              ? "mt-8 flex flex-col gap-12 px-5 sm:px-8 lg:px-12"
              : "mt-6 flex flex-col gap-10 px-5 sm:px-8 lg:mt-0 lg:min-h-0 lg:flex-1 lg:w-[600%] lg:flex-row lg:items-center lg:gap-0 lg:px-0"
          }
        >
          {SERVICE_CATEGORIES.map((service, index) => {
            const theme =
              SERVICE_PANEL_THEMES[index % SERVICE_PANEL_THEMES.length];

            return (
              <article
                key={service.id}
                id={`service-stage-${service.id}`}
                className={
                  reducedMotion
                    ? "scroll-mt-24 w-full"
                    : "scroll-mt-24 w-full lg:w-[16.666667%] lg:px-8 xl:px-12"
                }
              >
                <div
                  className={`mx-auto grid w-full max-w-[84rem] grid-cols-1 items-center gap-5 p-5 sm:p-6 lg:grid-cols-12 lg:gap-[clamp(1rem,1.8vw,2.25rem)] lg:p-[clamp(0.9rem,1.8dvh,1.75rem)] ${theme.cardClass}`}
                >
                  {/* Editorial specification column (alternates order asymmetrically across panels) */}
                  <div
                    className={`space-y-[clamp(0.35rem,0.9dvh,0.85rem)] lg:col-span-5 ${
                      theme.swapMediaFirst ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 border-b-2 border-current/25 pb-2 font-mono text-xs font-bold uppercase">
                      <span
                        className={`shrink-0 px-2.5 py-0.5 whitespace-nowrap ${theme.numberBadgeClass}`}
                      >
                        ( N&deg; {service.number} )
                      </span>
                      <span className="truncate text-right opacity-85">
                        {service.shortTitle}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="font-display text-[clamp(2rem,3.4dvh,3.25rem)] leading-none font-extrabold opacity-25"
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`font-display text-[clamp(1.15rem,1.75vw,1.75rem)] leading-tight font-extrabold tracking-tight uppercase ${theme.titleClass}`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <p
                      className={`text-[clamp(0.78rem,1.25dvh,0.9375rem)] leading-snug ${theme.summaryClass}`}
                    >
                      {service.summary}
                    </p>

                    <ul className="space-y-[clamp(0.18rem,0.55dvh,0.45rem)] border-y-2 border-current/20 py-[clamp(0.35rem,0.9dvh,0.75rem)] text-[clamp(0.72rem,1.1dvh,0.8rem)]">
                      {service.deliverables.slice(0, 5).map((deliverable) => (
                        <li
                          key={deliverable}
                          className={`flex items-start gap-2 ${theme.deliverableTextClass}`}
                        >
                          <Check
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${theme.bulletClass}`}
                            aria-hidden="true"
                          />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-4 pt-0.5">
                      <Link
                        href={`/services#${service.id}`}
                        data-cursor="SCOPE"
                        className={`wg-brutal-btn inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold tracking-[0.04em] uppercase transition-colors ${theme.buttonClass}`}
                      >
                        View Full Deliverables
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>

                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className={`font-mono text-xs font-bold underline decoration-2 underline-offset-4 ${theme.linkClass}`}
                      >
                        Request This &rarr;
                      </Link>
                    </div>
                  </div>

                  {/* Interactive Service Demonstration framed cleanly on crisp Warm Ivory */}
                  <div
                    data-cursor="INTERACT"
                    className={`border-[3px] border-ink bg-ivory p-3.5 text-ink shadow-[6px_6px_0px_#151515] lg:col-span-7 lg:p-[clamp(0.65rem,1.4dvh,1.25rem)] ${
                      theme.swapMediaFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <ServiceDemonstration kind={service.diagramKind} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom horizontal track meter on desktop */}
        <div className="mx-auto mt-[clamp(0.35rem,0.9dvh,0.85rem)] hidden w-full max-w-[90rem] shrink-0 items-center justify-between px-12 font-mono text-[10px] font-bold tracking-[0.12em] text-ivory/80 uppercase lg:flex">
          <span className="bg-cobalt px-2.5 py-1 text-ivory">
            Active Panel: {SERVICE_CATEGORIES[activeDisciplineIndex]?.number} —{" "}
            {SERVICE_CATEGORIES[activeDisciplineIndex]?.title}
          </span>
          <div className="h-2.5 w-64 border-2 border-ivory bg-ink p-0.5">
            <div
              className="h-full bg-acid transition-all duration-300"
              style={{
                width: `${((activeDisciplineIndex + 1) / SERVICE_CATEGORIES.length) * 100}%`,
              }}
            />
          </div>
          <span>+ Scroll or Click Pills To Navigate +</span>
        </div>
      </div>
    </section>
  );
}
