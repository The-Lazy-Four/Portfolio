import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectPreviewArt } from "@/components/visuals/ProjectPreviewArt";
import { PORTFOLIO_PROJECTS, getProjectBySlug } from "@/data/projects";

/** Pre-generates static routes for all configured portfolio and demo case study slugs. */
export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

/** Builds per-case-study SEO metadata dynamically from the matching project entry. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: project.name,
    description: project.shortDescription,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
  };
}

/** Renders the complete 8-part reusable case study layout for a selected demo or verified client project. */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <article className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-18 lg:px-10">
          <Link
            href="/work"
            className="wg-link-underline inline-flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-slate uppercase hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Selected Work
          </Link>

          {/* Header & demo disclosure */}
          <div className="mt-7 border-b border-rule pb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-linen px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              {project.demoLabel}
            </span>
            <h1 className="mt-4 font-display text-3xl leading-[1.08] font-bold tracking-[-0.03em] text-ink sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate">
              {project.shortDescription}
            </p>
          </div>

          {/* 1. Client & Industry Metadata Grid */}
          <div className="grid grid-cols-1 gap-6 border-b border-rule py-7 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] text-slate uppercase">
                Client &amp; Status
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                {project.clientLabel}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] text-slate uppercase">
                Industry
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                {project.industry}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.08em] text-slate uppercase">
                Services Delivered
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                {project.servicesDelivered.join(" · ")}
              </p>
            </div>
          </div>

          {/* Lead visual */}
          <div className="my-10">
            <ProjectPreviewArt
              theme={project.visualTheme}
              label={project.name}
            />
          </div>

          {/* 2. Project Overview, 3. Challenge, 4. Strategy, 5. Solution */}
          <div className="space-y-10">
            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                01 — Project Overview
              </h2>
              <p className="text-base leading-relaxed text-ink/90 md:col-span-8">
                {project.overview}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                02 — Challenge
              </h2>
              <p className="text-base leading-relaxed text-ink/90 md:col-span-8">
                {project.challenge}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                03 — Strategy
              </h2>
              <p className="text-base leading-relaxed text-ink/90 md:col-span-8">
                {project.strategy}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                04 — Solution
              </h2>
              <p className="text-base leading-relaxed text-ink/90 md:col-span-8">
                {project.solution}
              </p>
            </section>

            {/* 6. Deliverables */}
            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                05 — Deliverables
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-8">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border border-rule bg-linen px-4 py-3 text-sm text-ink"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 7. Visual Gallery */}
            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                06 — Visual Gallery Slots
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8">
                {project.galleryNotes.map((frame, index) => (
                  <div
                    key={frame.title}
                    className="border border-rule bg-linen p-5"
                  >
                    <span className="font-mono text-[11px] text-slate">
                      FRAME 0{index + 1} · RESERVED VISUAL
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                      {frame.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate">{frame.caption}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Results (Verified Slot) */}
            <section className="grid grid-cols-1 gap-4 border-t border-rule pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs tracking-[0.08em] text-accent uppercase md:col-span-4">
                07 — Results &amp; Outcomes
              </h2>
              <div className="border border-dashed border-rule bg-linen p-6 md:col-span-8">
                <p className="font-mono text-xs text-ink uppercase">
                  Verification Status: Pending Real Client Data
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {project.verifiedResultsNote}
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-rule bg-linen px-5 py-2.5 text-sm font-medium text-ink hover:border-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Case Studies
            </Link>

            <Link
              href={`/contact?service=${encodeURIComponent(project.servicesDelivered[0] || "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper hover:bg-accent-hover"
            >
              Discuss a Similar Project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      <ContactSection initialService={project.servicesDelivered[0]} />
    </>
  );
}
