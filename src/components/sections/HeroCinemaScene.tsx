"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/** Renders the mobile-first Hero section with clear agency positioning and primary actions over global LiquidEther. */
export function HeroCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();

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
          y: 20,
          opacity: 0,
          duration: 0.65,
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
      className="relative flex min-h-[86dvh] w-full flex-col justify-end overflow-hidden bg-transparent text-[#F5F1FA] sm:min-h-[96dvh]"
    >
      {/* Subtle readability veil protecting headline contrast over LiquidEther */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#100B18]/35 via-[#100B18]/15 to-[#100B18]/75"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-col justify-end px-5 pt-28 pb-12 sm:px-10 sm:pt-36 sm:pb-16 lg:px-14 lg:pb-20">
        <div className="max-w-4xl">
          <h1
            id="hero-cinema-heading"
            data-hero-stagger
            className="font-display text-[clamp(2.25rem,7.2vw,5.5rem)] leading-[1.01] font-bold tracking-[-0.03em] text-[#F5F1FA]"
          >
            Your business deserves a{" "}
            <span className="font-serif font-normal italic text-[#FF9FFC]">
              better
            </span>{" "}
            digital presence.
          </h1>

          <div
            data-hero-stagger
            className="mt-7 flex flex-col justify-between gap-7 border-t border-white/15 pt-6 sm:mt-9 sm:pt-7 md:flex-row md:items-end"
          >
            <p className="max-w-lg text-base leading-relaxed text-[#D8CFEA] sm:text-lg">
              We build websites, improve your visibility, and manage the digital
              tools that help your business grow.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <MagneticButton>
                <Link
                  href="/contact"
                  data-cursor="TALK"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#5227FF] px-7 py-3 text-sm font-medium text-[#F5F1FA] transition-colors hover:bg-[#A78BFA] hover:text-[#100B18]"
                >
                  Let&apos;s Talk
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </MagneticButton>

              <button
                type="button"
                onClick={() => scrollToTarget("#scene-work")}
                className="wg-link-underline inline-flex min-h-[48px] items-center gap-2 px-1 text-sm font-medium text-[#E5DDF2] transition-colors hover:text-[#FF9FFC]"
              >
                Explore Our Work
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
