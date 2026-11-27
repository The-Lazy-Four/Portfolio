import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { PORTFOLIO_PROJECTS, getProjectBySlug } from "@/data/projects";

/** Pre-generates static routes for all configured portfolio project slugs. */
export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

/** Builds per-project SEO metadata dynamically from the matching project entry. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.shortDescription,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
  };
}

/** Renders the concise editorial project case study view over the global LiquidEther environment. */
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
      <article className="bg-[#100B18]/40 pt-28 pb-20 text-[#F5F1FA] sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <Link
            href="/work"
            className="inline-flex min-h-[40px] items-center gap-2 text-xs font-medium text-[#C7BDD5] transition-colors hover:text-[#FF9FFC]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Selected Work
          </Link>

          <header className="mt-6 border-b border-white/12 pb-8">
            <p className="text-xs font-medium text-[#A78BFA]">
              {project.industry}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.06] font-bold tracking-[-0.025em] text-[#F5F1FA]">
              {project.name}
            </h1>
            <p className="mt-3 font-serif text-xl italic text-[#D8C5F2] sm:text-2xl">
              {project.headline}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#C7BDD5]">
              {project.shortDescription}
            </p>

            <div className="mt-7">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#5227FF] px-6 py-3 text-xs font-semibold text-[#F5F1FA] transition-colors hover:bg-[#FF9FFC] hover:text-[#100B18]"
              >
                View Live Website
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </header>

          {/* Desktop + Mobile real screenshots */}
          <div className="my-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="overflow-hidden rounded-2xl bg-[#171027]/60 ring-1 ring-white/10 lg:col-span-8">
              <Image
                src={project.desktopImage}
                alt={`${project.name} desktop preview`}
                width={1440}
                height={1000}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl bg-[#171027]/60 ring-1 ring-white/10 lg:col-span-4">
              <Image
                src={project.mobileImage}
                alt={`${project.name} mobile preview`}
                width={390}
                height={844}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="divide-y divide-white/12 border-t border-white/12">
            <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
              <h2 className="text-sm font-medium text-[#A78BFA] md:col-span-4">
                Overview
              </h2>
              <p className="text-base leading-relaxed text-[#C7BDD5] md:col-span-8">
                {project.overview}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
              <h2 className="text-sm font-medium text-[#A78BFA] md:col-span-4">
                What Web Guru created
              </h2>
              <p className="text-base leading-relaxed text-[#C7BDD5] md:col-span-8">
                {project.solution}
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12">
              <h2 className="text-sm font-medium text-[#A78BFA] md:col-span-4">
                Key highlights
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-8">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[#F5F1FA]/90"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#B497CF]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <ContactSection />
    </>
  );
}
