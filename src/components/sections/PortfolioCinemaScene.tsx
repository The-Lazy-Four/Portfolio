"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import FlexCarousel from "@/components/visuals/FlexCarousel";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const CAROUSEL_ITEMS = PORTFOLIO_PROJECTS.map((project) => ({
  src: project.desktopImage,
  alt: `${project.name} — ${project.industry}`,
  title: project.name,
  subtitle: project.industry,
}));

/** Renders Section 03 (Selected Work) using the interactive WebGL2 FlexCarousel and synchronized project details. */
export function PortfolioCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject =
    PORTFOLIO_PROJECTS[activeIndex] || PORTFOLIO_PROJECTS[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(2),
        onEnterBack: () => setActiveSceneIndex(2),
      });
    }, section);

    return () => ctx.revert();
  }, [setActiveSceneIndex]);

  return (
    <section
      id="scene-work"
      ref={sectionRef}
      aria-labelledby="portfolio-cinema-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#100B18]/40 py-16 text-[#F5F1FA] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
        {/* Minimal section header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <h2
              id="portfolio-cinema-heading"
              className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-[#F5F1FA]"
            >
              Selected{" "}
              <span className="font-serif font-normal italic text-[#FF9FFC]">
                Work
              </span>
            </h2>
            <p className="mt-2.5 text-base text-[#C7BDD5] sm:text-lg">
              Real websites built for growing businesses.
            </p>
          </div>

          <Link
            href="/work"
            className="wg-link-underline inline-flex min-h-[44px] w-fit items-center gap-2 text-sm font-medium text-[#D8C5F2] transition-colors hover:text-[#FF9FFC]"
          >
            Explore all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Responsive full-bleed FlexCarousel stage */}
      <div className="mx-auto mt-8 w-full max-w-[100rem] px-2 sm:mt-10 sm:px-6 lg:px-10">
        <div className="h-[340px] w-full overflow-hidden sm:h-[440px] lg:h-[520px]">
          <FlexCarousel
            items={CAROUSEL_ITEMS}
            preset="liquid"
            intro="rise"
            fit="landscape"
            cardHeight={0.54}
            gap={16}
            radius={4}
            squeeze={0.12}
            dispersion={0.22}
            bend={0.24}
            focusOnClick={true}
            autoplay={false}
            captions={true}
            captureWheel={false}
            onChange={(index: number) => setActiveIndex(index)}
            onSelect={(index: number) => setActiveIndex(index)}
            className="text-[#F5F1FA]"
          />
        </div>
      </div>

      {/* Minimal dynamic active project information (no rectangular card) */}
      <div className="mx-auto mt-6 max-w-[92rem] px-5 sm:mt-8 sm:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-7 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#A78BFA]">
              {activeProject.industry}
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-[#F5F1FA] sm:text-3xl">
              {activeProject.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-base leading-relaxed text-[#C7BDD5]">
              {activeProject.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={activeProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#5227FF] px-6 py-3 text-sm font-medium text-[#F5F1FA] transition-colors hover:bg-[#A78BFA] hover:text-[#100B18]"
            >
              View Live Website
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              href={`/work/${activeProject.slug}`}
              className="wg-link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D8C5F2] transition-colors hover:text-[#FF9FFC]"
            >
              Explore Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
