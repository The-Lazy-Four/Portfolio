"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { WebGLTopographicStage } from "@/components/visuals/WebGLTopographicStage";

gsap.registerPlugin(ScrollTrigger);

interface HeroChapter {
  number: string;
  title: string;
  headline: string;
  summary: string;
  servicesLabel: string;
  href: string;
}

const HERO_CHAPTERS: HeroChapter[] = [
  {
    number: "01",
    title: "Local Discovery",
    headline: "Show up clearly when local customers search near you.",
    summary:
      "Google Business Profile setup, Maps visibility improvements, category accuracy, and review workflows.",
    servicesLabel: "GBP & Local SEO",
    href: "/services#google-business-local-seo",
  },
  {
    number: "02",
    title: "Web & Storefronts",
    headline: "Custom websites built for credibility, speed, and action.",
    summary:
      "Responsive business websites, landing pages, portfolios, and clean e-commerce without template bloat.",
    servicesLabel: "Web Design & Dev",
    href: "/services#website-design-development",
  },
  {
    number: "03",
    title: "Apps & Reviews",
    headline: "Connect digital software with real-world customer touchpoints.",
    summary:
      "Tailored workflow apps paired with tabletop NFC & QR Google review tools and consistent social media.",
    servicesLabel: "Apps · Social · NFC",
    href: "/services#application-development-management",
  },
  {
    number: "04",
    title: "Ongoing Care",
    headline: "One four-member engineering desk supporting everything live.",
    summary:
      "Dependable hosting, domains, business email setup, upgrades, and human technical support.",
    servicesLabel: "Complete Support",
    href: "/services#complete-technical-support",
  },
];

