"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { ServiceDemonstration } from "@/components/visuals/ServiceDemonstration";
import { SERVICE_CATEGORIES } from "@/data/services";

/** Renders a sticky-scroll 6-chapter Services showcase on desktop and interactive switcher on mobile. */
export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  // Automatically highlight whichever service chapter is centered in view while scrolling on desktop.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapterRefs.current.forEach((chapterElement, index) => {
      if (!chapterElement) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          }
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0.01,
        }
      );

      observer.observe(chapterElement);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  /** Scrolls smoothly to a chosen service chapter on desktop and selects it immediately. */
  function handleSelectChapter(index: number) {
    setActiveIndex(index);
    const target = chapterRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const activeService = SERVICE_CATEGORIES[activeIndex];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-rule bg-paper"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col justify-between gap-6 border-b border-rule pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
              WG / 02 — Services Ecosystem
            </span>
            <MaskedText
              as="h2"
              id="services-heading"
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
              lines={[
                "Six connected disciplines",
                <span key="svc-l2">
                  built to help you{" "}
                  <span className="font-serif font-normal italic text-accent">
                    grow and manage
                  </span>
                </span>,
                "everything online.",
              ]}
            />
          </div>

          <Link
            href="/services"
            className="wg-link-underline inline-flex w-fit items-center gap-1.5 font-mono text-xs font-medium tracking-[0.08em] text-ink uppercase hover:text-accent"
          >
            Full Services Directory
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </div>

        {/* Desktop sticky-scroll showcase */}
        <div className="mt-12 hidden grid-cols-12 gap-10 lg:grid">
          {/* Left Sticky Demonstration Stage */}
          <div className="lg:sticky lg:top-24 lg:col-span-6 lg:self-start">
            {/* Quick index selector pills */}
            <div
              role="tablist"
              aria-label="Service category quick navigation"
              className="mb-4 flex flex-wrap gap-2"
            >
              {SERVICE_CATEGORIES.map((service, index) => {
                const isSelected = index === activeIndex;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectChapter(index)}
                    className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                      isSelected
                        ? "border-ink bg-ink text-paper"
                        : "border-rule bg-linen text-slate hover:border-ink hover:text-ink"
                    }`}
                  >
                    {service.number} · {service.shortTitle}
                  </button>
                );
              })}
            </div>

            {/* Sticky oversized counter & active demonstration */}
            <div className="border border-rule bg-paper p-6">
              <div className="mb-4 flex items-end justify-between border-b border-rule pb-4">
                <div>
                  <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                    Active Discipline
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink">
                    {activeService.title}
                  </h3>
                </div>
                <span className="font-display text-4xl leading-none font-bold text-ink/15">
                  {activeService.number}
                </span>
              </div>

              <ServiceDemonstration kind={activeService.diagramKind} />

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-rule pt-4">
                <p className="text-xs text-slate">
                  <strong className="font-semibold text-ink">Ideal for: </strong>
                  {activeService.idealFor}
                </p>
                <Link
                  href={`/contact?service=${encodeURIComponent(activeService.title)}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-accent"
                >
                  Enquire
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Scrolling 6-Chapter Service Narrative */}
          <div className="divide-y divide-rule border-y border-rule lg:col-span-6">
            {SERVICE_CATEGORIES.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={service.id}
                  ref={(element) => {
                    chapterRefs.current[index] = element;
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`py-10 transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-65 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium tracking-[0.08em] text-accent uppercase">
                      [{service.number}] · {service.shortTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="font-mono text-[11px] text-slate underline-offset-4 hover:text-ink hover:underline"
                    >
                      {isActive ? "Viewing Demo" : "Preview Demo"}
                    </button>
                  </div>

                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {service.summary}
                  </p>

                  <p className="mt-4 border-l-2 border-accent bg-linen px-4 py-3 text-sm font-medium text-ink">
                    {service.businessOutcome}
                  </p>

                  <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-start gap-2 text-sm text-ink/90"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet intentional touch-first explorer */}
        <div className="mt-8 lg:hidden">
          <div
            role="tablist"
            aria-label="Select a service category"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {SERVICE_CATEGORIES.map((service, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(index)}
                  className={`border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-linen text-ink"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      isSelected ? "text-accent" : "text-slate"
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="mt-1 block text-xs font-semibold leading-snug">
                    {service.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-5 border border-rule bg-paper p-5">
            <div>
              <span className="font-mono text-xs text-accent uppercase">
                {activeService.number} — {activeService.shortTitle}
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                {activeService.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {activeService.summary}
              </p>
            </div>

            <ServiceDemonstration kind={activeService.diagramKind} />

            <ul className="space-y-2">
              {activeService.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-ink/90"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/contact?service=${encodeURIComponent(activeService.title)}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-paper"
            >
              Enquire About This Service
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
