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

const SERVICE_ACCENTS = [
  "bg-cobalt text-ivory border-ink shadow-[6px_6px_0px_#151515]",
  "bg-ivory text-ink border-ink shadow-[6px_6px_0px_#F0522B]",
  "bg-ink text-ivory border-ink shadow-[6px_6px_0px_#3155F5]",
  "bg-acid text-ink border-ink shadow-[6px_6px_0px_#151515]",
  "bg-ivory text-ink border-ink shadow-[6px_6px_0px_#3155F5]",
  "bg-orange text-ivory border-ink shadow-[6px_6px_0px_#151515]",
];

/** Renders the Neo-Brutalist Services directory page showcasing all six service pillars with preserved demonstrations. */
export default function ServicesPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <span className="inline-block border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
            Services Directory · 01 — 06
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] text-ink uppercase sm:text-6xl">
            Six connected disciplines built to{" "}
            <span className="font-serif font-normal lowercase italic text-cobalt underline decoration-orange decoration-4 underline-offset-4">
              simplify
            </span>{" "}
            your online growth.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            Whether you need to fix your Google Maps presence, redesign a dated
            website, automate workflows with a custom app, or put NFC review
            cards on your counter, every piece works smoothly under one partner.
          </p>

          <nav
            aria-label="Service category anchors"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {SERVICE_CATEGORIES.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-concrete px-3.5 py-2 font-mono text-xs font-bold text-ink uppercase hover:bg-acid"
              >
                <span className="bg-ink px-1.5 py-0.5 text-acid">
                  {service.number}
                </span>
                <span>{service.shortTitle}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-b-[3px] border-ink bg-concrete">
        <div className="mx-auto max-w-7xl divide-y-[3px] divide-ink px-5 sm:px-8 lg:px-10">
          {SERVICE_CATEGORIES.map((service, index) => {
            const boxStyle = SERVICE_ACCENTS[index % SERVICE_ACCENTS.length];
            const isDarkBox = index === 0 || index === 2 || index === 5;

            return (
              <Reveal key={service.id} delay={0.04}>
                <article
                  id={service.id}
                  className="scroll-mt-24 grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:py-20"
                >
                  <div className="lg:col-span-5">
                    <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                      <span className="bg-ink px-2.5 py-0.5 font-mono text-xs font-bold tracking-[0.1em] text-acid uppercase">
                        Service {service.number}
                      </span>
                      <span className="font-mono text-xs font-bold text-ink uppercase">
                        {service.shortTitle}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink uppercase">
                      {service.title}
                    </h2>

                    <p className="mt-3 text-base leading-relaxed text-ink/85">
                      {service.summary}
                    </p>

                    <div className="mt-6">
                      <ServiceDemonstration kind={service.diagramKind} />
                    </div>
                  </div>

                  <div
                    className={`flex flex-col justify-between border-[3px] p-6 sm:p-8 lg:col-span-7 ${boxStyle}`}
                  >
                    <div>
                      <div
                        className={`border-2 p-4 ${
                          isDarkBox
                            ? "border-ivory bg-ink/85 text-ivory"
                            : "border-ink bg-concrete text-ink"
                        }`}
                      >
                        <p
                          className={`font-mono text-[11px] font-bold tracking-[0.08em] uppercase ${
                            isDarkBox ? "text-acid" : "text-cobalt"
                          }`}
                        >
                          Practical Business Value
                        </p>
                        <p className="mt-1 text-sm font-semibold sm:text-base">
                          {service.businessOutcome}
                        </p>
                      </div>

                      <p className="mt-7 mb-4 font-mono text-xs font-bold tracking-[0.08em] uppercase opacity-85">
                        What Is Included ({index + 1} of 6)
                      </p>
                      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed"
                          >
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                isDarkBox ? "text-acid" : "text-orange"
                              }`}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-current/25 pt-5">
                      <p className="max-w-sm text-xs opacity-90">
                        <strong className="font-bold">Best suited for: </strong>
                        {service.idealFor}
                      </p>

                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className={`wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink px-5 py-2.5 font-mono text-xs font-bold uppercase ${
                          isDarkBox
                            ? "bg-acid text-ink"
                            : "bg-ink text-ivory hover:bg-cobalt"
                        }`}
                      >
                        Request This Service
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
