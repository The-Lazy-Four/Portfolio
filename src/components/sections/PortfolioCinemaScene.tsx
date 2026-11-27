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

/** Renders Scene 04 (Selected Work) in a bold Neo-Brutalist monograph grid while preserving GSAP arch reveal and interactive archive accordions. */
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

      // Preserve exact Era Residence inspired scroll-scrubbed arch expansion timeline
      if (archPortal && !reducedMotion) {
        gsap.fromTo(
          archPortal,
          {
            scale: 0.91,
            borderTopLeftRadius: "260px",
            borderTopRightRadius: "260px",
          },
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
      className="border-y-[3px] border-ink bg-ivory py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Bold Neo-Brutalist section banner */}
        <div className="flex flex-col justify-between gap-6 border-b-[3px] border-ink pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="inline-block border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold tracking-[0.14em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
              [04] · Selected Work &amp; Blueprints
            </span>
            <HighlighterReveal
              as="h2"
              id="portfolio-cinema-heading"
              lines={[
                "Architectural case concepts",
                "engineered for real growth.",
              ]}
              barClassName="bg-cobalt"
              className="mt-4 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ink uppercase sm:text-5xl"
            />
          </div>

          <div className="max-w-md border-2 border-ink bg-concrete p-4 shadow-[5px_5px_0px_#151515]">
            <span className="inline-flex items-center gap-2 bg-ink px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.08em] text-acid uppercase">
              <span className="h-2 w-2 bg-orange" />
              Concept Demo Showcase · Client Slots Ready
            </span>
            <p className="mt-2.5 text-sm leading-relaxed text-ink">
              Interactive case blueprints demonstrating how we unite local
              discovery, web systems, workflows, and NFC touchpoints. Verified
              client engagements drop directly into these slots.
            </p>
          </div>
        </div>

        {/* Asymmetric Neo-Brutalist Showcase Grid */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Dominant left showcase with preserved arch GSAP reveal + offset cobalt shadow */}
          {flagshipProject && (
            <article className="lg:col-span-7">
              <Link
                href={`/work/${flagshipProject.slug}`}
                data-cursor="VIEW CONCEPT"
                className="group block"
              >
                <div className="relative">
                  <div
                    ref={archPortalRef}
                    className="overflow-hidden border-[3px] border-ink bg-ink shadow-[9px_9px_0px_#3155F5] transition-shadow duration-300"
                  >
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ProjectPreviewArt
                        theme={flagshipProject.visualTheme}
                        label={flagshipProject.name}
                        aspectClass="aspect-[16/10]"
                      />
                    </div>
                  </div>
                  <span className="absolute -top-4 left-4 border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-extrabold text-ink uppercase shadow-[3px_3px_0px_#151515]">
                    CASE // 01
                  </span>
                </div>

                {/* Hard-edged metadata specification footer */}
                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl leading-tight font-extrabold tracking-tight text-ink uppercase group-hover:text-cobalt sm:text-3xl">
                      {flagshipProject.name}
                    </h3>
                    <span className="wg-brutal-btn mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink bg-orange text-ivory group-hover:bg-acid group-hover:text-ink">
                      <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate">
                    {flagshipProject.shortDescription}
                  </p>

                  <div className="mt-4 grid grid-cols-3 divide-x-2 divide-ink border-2 border-ink bg-concrete font-mono text-[10px] font-bold text-ink uppercase shadow-[4px_4px_0px_#151515]">
                    <span className="truncate px-3 py-2.5">
                      &bull; {flagshipProject.industry}
                    </span>
                    <span className="truncate px-3 py-2.5 text-center">
                      &bull; {flagshipProject.servicesDelivered[0]}
                    </span>
                    <span className="truncate bg-ink px-3 py-2.5 text-right text-acid">
                      &bull; Concept Demo 01
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          {/* Offset right rectangular showcase */}
          {secondaryLeft && (
            <article className="lg:col-span-5 lg:mt-20">
              <Link
                href={`/work/${secondaryLeft.slug}`}
                data-cursor="VIEW CONCEPT"
                className="group block"
              >
                <div className="relative">
                  <div className="overflow-hidden border-[3px] border-ink bg-concrete shadow-[9px_9px_0px_#151515]">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ProjectPreviewArt
                        theme={secondaryLeft.visualTheme}
                        label={secondaryLeft.name}
                        aspectClass="aspect-[4/3]"
                      />
                    </div>
                  </div>
                  <span className="absolute -top-4 right-4 border-2 border-ink bg-orange px-3 py-1 font-mono text-xs font-extrabold text-ivory uppercase shadow-[3px_3px_0px_#151515]">
                    CASE // 02
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl leading-tight font-extrabold tracking-tight text-ink uppercase group-hover:text-cobalt sm:text-2xl">
                      {secondaryLeft.name}
                    </h3>
                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {secondaryLeft.shortDescription}
                  </p>

                  <div className="mt-4 grid grid-cols-2 divide-x-2 divide-ink border-2 border-ink bg-concrete font-mono text-[10px] font-bold text-ink uppercase shadow-[4px_4px_0px_#151515]">
                    <span className="truncate px-3 py-2.5">
                      &bull; {secondaryLeft.industry}
                    </span>
                    <span className="truncate bg-cobalt px-3 py-2.5 text-right text-ivory">
                      &bull; Concept Demo 02
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}
        </div>

        {/* Neo-Brutalist Expandable Archive Index Rows */}
        <div className="mt-20 border-t-[3px] border-ink pt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="bg-ink px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-acid uppercase">
              More Concept Blueprints &amp; Reserved Case Slots
            </span>
            <Link
              href="/work"
              data-cursor="ARCHIVE"
              className="wg-brutal-btn inline-flex items-center gap-1.5 border-2 border-ink bg-acid px-4 py-2 font-mono text-xs font-bold text-ink uppercase"
            >
              View Full Archive
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="divide-y-2 divide-ink border-2 border-ink bg-concrete shadow-[6px_6px_0px_#151515]">
            {archiveRows.map((project, rowIdx) => {
              const isOpen = expandedSlug === project.slug;
              return (
                <div
                  key={project.slug}
                  className={`p-5 transition-colors sm:p-6 ${
                    isOpen ? "bg-ivory" : "bg-concrete hover:bg-ivory/70"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSlug(isOpen ? "" : project.slug)
                      }
                      aria-expanded={isOpen}
                      className="flex flex-1 items-center gap-4 text-left sm:gap-7"
                    >
                      <span className="border-2 border-ink bg-acid px-2.5 py-1 font-mono text-xs font-extrabold text-ink">
                        0{rowIdx + 3}
                      </span>
                      <span className="font-display text-xl font-extrabold tracking-tight text-ink uppercase transition-colors hover:text-cobalt sm:text-2xl">
                        {project.name}
                      </span>
                    </button>

                    <div className="flex items-center gap-3">
                      <span className="hidden border border-ink bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase md:inline">
                        {project.demoLabel}
                      </span>
                      <Link
                        href={`/work/${project.slug}`}
                        data-cursor="OPEN"
                        className="wg-brutal-btn inline-flex items-center gap-1.5 border-2 border-ink bg-cobalt px-4 py-1.5 font-mono text-[10px] font-bold text-ivory uppercase hover:bg-orange"
                      >
                        Blueprint
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-5 grid grid-cols-1 items-center gap-6 border-t-2 border-ink pt-5 lg:grid-cols-12">
                      <div className="overflow-hidden border-2 border-ink bg-ink shadow-[4px_4px_0px_#151515] lg:col-span-5">
                        <ProjectPreviewArt
                          theme={project.visualTheme}
                          label={project.name}
                          aspectClass="aspect-[16/10]"
                        />
                      </div>
                      <div className="space-y-4 lg:col-span-7">
                        <p className="text-sm leading-relaxed text-ink sm:text-base">
                          {project.overview}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.deliverables.map((d) => (
                            <span
                              key={d}
                              className="border-2 border-ink bg-acid px-3 py-1 font-mono text-[10px] font-bold text-ink"
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
