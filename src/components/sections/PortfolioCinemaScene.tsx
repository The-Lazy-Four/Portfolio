"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { HighlighterReveal } from "@/components/motion/KineticTypography";
import { ProjectPreviewArt } from "@/components/visuals/ProjectPreviewArt";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

/** Renders Scene 04 (Selected Work) combining an Era-style scroll-expanding arch portal, ZZDP staggered asymmetric grid, and Noomo hover-preview index rows. */
export function PortfolioCinemaScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const archPortalRef = useRef<HTMLDivElement | null>(null);
  const { reducedMotion, setActiveSceneIndex } = useCinemaEngine();
  const [expandedSlug, setExpandedSlug] = useState<string>(
    PORTFOLIO_PROJECTS[2]?.slug || ""
  );

  const flagshipProject = PORTFOLIO_PROJECTS[0];
  const secondaryLeft = PORTFOLIO_PROJECTS[1];
  const archiveRows = PORTFOLIO_PROJECTS.slice(2);

  useEffect(() => {
    const section = sectionRef.current;
    const archPortal = archPortalRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(3),
        onEnterBack: () => setActiveSceneIndex(3),
      });

      // Era Residence inspired scroll-scrubbed arch expansion reveal on desktop/non-reduced-motion
      if (archPortal && !reducedMotion) {
        gsap.fromTo(
          archPortal,
          { scale: 0.91, borderTopLeftRadius: "260px", borderTopRightRadius: "260px" },
          {
            scale: 1,
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            ease: "none",
            scrollTrigger: {
              trigger: archPortal,
              start: "top 88%",
              end: "top 30%",
              scrub: 0.65,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, setActiveSceneIndex]);

  return (
    <section
      id="scene-work"
      ref={sectionRef}
      aria-labelledby="portfolio-cinema-heading"
      className="border-b border-rule bg-paper py-20 sm:py-28 xl:pl-11"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Top studio work header with transparency notice */}
        <div className="flex flex-col justify-between gap-6 border-b border-rule pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
              [04] · Selected Work &amp; Blueprints
            </span>
            <HighlighterReveal
              as="h2"
              id="portfolio-cinema-heading"
              lines={["Architectural case concepts", "engineered for real growth."]}
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
            />
          </div>

          <div className="max-w-md space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-linen px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Concept Demo Showcase · Client Slots Ready
            </span>
            <p className="text-sm leading-relaxed text-slate">
              Below are interactive architectural case blueprints demonstrating
              how we combine local discovery, web systems, workflows, and NFC
              touchpoints. Verified client engagements drop directly into these
              slots.
            </p>
          </div>
        </div>

        {/* Era Residence + ZZDP 10/4 Asymmetric Monograph Pair */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Dominant left asymmetric showcase with scroll-expanding Arch Portal mask */}
          {flagshipProject && (
            <article className="lg:col-span-7">
              <Link
                href={`/work/${flagshipProject.slug}`}
                data-cursor="VIEW CONCEPT"
                className="group block"
              >
                <div
                  ref={archPortalRef}
                  className="overflow-hidden border border-ink/15 bg-linen shadow-sm transition-shadow duration-300 group-hover:shadow-xl"
                >
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <ProjectPreviewArt
                      theme={flagshipProject.visualTheme}
                      label={flagshipProject.name}
                      aspectClass="aspect-[16/10]"
                    />
                  </div>
                </div>

                {/* ZZDP-style 3-column hairline metadata table underneath */}
                <div className="mt-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl leading-tight font-bold tracking-tight text-ink group-hover:text-accent sm:text-3xl">
                      {flagshipProject.name}
                    </h3>
                    <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate">
                    {flagshipProject.shortDescription}
                  </p>

                  <div className="mt-4 grid grid-cols-3 divide-x divide-rule border-y border-rule py-2.5 font-mono text-[10px] text-slate uppercase">
                    <span className="truncate pr-2">
                      &bull; {flagshipProject.industry}
                    </span>
                    <span className="truncate px-2 text-center">
                      &bull; {flagshipProject.servicesDelivered[0]}
                    </span>
                    <span className="truncate pl-2 text-right text-accent">
                      &bull; Concept Demo 01
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Offset right portrait showcase (ZZDP asymmetric counterbalance) */}
          {secondaryLeft && (
            <article className="lg:col-span-5 lg:mt-20">
              <Link
                href={`/work/${secondaryLeft.slug}`}
                data-cursor="VIEW CONCEPT"
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl border border-ink/15 bg-linen shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                  <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <ProjectPreviewArt
                      theme={secondaryLeft.visualTheme}
                      label={secondaryLeft.name}
                      aspectClass="aspect-[4/3]"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl leading-tight font-bold tracking-tight text-ink group-hover:text-accent sm:text-2xl">
                      {secondaryLeft.name}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {secondaryLeft.shortDescription}
                  </p>

                  <div className="mt-4 grid grid-cols-2 divide-x divide-rule border-y border-rule py-2.5 font-mono text-[10px] text-slate uppercase">
                    <span className="truncate pr-2">&bull; {secondaryLeft.industry}</span>
                    <span className="truncate pl-2 text-right text-accent">
                      &bull; Concept Demo 02
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>

        {/* Noomo-inspired Interactive Expandable Archive Rows for additional concepts */}
        <div className="mt-20 border-t border-ink/20 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-xs tracking-[0.12em] text-slate uppercase">
              More Concept Blueprints &amp; Reserved Case Slots
            </span>
            <Link
              href="/work"
              data-cursor="ARCHIVE"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-ink uppercase hover:text-accent"
            >
              View Full Archive
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y divide-rule border-y border-rule">
            {archiveRows.map((project, rowIdx) => {
              const isOpen = expandedSlug === project.slug;
              return (
                <div key={project.slug} className="py-5 sm:py-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSlug(isOpen ? "" : project.slug)
                      }
                      aria-expanded={isOpen}
                      className="flex flex-1 items-center gap-4 text-left sm:gap-7"
                    >
                      <span className="font-mono text-xs text-accent">
                        0{rowIdx + 3}
                      </span>
                      <span className="font-display text-xl font-bold tracking-tight text-ink transition-colors hover:text-accent sm:text-2xl">
                        {project.name}
                      </span>
                    </button>

                    <div className="flex items-center gap-3">
                      <span className="hidden font-mono text-[11px] text-slate uppercase md:inline">
                        {project.demoLabel}
                      </span>
                      <Link
                        href={`/work/${project.slug}`}
                        data-cursor="OPEN"
                        className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-linen px-4 py-1.5 font-mono text-[10px] font-medium text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        Blueprint
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-5 grid grid-cols-1 items-center gap-6 border-t border-rule/60 pt-5 lg:grid-cols-12">
                      <div className="overflow-hidden rounded-xl border border-rule bg-linen lg:col-span-5">
                        <ProjectPreviewArt
                          theme={project.visualTheme}
                          label={project.name}
                          aspectClass="aspect-[16/10]"
                        />
                      </div>
                      <div className="space-y-3 lg:col-span-7">
                        <p className="text-sm leading-relaxed text-slate sm:text-base">
                          {project.overview}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.deliverables.map((d) => (
                            <span
                              key={d}
                              className="rounded-full border border-rule bg-linen px-3 py-1 font-mono text-[10px] text-ink"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
