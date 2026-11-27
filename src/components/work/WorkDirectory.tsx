"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { ProjectPreviewArt } from "@/components/visuals/ProjectPreviewArt";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

/** Renders an interactive filterable directory of Web Guru's clearly labeled demo case studies. */
export function WorkDirectory() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

  // Build unique industry filter options directly from project data.
  const industries = [
    "All",
    ...Array.from(new Set(PORTFOLIO_PROJECTS.map((item) => item.industry))),
  ];

  const visibleProjects =
    selectedIndustry === "All"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(
          (item) => item.industry === selectedIndustry
        );

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
      {/* Header */}
      <div className="border-b border-rule pb-8">
        <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
          Selected Work · Case Study Blueprints
        </span>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-6xl">
          How our services fit together for{" "}
          <span className="font-serif font-normal italic text-accent">
            real business goals.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
          Explore structured demonstration case studies illustrating how Web
          Guru approaches local hospitality, retail, professional practices,
          and internal operations apps.
        </p>
      </div>

      {/* Honest demo disclosure */}
      <div className="mt-8 flex items-start gap-3 border border-rule bg-linen px-4 py-3.5 text-sm text-slate">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
          aria-hidden="true"
        />
        <p>
          <strong className="font-semibold text-ink">Demo Notice:</strong> All
          items currently shown are sample concepts and reserved client slots
          (no fictional clients or made-up numbers). Replace or expand entries in{" "}
          <code className="rounded bg-paper px-1.5 py-0.5 font-mono text-xs text-ink">
            src/data/projects.ts
          </code>
          .
        </p>
      </div>

      {/* Interactive industry filter bar */}
      <div
        role="group"
        aria-label="Filter case studies by industry"
        className="mt-8 flex flex-wrap gap-2"
      >
        {industries.map((industry) => {
          const active = selectedIndustry === industry;
          return (
            <button
              key={industry}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedIndustry(industry)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-linen text-ink hover:border-ink/40"
              }`}
            >
              {industry}
            </button>
          );
        })}
      </div>

      {/* Case study cards */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <article
            key={project.slug}
            className="group flex flex-col border border-rule bg-linen"
          >
            <Link href={`/work/${project.slug}`} className="block overflow-hidden">
              <div className="transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                <ProjectPreviewArt
                  theme={project.visualTheme}
                  label={project.name}
                />
              </div>
            </Link>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-accent uppercase">
                    {project.demoLabel}
                  </span>
                  <span className="font-mono text-[11px] text-slate">
                    {project.industry}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                  <Link
                    href={`/work/${project.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {project.name}
                  </Link>
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate sm:text-base">
                  {project.shortDescription}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.servicesDelivered.map((item) => (
                    <li
                      key={item}
                      className="border border-rule bg-paper px-2.5 py-1 font-mono text-[11px] text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                <span className="text-xs text-slate">{project.clientLabel}</span>
                <Link
                  href={`/work/${project.slug}`}
                  className="wg-link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent"
                >
                  Open Case Study
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
