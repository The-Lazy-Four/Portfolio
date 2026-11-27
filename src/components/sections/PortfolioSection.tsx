"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectPreviewArt } from "@/components/visuals/ProjectPreviewArt";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

/** Renders an asymmetric editorial Selected Work showcase with clipped visual reveals and hover depth. */
export function PortfolioSection() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const leadProject = PORTFOLIO_PROJECTS[0];
  const secondaryLeft = PORTFOLIO_PROJECTS[1];
  const secondaryRight = PORTFOLIO_PROJECTS[2];
  const compactIndexProject = PORTFOLIO_PROJECTS[3];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-rule bg-paper"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {/* Header row */}
        <div className="flex flex-col justify-between gap-6 border-b border-rule pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
              WG / 04 — Selected Work
            </span>
            <MaskedText
              as="h2"
              id="work-heading"
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
              lines={[
                "Designed around real",
                <span key="wrk-l2">
                  business{" "}
                  <span className="font-serif font-normal italic text-accent">
                    clarity &amp; outcomes.
                  </span>
                </span>,
              ]}
            />
          </div>

          <Link
            href="/work"
            className="wg-link-underline inline-flex w-fit items-center gap-1.5 font-mono text-xs font-medium tracking-[0.08em] text-ink uppercase hover:text-accent"
          >
            All Case Study Blueprints
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        {/* Transparent demo disclosure */}
        <div className="mt-8 flex items-start gap-3 border border-rule bg-linen px-4 py-3.5 text-sm text-slate">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
            aria-hidden="true"
          />
          <p>
            <strong className="font-semibold text-ink">
              Conceptual Demonstrations:
            </strong>{" "}
            The showcases below are labeled{" "}
            <span className="font-medium text-ink">Demo Concepts</span>{" "}
            illustrating our solution architecture until verified client
            engagements and screenshots are supplied in{" "}
            <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs text-ink">
              src/data/projects.ts
            </code>
            .
          </p>
        </div>

        {/* 1. Asymmetric Full-Width Lead Project Feature */}
        {leadProject && (
          <Reveal variant="clip-up" className="mt-10">
            <article className="group grid grid-cols-1 items-stretch border border-rule bg-linen lg:grid-cols-12">
              <Link
                href={`/work/${leadProject.slug}`}
                className="relative block overflow-hidden lg:col-span-7"
                aria-label={`Open case study for ${leadProject.name}`}
              >
                <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <ProjectPreviewArt
                    theme={leadProject.visualTheme}
                    label={leadProject.name}
                    aspectClass="aspect-[16/10] lg:h-full lg:aspect-auto min-h-[260px]"
                  />
                </div>
                <span className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-mono text-[11px] font-medium text-paper opacity-90 transition-all duration-200 group-hover:bg-accent group-hover:opacity-100">
                  Explore Case Study
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                      {leadProject.demoLabel}
                    </span>
                    <span className="font-mono text-[11px] text-slate">
                      {leadProject.industry}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl leading-tight font-bold tracking-tight text-ink sm:text-3xl">
                    <Link
                      href={`/work/${leadProject.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {leadProject.name}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">
                    {leadProject.shortDescription}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {leadProject.servicesDelivered.map((item) => (
                      <li
                        key={item}
                        className="border border-rule bg-paper px-2.5 py-1 font-mono text-[11px] text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-rule pt-4">
                  <span className="text-xs text-slate">
                    {leadProject.clientLabel}
                  </span>
                  <Link
                    href={`/work/${leadProject.slug}`}
                    className="wg-link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent"
                  >
                    Read Full Case Study
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* 2. Asymmetric 7 / 5 Editorial Split for Projects 02 and 03 */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {secondaryLeft && (
            <Reveal variant="clip-up" delay={0.05} className="lg:col-span-7">
              <article className="group flex h-full flex-col border border-rule bg-paper">
                <Link
                  href={`/work/${secondaryLeft.slug}`}
                  className="block overflow-hidden"
                >
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <ProjectPreviewArt
                      theme={secondaryLeft.visualTheme}
                      label={secondaryLeft.name}
                      aspectClass="aspect-[16/9]"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-accent uppercase">
                        {secondaryLeft.demoLabel}
                      </span>
                      <span className="font-mono text-[11px] text-slate">
                        {secondaryLeft.industry}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                      <Link
                        href={`/work/${secondaryLeft.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {secondaryLeft.name}
                      </Link>
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate sm:text-base">
                      {secondaryLeft.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                    <span className="font-mono text-[11px] text-slate">
                      {secondaryLeft.servicesDelivered.length} Disciplines
                    </span>
                    <Link
                      href={`/work/${secondaryLeft.slug}`}
                      className="wg-link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent"
                    >
                      View Case Study
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          {secondaryRight && (
            <Reveal variant="clip-up" delay={0.1} className="lg:col-span-5">
              <article className="group flex h-full flex-col border border-rule bg-ink text-paper">
                <Link
                  href={`/work/${secondaryRight.slug}`}
                  className="block overflow-hidden"
                >
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <ProjectPreviewArt
                      theme={secondaryRight.visualTheme}
                      label={secondaryRight.name}
                      aspectClass="aspect-[4/3]"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <span className="font-mono text-[11px] text-accent uppercase">
                      {secondaryRight.demoLabel}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-paper">
                      <Link
                        href={`/work/${secondaryRight.slug}`}
                        className="transition-colors hover:text-accent"
                      >
                        {secondaryRight.name}
                      </Link>
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-paper/75">
                      {secondaryRight.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-paper/15 pt-4">
                    <span className="font-mono text-[11px] text-paper/60">
                      {secondaryRight.industry}
                    </span>
                    <Link
                      href={`/work/${secondaryRight.slug}`}
                      className="wg-link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-paper hover:text-accent"
                    >
                      View Case Study
                      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          )}
        </div>

        {/* 3. Full-width Interactive Index Row for Project 04 */}
        {compactIndexProject && (
          <Reveal delay={0.08} className="mt-8">
            <article
              onMouseEnter={() => setHoveredSlug(compactIndexProject.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="group border border-rule bg-linen p-6 transition-colors hover:border-ink sm:p-8"
            >
              <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] text-accent uppercase">
                      {compactIndexProject.demoLabel}
                    </span>
                    <span className="font-mono text-[11px] text-slate">
                      · {compactIndexProject.industry}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    <Link
                      href={`/work/${compactIndexProject.slug}`}
                      className="transition-colors group-hover:text-accent"
                    >
                      {compactIndexProject.name}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
                    {compactIndexProject.shortDescription}
                  </p>
                </div>

                <div className="lg:col-span-3">
                  <div
                    className={`transition-transform duration-300 ${
                      hoveredSlug === compactIndexProject.slug
                        ? "scale-[1.03]"
                        : ""
                    }`}
                  >
                    <ProjectPreviewArt
                      theme={compactIndexProject.visualTheme}
                      label={compactIndexProject.name}
                      aspectClass="aspect-[16/9]"
                    />
                  </div>
                </div>

                <div className="flex lg:col-span-2 lg:justify-end">
                  <Link
                    href={`/work/${compactIndexProject.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-paper"
                  >
                    Open Blueprint
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  );
}
