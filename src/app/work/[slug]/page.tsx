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

/** Renders the complete Neo-Brutalist 8-part case study layout for a selected demo or verified client project. */
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
      <article className="border-b-[3px] border-ink bg-ivory">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-18 lg:px-10">
          <Link
            href="/work"
            className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-concrete px-4 py-2 font-mono text-xs font-bold tracking-[0.08em] text-ink uppercase hover:bg-acid"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Selected Work
          </Link>

          <div className="mt-7 border-b-[3px] border-ink pb-8">
            <span className="inline-flex items-center gap-2 border-2 border-ink bg-acid px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
              <Info className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
              {project.demoLabel}
            </span>
            <h1 className="mt-4 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ink uppercase sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate">
              {project.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y-2 divide-ink border-2 border-ink bg-concrete shadow-[6px_6px_0px_#151515] sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
            <div className="p-5">
              <p className="font-mono text-[10px] font-bold tracking-[0.08em] text-cobalt uppercase">
                Client &amp; Status
              </p>
              <p className="mt-1.5 text-sm font-bold text-ink">
                {project.clientLabel}
              </p>
            </div>
            <div className="p-5">
              <p className="font-mono text-[10px] font-bold tracking-[0.08em] text-cobalt uppercase">
                Industry
              </p>
              <p className="mt-1.5 text-sm font-bold text-ink">
                {project.industry}
              </p>
            </div>
            <div className="bg-acid p-5">
              <p className="font-mono text-[10px] font-bold tracking-[0.08em] text-ink uppercase">
                Services Delivered
              </p>
              <p className="mt-1.5 text-sm font-bold text-ink">
                {project.servicesDelivered.join(" · ")}
              </p>
            </div>
          </div>

          <div className="my-10 shadow-[8px_8px_0px_#3155F5]">
            <ProjectPreviewArt
              theme={project.visualTheme}
              label={project.name}
            />
          </div>

          <div className="space-y-8">
            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                01 — Project Overview
              </h2>
              <p className="text-base leading-relaxed text-ink md:col-span-8">
                {project.overview}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                02 — Challenge
              </h2>
              <p className="text-base leading-relaxed text-ink md:col-span-8">
                {project.challenge}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                03 — Strategy
              </h2>
              <p className="text-base leading-relaxed text-ink md:col-span-8">
                {project.strategy}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                04 — Solution
              </h2>
              <p className="text-base leading-relaxed text-ink md:col-span-8">
                {project.solution}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                05 — Deliverables
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-8">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border-2 border-ink bg-concrete px-4 py-3 text-sm font-semibold text-ink shadow-[3px_3px_0px_#151515]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-cobalt"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                06 — Visual Gallery Slots
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8">
                {project.galleryNotes.map((frame, index) => (
                  <div
                    key={frame.title}
                    className="border-2 border-ink bg-concrete p-5 shadow-[4px_4px_0px_#151515]"
                  >
                    <span className="bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-acid">
                      FRAME 0{index + 1} · RESERVED VISUAL
                    </span>
                    <h3 className="mt-3 font-display text-lg font-extrabold text-ink uppercase">
                      {frame.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate">{frame.caption}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 border-t-2 border-ink pt-8 md:grid-cols-12">
              <h2 className="font-mono text-xs font-extrabold tracking-[0.08em] text-orange uppercase md:col-span-4">
                07 — Results &amp; Outcomes
              </h2>
              <div className="border-2 border-ink bg-ink p-6 text-ivory shadow-[6px_6px_0px_#3155F5] md:col-span-8">
                <p className="font-mono text-xs font-bold text-acid uppercase">
                  Verification Status: Pending Real Client Data
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/85">
                  {project.verifiedResultsNote}
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-8">
            <Link
              href="/work"
              className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-concrete px-5 py-2.5 font-mono text-xs font-bold text-ink uppercase hover:bg-acid"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Case Studies
            </Link>

            <Link
              href={`/contact?service=${encodeURIComponent(project.servicesDelivered[0] || "")}`}
              className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-orange px-6 py-3 font-mono text-xs font-bold text-ivory uppercase hover:bg-cobalt"
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
