"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/** Renders Scene 01 (The Opening) as a full-viewport cinematic blue topographic environment with editorial typography. */
export function HeroCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();

  // Register active scene tracking and entrance stagger verbatim in GSAP context.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(0),
        onEnterBack: () => setActiveSceneIndex(0),
      });

      if (!reducedMotion) {
        gsap.from("[data-hero-stagger]", {
          y: 26,
          opacity: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, setActiveSceneIndex]);

  return (
    <section
      id="scene-opening"
      ref={sectionRef}
      aria-labelledby="hero-cinema-heading"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-transparent text-ivory"
    >
      {/* Subtle atmospheric vignette for editorial contrast over global LiquidEther */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05091B]/25 via-transparent to-[#05091B]/65"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-col justify-end px-6 pt-28 pb-14 sm:px-10 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="max-w-5xl">
          <h1
            id="hero-cinema-heading"
            data-hero-stagger
            className="font-display text-[clamp(2.35rem,6.4vw,5.75rem)] leading-[0.98] font-bold tracking-[-0.035em] text-[#F5F1FA]"
          >
            Everything your business needs to grow online.{" "}
            <span className="font-serif font-normal italic text-[#FF9FFC]">
              One partner.
            </span>
          </h1>

          <div
            data-hero-stagger
            className="mt-8 flex flex-col justify-between gap-8 border-t border-white/15 pt-7 md:flex-row md:items-end"
          >
            <p className="max-w-xl text-base leading-relaxed text-[#C2B9D0] sm:text-lg">
              From getting found on Google to fast websites, custom apps, social
              media, and ongoing support—we handle your entire online presence
              under one roof.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton>
                <Link
                  href="/contact"
                  data-cursor="START"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#5227FF] px-7 py-3.5 font-sans text-xs font-semibold tracking-[0.06em] text-[#F5F1FA] uppercase transition-colors hover:bg-[#FF9FFC] hover:text-[#100B18]"
                >
                  Let&apos;s Grow Your Business
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </MagneticButton>

              <button
                type="button"
                onClick={() => scrollToTarget("#scene-services")}
                className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.06em] text-[#F5F1FA]/85 uppercase underline decoration-[#B497CF]/50 decoration-1 underline-offset-8 transition-colors hover:text-[#FF9FFC]"
              >
                Explore Services
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
