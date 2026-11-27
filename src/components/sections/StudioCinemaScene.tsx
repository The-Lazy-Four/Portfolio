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

/** Renders a sharp Neo-Brutalist 2x2 partner seat badge highlighting each specialist desk cleanly. */
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
            fill={active ? "#3155F5" : "#F5F0E6"}
            stroke="#151515"
            strokeWidth={2.5}
          />
        );
      })}
    </svg>
  );
}

/** Renders Scene 06 (The Studio) in stark Neo-Brutalist concrete & ivory blocks while preserving all team slots and verification honesty. */
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
      className="border-y-[3px] border-ink bg-concrete py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Studio Manifesto Header */}
        <div className="grid grid-cols-1 gap-10 border-b-[3px] border-ink pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-block border-2 border-ink bg-orange px-3 py-1 font-mono text-xs font-bold tracking-[0.14em] text-ivory uppercase shadow-[3px_3px_0px_#151515]">
              [06] · The Four-Member Studio
            </span>
            <HighlighterReveal
              as="h2"
              id="studio-cinema-heading"
              lines={["Four builders.", "Direct access. Zero bloat."]}
              barClassName="bg-cobalt"
              className="mt-4 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-[#F5F1FA] uppercase sm:text-5xl"
            />
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TRUST_PILLARS.map((pillar) => (
                <div
                  key={pillar.code}
                  className="border-2 border-ink bg-ivory p-3 shadow-[3px_3px_0px_#151515]"
                >
                  <span className="inline-block bg-acid px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#F5F1FA] uppercase">
                    [{pillar.code}]
                  </span>
                  <span className="mt-1.5 block font-display text-xs font-extrabold text-[#F5F1FA]">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 border-t border-ink/15 pt-8 sm:grid-cols-3 lg:col-span-7">
            {ABOUT_VALUES.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[11px] font-bold tracking-[0.14em] text-cobalt uppercase">
                  {item.label}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#C2B9D0]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open 4-column editorial team roster without heavy card borders */}
        <div className="mt-16 border-y border-ink/15 py-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_SLOTS.map((slot, index) => (
              <article
                key={slot.slotNumber}
                className="flex flex-col justify-between"
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-[#C2B9D0] uppercase">
                  <span className="font-bold text-[#F5F1FA]">{slot.slotNumber}</span>
                  <span>{slot.statusNote}</span>
                </div>

                <div className="my-6">
                  <StudioSeatMarker slotIndex={index} />
                </div>

                <div className="border-t border-ink/15 pt-4">
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-[#F5F1FA] uppercase">
                    {slot.placeholderName}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] font-semibold text-cobalt">
                    {slot.rolePlaceholder}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#C2B9D0]">
                    {slot.focusPlaceholder}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Why Web Guru grid + Electric Cobalt Proof Verification Vault */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {WHY_WEB_GURU_POINTS.map((point, index) => (
              <div
                key={point.title}
                className={`border-2 border-ink bg-ivory p-5 shadow-[4px_4px_0px_#151515] ${
                  index === WHY_WEB_GURU_POINTS.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="inline-block bg-acid px-2 py-0.5 font-mono text-[10px] font-bold text-[#F5F1FA] uppercase">
                  0{index + 1} · Value Principle
                </span>
                <h3 className="mt-2 font-display text-base font-extrabold text-[#F5F1FA] uppercase">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#C2B9D0]">
                  {point.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between border-[3px] border-ink bg-ink p-6 text-ivory shadow-[8px_8px_0px_#F0522B] lg:col-span-4">
            <div>
              <span className="inline-block bg-acid px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-[#F5F1FA] uppercase">
                Client Verification Policy
              </span>
              {VERIFIED_TESTIMONIALS.length > 0 ? (
                <p className="mt-4 text-sm leading-relaxed text-ivory/90">
                  {VERIFIED_TESTIMONIALS[0].quote}
                </p>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-ivory/85">
                  We publish verified client feedback strictly with documented
                  permission—never invented ratings or anonymous quotes. This
                  slot activates automatically in{" "}
                  <code className="bg-cobalt px-1.5 py-0.5 font-mono text-xs text-ivory">
                    src/data/testimonials.ts
                  </code>
                  .
                </p>
              )}
            </div>

            <Link
              href="/about"
              data-cursor="STUDIO"
              className="wg-brutal-btn mt-6 inline-flex w-fit items-center gap-2 border-2 border-ivory bg-cobalt px-4 py-2 font-mono text-xs font-bold text-ivory uppercase shadow-[4px_4px_0px_#E9FF45] hover:bg-acid hover:text-[#F5F1FA]"
            >
              Read Full Studio Philosophy
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