/** Renders Scene 01 (The Opening) combining a Lusion framed WebGL viewport, calibration reticles, kinetic display type, and a Delta Cafes chapter scrubber. */
export function HeroCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [chapterIndex, setChapterIndex] = useState(0);

  const activeChapter = HERO_CHAPTERS[chapterIndex];

  // Register active scene tracking and entrance motion cleanly inside GSAP context.
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
      className="bg-paper pt-3 pb-10 sm:px-5 sm:pt-5 lg:px-10 lg:pb-14 xl:pl-16"
    >
      <div className="mx-auto max-w-[90rem]">
        {/* Top Lusion calibration rail */}
        <div className="mb-3 flex items-center justify-between gap-2 px-3 font-mono text-[10px] tracking-[0.12em] text-slate uppercase sm:px-2">
          <span className="whitespace-nowrap">+ &nbsp; WG / 01 — Studio Opening</span>
          <span className="hidden lg:inline">+</span>
          <span className="hidden truncate md:inline">
            One Partner · Six Disciplines · Zero Fragmentation
          </span>
          <span className="hidden lg:inline">+</span>
          <span className="whitespace-nowrap">4-Member Studio &nbsp; +</span>
        </div>

        {/* Rounded framed WebGL cinema viewport (Lusion + Noomo fusion) */}
        <div
          data-cursor="EXPLORE"
          className="relative overflow-hidden rounded-[22px] border border-ink/15 bg-ink text-paper shadow-xl sm:rounded-[28px]"
        >
          {/* Live interactive Three.js topographic contour backdrop */}
          <WebGLTopographicStage className="absolute inset-0 h-full w-full" />

          {/* Soft vignette for guaranteed typographic contrast */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/35 to-ink/85"
          />

          {/* Main hero stage layout */}
          <div className="relative z-10 flex min-h-[78vh] flex-col justify-between px-6 py-8 sm:px-10 sm:py-11 lg:px-14 lg:py-12">
            {/* Upper badge row with playful rotated studio stamps (Two 26 inspired) */}
            <div
              data-hero-stagger
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/10 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-paper uppercase backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Web Guru Studio
                </span>
                <span className="inline-block -rotate-2 rounded-full bg-amber px-3 py-1 font-mono text-[10px] font-medium tracking-[0.08em] text-ink uppercase">
                  Direct 4-Member Desk
                </span>
              </div>

              <button
                type="button"
                onClick={() => scrollToTarget("#scene-ecosystem")}
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/10 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-paper/85 uppercase transition-colors hover:border-amber hover:text-amber"
              >
                Scroll Down
                <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Center monumental headline + clear agency pitch */}
            <div className="my-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h1
                  id="hero-cinema-heading"
                  data-hero-stagger
                  className="font-display text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.96] font-bold tracking-[-0.04em] text-paper"
                >
                  Your business deserves a{" "}
                  <span className="relative inline-block font-serif font-normal italic text-amber">
                    cohesive
                  </span>{" "}
                  digital engine.
                </h1>

                <p
                  data-hero-stagger
                  className="mt-6 max-w-2xl text-base leading-relaxed text-paper/80 sm:text-lg"
                >
                  From Google visibility and fast custom websites to workflow
                  applications, social media craft, counter NFC &amp; QR review
                  tools, and dependable support—Web Guru builds and manages your
                  entire online presence under one roof.
                </p>

                <div
                  data-hero-stagger
                  className="mt-7 flex flex-wrap items-center gap-3.5"
                >
                  <MagneticButton>
                    <Link
                      href="/contact"
                      data-cursor="START"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent-hover"
                    >
                      Let&apos;s Grow Your Business
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={() => scrollToTarget("#scene-services")}
                    className="inline-flex items-center gap-2 rounded-full border border-paper/30 bg-paper/10 px-6 py-3.5 text-sm font-medium text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/20"
                  >
                    Explore 6 Services
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Active chapter readout spotlight (reconstructed without boxy gray bento clutter) */}
              <div
                data-hero-stagger
                className="border-l border-paper/25 pl-5 lg:col-span-4"
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-amber uppercase">
                  Active Focus · [{activeChapter.number} / {activeChapter.servicesLabel}]
                </span>
                <p className="mt-2 font-display text-xl leading-snug font-bold text-paper">
                  {activeChapter.headline}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-paper/75">
                  {activeChapter.summary}
                </p>
                <Link
                  href={activeChapter.href}
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] text-amber uppercase hover:text-paper"
                >
                  Inspect Scope
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Bottom Delta Cafes-style interactive 4-pillar chapter scrubber */}
            <div
              data-hero-stagger
              role="tablist"
              aria-label="Core studio focus chapters"
              className="grid grid-cols-2 gap-2.5 border-t border-paper/15 pt-5 lg:grid-cols-4"
            >
              {HERO_CHAPTERS.map((chapter, index) => {
                const selected = index === chapterIndex;
                return (
                  <button
                    key={chapter.number}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setChapterIndex(index)}
                    className={`group relative rounded-lg px-3.5 py-3 text-left transition-colors ${
                      selected
                        ? "bg-paper/14 text-paper"
                        : "bg-paper/5 text-paper/65 hover:bg-paper/10 hover:text-paper"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                      <span className={selected ? "text-amber" : "text-paper/50"}>
                        {chapter.number}
                      </span>
                      <span className="truncate opacity-75">
                        {chapter.servicesLabel}
                      </span>
                    </div>
                    <p className="mt-1 font-display text-sm font-semibold tracking-tight">
                      {chapter.title}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`mt-2.5 block h-[2px] w-full transition-all duration-300 ${
                        selected ? "bg-accent" : "bg-paper/15"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Lusion calibration rail */}
        <div className="mt-3 flex items-center justify-between gap-2 px-3 font-mono text-[10px] tracking-[0.12em] text-slate uppercase sm:px-2">
          <span className="whitespace-nowrap">+ &nbsp; Explore Ecosystem</span>
          <span className="hidden lg:inline">+</span>
          <span className="hidden truncate md:inline">
            Local SEO · Web · Apps · Social · NFC/QR · Support
          </span>
          <span className="hidden lg:inline">+</span>
          <span className="whitespace-nowrap">Stage 01 / 07 &nbsp; +</span>
        </div>
      </div>
    </section>
  );
}
