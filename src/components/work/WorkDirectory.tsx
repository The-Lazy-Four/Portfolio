"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import { ProjectPreviewArt } from "@/components/visuals/ProjectPreviewArt";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

/** Renders the Neo-Brutalist filterable archive of Web Guru's clearly labeled demo case studies. */
export function WorkDirectory() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");

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
      <div className="border-b-[3px] border-ink pb-8">
        <span className="inline-block border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
          Selected Work · Case Study Blueprints
        </span>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] text-ink uppercase sm:text-6xl">
          How our services fit together for{" "}
          <span className="font-serif font-normal lowercase italic text-cobalt underline decoration-orange decoration-4 underline-offset-4">
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
      <div className="mt-8 flex items-start gap-3 border-2 border-ink bg-cobalt px-5 py-4 text-sm text-ivory shadow-[5px_5px_0px_#151515]">
        <Info
          className="mt-0.5 h-4 w-4 shrink-0 text-acid"
          aria-hidden="true"
        />
        <p>
          <strong className="bg-ink px-1.5 py-0.5 font-mono text-xs text-acid uppercase">
            Demo Notice:
          </strong>{" "}
          All items currently shown are sample concepts and reserved client
          slots (no fictional clients or made-up numbers). Replace or expand
          entries in{" "}
          <code className="bg-ink px-1.5 py-0.5 font-mono text-xs text-ivory">
            src/data/projects.ts
          </code>
          .
        </p>
      </div>

      {/* Interactive rectangular industry filters */}
      <div
        role="group"
        aria-label="Filter case studies by industry"
        className="mt-8 flex flex-wrap gap-2.5"
      >
        {industries.map((industry) => {
          const active = selectedIndustry === industry;
          return (
            <button
              key={industry}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedIndustry(industry)}
              className={`border-2 border-ink px-4 py-2 font-mono text-xs font-bold uppercase transition-colors ${
                active
                  ? "bg-acid text-ink shadow-[3px_3px_0px_#151515]"
                  : "bg-concrete text-ink hover:bg-ivory"
              }`}
            >
              {industry}
            </button>
          );
        })}
      </div>

      {/* Hard-edged Case study grid */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <article
            key={project.slug}
            className="group flex flex-col border-[3px] border-ink bg-concrete shadow-[7px_7px_0px_#151515]"
          >
            <Link href={`/work/${project.slug}`} className="block overflow-hidden">
              <div className="transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                <ProjectPreviewArt
                  theme={project.visualTheme}
                  label={project.name}
                />
              </div>
            </Link>

            <div className="flex flex-1 flex-col justify-between bg-ivory p-6 sm:p-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-acid uppercase">
                    0{index + 1} · {project.demoLabel}
                  </span>
                  <span className="border border-ink bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
                    {project.industry}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink uppercase">
                  <Link
                    href={`/work/${project.slug}`}
                    className="transition-colors hover:text-cobalt"
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
                      className="border-2 border-ink bg-concrete px-2.5 py-1 font-mono text-[10px] font-bold text-ink uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t-2 border-ink pt-4">
                <span className="font-mono text-xs font-bold text-slate">
                  {project.clientLabel}
                </span>
                <Link
                  href={`/work/${project.slug}`}
                  className="wg-brutal-btn inline-flex items-center gap-1.5 border-2 border-ink bg-acid px-4 py-1.5 font-mono text-xs font-bold text-ink uppercase hover:bg-cobalt hover:text-ivory"
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
