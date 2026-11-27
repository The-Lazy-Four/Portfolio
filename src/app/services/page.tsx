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

/** Renders the dark purple editorial Services experience over the global LiquidEther background. */
export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-transparent pt-32 pb-20 text-[#F5F1FA] sm:pt-40 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,11,24,0.65),transparent_65%)]"
        />

        <div className="relative z-10 mx-auto max-w-[92rem] px-6 sm:px-10 lg:px-14">
          <h1 className="max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.75rem)] leading-[1.03] font-bold tracking-[-0.03em] text-[#F5F1FA]">
            Six connected disciplines built to{" "}
            <span className="font-serif font-normal italic text-[#FF9FFC]">
              simplify
            </span>{" "}
            your online growth.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B8ADC9] sm:text-lg">
            Whether you need to fix your Google Maps presence, redesign a dated
            website, automate workflows with a custom app, or put NFC review
            cards on your counter, every piece works smoothly under one partner.
          </p>

          {/* Clean editorial service directory */}
          <nav
            aria-label="Service category anchors"
            className="mt-16 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3"
          >
            {SERVICE_CATEGORIES.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="group flex items-baseline justify-between gap-4 py-5 pr-6 transition-colors sm:border-b sm:border-white/10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-sans text-xs font-medium text-[#B8ADC9]/60 transition-colors group-hover:text-[#FF9FFC]">
                    {service.number}
                  </span>
                  <span className="font-display text-lg font-semibold text-[#F5F1FA] transition-colors group-hover:text-[#FF9FFC]">
                    {service.shortTitle}
                  </span>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[#B8ADC9]/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF9FFC]"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-[#100B18]/45 text-[#F5F1FA]">
        <div className="mx-auto max-w-[92rem] divide-y divide-white/10 px-6 sm:px-10 lg:px-14">
          {SERVICE_CATEGORIES.map((service) => (
            <Reveal key={service.id} delay={0.04}>
              <article
                id={service.id}
                className="scroll-mt-24 grid grid-cols-1 items-start gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2.5 text-xs font-medium text-[#B497CF]">
                    <span>{service.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{service.shortTitle}</span>
                  </div>

                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F5F1FA] sm:text-4xl">
                    {service.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-[#B8ADC9]">
                    {service.summary}
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs font-medium tracking-[0.06em] text-[#B8ADC9]/75 uppercase">
                      What&apos;s included
                    </p>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-[#F5F1FA]/90"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#B497CF]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#5227FF] px-6 py-2.5 font-sans text-xs font-semibold text-[#F5F1FA] transition-colors hover:bg-[#FF9FFC] hover:text-[#100B18]"
                    >
                      Enquire About {service.shortTitle}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#171027]/75 p-4 text-ink shadow-2xl backdrop-blur-md sm:p-6 lg:col-span-7">
                  <ServiceDemonstration kind={service.diagramKind} />
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
