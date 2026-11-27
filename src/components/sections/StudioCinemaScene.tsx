"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { HighlighterReveal } from "@/components/motion/KineticTypography";
import { ABOUT_VALUES, TEAM_SLOTS } from "@/data/team";
import { VERIFIED_TESTIMONIALS } from "@/data/testimonials";
import { TRUST_PILLARS, WHY_WEB_GURU_POINTS } from "@/data/whyWebGuru";

gsap.registerPlugin(ScrollTrigger);

/** Renders a 2x2 geometric seat marker identifying each partner slot inside Web Guru's four-member team. */
function StudioSeatMarker({ slotIndex }: { slotIndex: number }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-14 w-14" aria-hidden="true">
      {[0, 1, 2, 3].map((idx) => {
        const x = idx % 2 === 0 ? 4 : 34;
        const y = idx < 2 ? 4 : 34;
        const active = idx === slotIndex;
        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={26}
            height={26}
            rx={4}
            fill={active ? "#D94E28" : "#F6F3EC"}
            stroke="#161A18"
            strokeOpacity={0.22}
          />
        );
      })}
    </svg>
  );
}

/** Renders Scene 06 (The Studio) featuring Archivio Garonzi vertical ruled member bays, core principles, and transparent proof status. */
export function StudioCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(5),
        onEnterBack: () => setActiveSceneIndex(5),
      });
    }, section);

    return () => ctx.revert();
  }, [setActiveSceneIndex]);

  return (
    <section
      id="scene-studio"
      ref={sectionRef}
      aria-labelledby="studio-cinema-heading"
      className="border-y border-rule bg-linen py-20 sm:py-28 xl:pl-11"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Studio Manifesto Split */}
        <div className="grid grid-cols-1 gap-10 border-b border-rule pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
              [06] · The Four-Member Studio
            </span>
            <HighlighterReveal
              as="h2"
              id="studio-cinema-heading"
              lines={["Four builders.", "Direct access. Zero bloat."]}
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
            />
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TRUST_PILLARS.map((pillar) => (
                <div
                  key={pillar.code}
                  className="border border-rule bg-paper px-3.5 py-2.5"
                >
                  <span className="block font-mono text-[10px] text-accent uppercase">
                    [{pillar.code}]
                  </span>
                  <span className="mt-0.5 block font-display text-xs font-bold text-ink">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
            {ABOUT_VALUES.map((item) => (
              <div
                key={item.label}
                className="border-t border-rule pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5"
              >
                <p className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">
                  {item.label}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Archivio Garonzi-inspired 4-Column Vertical Ruled Studio Desk Strip */}
        <div className="mt-12 overflow-hidden border border-ink/20 bg-paper">
          <div className="flex">
            {/* Far-left vertical accent spine (Archivio Garonzi rail detail) */}
            <div
              aria-hidden="true"
              className="hidden w-8 shrink-0 items-center justify-center bg-accent text-paper sm:flex"
            >
              <span className="-rotate-90 whitespace-nowrap font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                WG STUDIO 01–04
              </span>
            </div>

            <div className="grid flex-1 grid-cols-1 divide-y divide-rule sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
              {TEAM_SLOTS.map((slot, index) => (
                <article
                  key={slot.slotNumber}
                  className="flex min-h-[260px] flex-col justify-between p-6 transition-colors hover:bg-linen/70"
                >
                  <div className="flex items-center justify-between font-mono text-xs uppercase">
                    <span className="text-ink">( N&deg; {slot.slotNumber} )</span>
                    <span className="rounded-full border border-rule bg-linen px-2 py-0.5 text-[9px] text-slate">
                      {slot.statusNote}
                    </span>
                  </div>

                  <div className="my-6">
                    <StudioSeatMarker slotIndex={index} />
                  </div>

                  <div className="border-t border-rule/80 pt-4">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                      {slot.placeholderName}
                    </h3>
                    <p className="mt-0.5 font-mono text-[11px] text-accent">
                      {slot.rolePlaceholder}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate">
                      {slot.focusPlaceholder}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Why Web Guru 4 differentiators + Honest Client Review slot */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {WHY_WEB_GURU_POINTS.map((point, index) => (
              <div
                key={point.title}
                className={`border border-rule bg-paper p-5 ${
                  index === WHY_WEB_GURU_POINTS.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="font-mono text-[11px] text-accent uppercase">
                  0{index + 1} · Value Principle
                </span>
                <h3 className="mt-1.5 font-display text-base font-bold text-ink">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between border border-rule bg-ink p-6 text-paper lg:col-span-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.12em] text-amber uppercase">
                Client Verification Policy
              </span>
              {VERIFIED_TESTIMONIALS.length > 0 ? (
                <p className="mt-3 text-sm leading-relaxed text-paper/85">
                  {VERIFIED_TESTIMONIALS[0].quote}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-paper/80">
                  We publish verified client feedback strictly with documented
                  permission—never invented ratings or anonymous quotes. This
                  slot activates automatically in{" "}
                  <code className="font-mono text-xs text-amber">
                    src/data/testimonials.ts
                  </code>
                  .
                </p>
              )}
            </div>

            <Link
              href="/about"
              data-cursor="STUDIO"
              className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-xs text-amber underline-offset-4 hover:underline"
            >
              Read Full Studio Philosophy
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
