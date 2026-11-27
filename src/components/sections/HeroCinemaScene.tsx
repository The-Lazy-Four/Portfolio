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

/** Renders Scene 01 (The Opening) with Neo-Brutalist architectural framing while preserving all existing WebGL, stagger, and chapter animations. */
export function HeroCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [chapterIndex, setChapterIndex] = useState(0);

  const activeChapter = HERO_CHAPTERS[chapterIndex];

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
      className="bg-ivory pt-4 pb-12 sm:px-5 sm:pt-6 lg:px-10 lg:pb-16"
    >
      <div className="mx-auto max-w-[90rem]">
        {/* Top Neo-Brutalist calibration bar */}
        <div className="mb-3 flex items-center justify-between gap-2 border-2 border-ink bg-concrete px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-ink uppercase shadow-[4px_4px_0px_#151515]">
          <span className="whitespace-nowrap">+ &nbsp; WG // 01 — Opening</span>
          <span className="hidden lg:inline">+</span>
          <span className="hidden truncate md:inline">
            One Partner · Six Disciplines · Zero Fragmentation
          </span>
          <span className="hidden lg:inline">+</span>
          <span className="bg-acid px-2 py-0.5 whitespace-nowrap">
            4-Member Studio +
          </span>
        </div>

        {/* Hard-edged architectural dark WebGL cinema stage */}
        <div
          data-cursor="EXPLORE"
          className="relative overflow-hidden border-[3px] border-ink bg-ink text-ivory shadow-[10px_10px_0px_#3155F5]"
        >
          {/* Preserved real-time Three.js topographic contour backdrop */}
          <WebGLTopographicStage className="absolute inset-0 h-full w-full" />

          {/* Crisp ink vignette keeping legibility razor-sharp */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/25 to-ink/85"
          />

          <div className="relative z-10 flex min-h-[78vh] flex-col justify-between px-5 py-8 sm:px-10 sm:py-11 lg:px-14 lg:py-12">
            {/* Upper graphic stamps + scroll jump trigger */}
            <div
              data-hero-stagger
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border-2 border-ivory bg-cobalt px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.1em] text-ivory uppercase shadow-[3px_3px_0px_#E9FF45]">
                  <span className="h-2 w-2 bg-acid" />
                  Web Guru Studio
                </span>
                <span className="inline-block -rotate-2 border-2 border-ink bg-acid px-3 py-1 font-mono text-[10px] font-bold tracking-[0.08em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
                  Direct 4-Member Desk
                </span>
              </div>

              <button
                type="button"
                onClick={() => scrollToTarget("#scene-ecosystem")}
                className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ivory bg-ink px-3.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.12em] text-acid uppercase shadow-[3px_3px_0px_#E9FF45] hover:bg-cobalt hover:text-ivory"
              >
                Scroll Down
                <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Monumental headline & active focus block */}
            <div className="my-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h1
                  id="hero-cinema-heading"
                  data-hero-stagger
                  className="font-display text-[clamp(2.5rem,6.4vw,5.75rem)] leading-[0.94] font-extrabold tracking-[-0.045em] text-ivory uppercase"
                >
                  Your business deserves a{" "}
                  <span className="relative inline-block font-serif font-normal lowercase italic text-acid underline decoration-orange decoration-4 underline-offset-8">
                    cohesive
                  </span>{" "}
                  digital engine.
                </h1>

                <p
                  data-hero-stagger
                  className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/90 sm:text-lg"
                >
                  From Google visibility and fast custom websites to workflow
                  applications, social media craft, counter NFC &amp; QR review
                  tools, and dependable support—Web Guru builds and manages your
                  entire online presence under one roof.
                </p>

                <div
                  data-hero-stagger
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <MagneticButton>
                    <Link
                      href="/contact"
                      data-cursor="START"
                      className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ivory bg-orange px-6 py-3.5 font-mono text-xs font-bold tracking-[0.08em] text-ivory uppercase shadow-[5px_5px_0px_#E9FF45] hover:bg-acid hover:text-ink"
                    >
                      Let&apos;s Grow Your Business
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </MagneticButton>

                  <button
                    type="button"
                    onClick={() => scrollToTarget("#scene-services")}
                    className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ivory bg-ink px-6 py-3.5 font-mono text-xs font-bold tracking-[0.08em] text-ivory uppercase shadow-[5px_5px_0px_#3155F5] hover:bg-cobalt"
                  >
                    Explore 6 Services
                    <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Bold brutalist active-focus callout block */}
              <div
                data-hero-stagger
                className="border-2 border-acid bg-ink p-5 shadow-[6px_6px_0px_#3155F5] lg:col-span-4"
              >
                <div className="flex items-center justify-between border-b border-ivory/25 pb-2.5">
                  <span className="bg-acid px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.12em] text-ink uppercase">
                    Active · {activeChapter.number}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-orange uppercase">
                    {activeChapter.servicesLabel}
                  </span>
                </div>
                <p className="mt-3 font-display text-xl leading-snug font-extrabold text-ivory">
                  {activeChapter.headline}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-ivory/80">
                  {activeChapter.summary}
                </p>
                <Link
                  href={activeChapter.href}
                  className="mt-4 inline-flex items-center gap-1.5 border border-ivory/40 bg-cobalt px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.08em] text-ivory uppercase transition-colors hover:bg-acid hover:text-ink"
                >
                  Inspect Scope
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Bottom 4-pillar Neo-Brutalist chapter scrubber tabs */}
            <div
              data-hero-stagger
              role="tablist"
              aria-label="Core studio focus chapters"
              className="grid grid-cols-2 gap-3 border-t-2 border-ivory/30 pt-5 lg:grid-cols-4"
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
                    className={`group border-2 px-3.5 py-3 text-left transition-all ${
                      selected
                        ? "border-ink bg-acid text-ink shadow-[4px_4px_0px_#F0522B]"
                        : "border-ivory/30 bg-ink/85 text-ivory/80 hover:border-acid hover:text-ivory"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase">
                      <span
                        className={
                          selected
                            ? "bg-ink px-1.5 py-0.5 text-acid"
                            : "text-acid"
                        }
                      >
                        {chapter.number}
                      </span>
                      <span className="truncate opacity-85">
                        {chapter.servicesLabel}
                      </span>
                    </div>
                    <p className="mt-1.5 font-display text-sm font-extrabold tracking-tight uppercase">
                      {chapter.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Neo-Brutalist calibration bar */}
        <div className="mt-4 flex items-center justify-between gap-2 border-2 border-ink bg-ivory px-3 py-2 font-mono text-[10px] font-bold tracking-[0.12em] text-ink uppercase shadow-[4px_4px_0px_#151515]">
          <span className="whitespace-nowrap">+ &nbsp; Explore Ecosystem</span>
          <span className="hidden lg:inline">+</span>
          <span className="hidden truncate md:inline">
            Local SEO · Web · Apps · Social · NFC/QR · Support
          </span>
          <span className="hidden lg:inline">+</span>
          <span className="bg-ink px-2 py-0.5 text-acid whitespace-nowrap">
            Stage 01 / 07 &nbsp; +
          </span>
        </div>
      </div>
    </section>
  );
}
