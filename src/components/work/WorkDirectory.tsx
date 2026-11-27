"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/data/projects";

/** Renders Web Guru's visual-first Selected Work directory with genuine screenshots and industry filtering. */
export function WorkDirectory() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [previewModes, setPreviewModes] = useState<
    Record<string, "desktop" | "mobile">
  >({});

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

  /** Toggles between desktop and mobile previews for an individual project. */
  function setMode(slug: string, mode: "desktop" | "mobile") {
    setPreviewModes((prev) => ({ ...prev, [slug]: mode }));
  }

  return (
    <div className="mx-auto max-w-[92rem] px-6 pt-32 pb-20 sm:px-10 sm:pt-40 sm:pb-28 lg:px-14">
      <div className="border-b border-white/12 pb-10">
        <p className="text-xs font-medium text-[#A78BFA]">Selected Work</p>
        <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] font-bold tracking-[-0.03em] text-[#F5F1FA]">
          Digital experiences built for{" "}
          <span className="font-serif font-normal italic text-[#FF9FFC]">
            real businesses.
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#C7BDD5] sm:text-lg">
          Explore live websites we designed and launched across hospitality,
          healthcare, and retail.
        </p>

        {/* Clean pill industry filters */}
        <div
          role="group"
          aria-label="Filter projects by industry"
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
                className={`min-h-[40px] rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-[#A78BFA] bg-[#5227FF] text-[#F5F1FA]"
                    : "border-white/12 bg-white/5 text-[#C7BDD5] hover:border-white/25 hover:text-[#F5F1FA]"
                }`}
              >
                {industry}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial alternating showcase list */}
      <div className="mt-16 space-y-24 sm:space-y-32">
        {visibleProjects.map((project, index) => {
          const mode = previewModes[project.slug] || "desktop";
          const reverse = index % 2 === 1;

          return (
            <article
              key={project.slug}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <div
                className={`lg:col-span-7 ${
                  reverse ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <span className="text-xs font-medium text-[#B497CF]">
                    0{index + 1} · {project.industry}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setMode(project.slug, "desktop")}
                      className={`inline-flex items-center gap-1.5 pb-0.5 transition-colors ${
                        mode === "desktop"
                          ? "border-b border-[#5227FF] text-[#F5F1FA]"
                          : "text-[#91869F] hover:text-[#F5F1FA]"
                      }`}
                    >
                      <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
                      Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode(project.slug, "mobile")}
                      className={`inline-flex items-center gap-1.5 pb-0.5 transition-colors ${
                        mode === "mobile"
                          ? "border-b border-[#5227FF] text-[#F5F1FA]"
                          : "text-[#91869F] hover:text-[#F5F1FA]"
                      }`}
                    >
                      <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                      Mobile
                    </button>
                  </div>
                </div>

                <div className="flex justify-center overflow-hidden rounded-2xl bg-[#171027]/50 ring-1 ring-white/10">
                  {mode === "desktop" ? (
                    <Image
                      src={project.desktopImage}
                      alt={`${project.name} desktop website preview`}
                      width={1440}
                      height={1000}
                      className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  ) : (
                    <Image
                      src={project.mobileImage}
                      alt={`${project.name} mobile website preview`}
                      width={390}
                      height={844}
                      className="my-4 h-auto w-full max-w-[280px] rounded-xl object-cover shadow-2xl"
                    />
                  )}
                </div>
              </div>

              <div
                className={`lg:col-span-5 ${
                  reverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[#F5F1FA] sm:text-3xl">
                  {project.name}
                </h2>
                <p className="mt-2 font-serif text-xl italic text-[#D8C5F2]">
                  {project.headline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#C7BDD5]">
                  {project.shortDescription}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#5227FF] px-6 py-3 text-xs font-semibold text-[#F5F1FA] transition-colors hover:bg-[#FF9FFC] hover:text-[#100B18]"
                  >
                    View Live Website
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <Link
                    href={`/work/${project.slug}`}
                    className="text-xs font-semibold text-[#F5F1FA] underline decoration-[#B497CF]/60 underline-offset-8 transition-colors hover:text-[#FF9FFC]"
                  >
                    Explore Project &rarr;
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
