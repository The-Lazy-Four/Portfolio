import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServiceDemonstration } from "@/components/visuals/ServiceDemonstration";
import { SERVICE_CATEGORIES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Web Guru's six service categories: Google Business Profile & Local SEO, Website Design & Development, Application Development, Social Media Management, NFC & QR Review Solutions, and Complete Technical Support.",
  alternates: {
    canonical: "/services",
  },
};

/** Renders the dedicated Services index page detailing all six Web Guru service categories and deliverables. */
export default function ServicesPage() {
  return (
    <>
      {/* Editorial page header */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
            Services Directory · 01 — 06
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-6xl">
            Six connected disciplines built to{" "}
            <span className="font-serif font-normal italic text-accent">
              simplify
            </span>{" "}
            your online growth.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            Whether you need to fix your Google Maps presence, redesign a dated
            website, automate workflows with a custom app, or put NFC review
            cards on your counter, every piece works smoothly under one partner.
          </p>

          {/* Quick jump links */}
          <nav
            aria-label="Service category anchors"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {SERVICE_CATEGORIES.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="inline-flex items-center gap-2 border border-rule bg-linen px-3.5 py-2 font-mono text-xs text-ink transition-colors hover:border-ink hover:bg-stone"
              >
                <span className="text-accent">{service.number}</span>
                <span>{service.shortTitle}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Alternating structured category breakdowns */}
      <section className="border-b border-rule bg-linen">
        <div className="mx-auto max-w-7xl divide-y divide-rule px-5 sm:px-8 lg:px-10">
          {SERVICE_CATEGORIES.map((service, index) => (
            <Reveal key={service.id} delay={0.04}>
              <article
                id={service.id}
                className="scroll-mt-24 grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:py-20"
              >
                {/* Left summary & diagram */}
                <div className="lg:col-span-5">
                  <div className="flex items-center justify-between border-b border-rule pb-3">
                    <span className="font-mono text-xs font-medium tracking-[0.1em] text-accent uppercase">
                      Service {service.number}
                    </span>
                    <span className="font-mono text-xs text-slate">
                      {service.shortTitle}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">
                    {service.title}
                  </h2>

                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {service.summary}
                  </p>

                  <div className="mt-6">
                    <ServiceDemonstration kind={service.diagramKind} />
                  </div>
                </div>

                {/* Right deliverables & business outcome */}
                <div className="flex flex-col justify-between border border-rule bg-paper p-6 sm:p-8 lg:col-span-7">
                  <div>
                    <div className="border-l-2 border-accent bg-linen px-4 py-3">
                      <p className="font-mono text-[11px] tracking-[0.08em] text-slate uppercase">
                        Practical Business Value
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink sm:text-base">
                        {service.businessOutcome}
                      </p>
                    </div>

                    <p className="mt-7 mb-4 font-mono text-xs tracking-[0.08em] text-slate uppercase">
                      What Is Included ({index + 1} of 6)
                    </p>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                    <p className="max-w-sm text-xs text-slate">
                      <strong className="font-semibold text-ink">
                        Best suited for:{" "}
                      </strong>
                      {service.idealFor}
                    </p>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                    >
                      Request This Service
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
