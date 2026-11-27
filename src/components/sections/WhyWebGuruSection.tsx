"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { WHY_WEB_GURU_POINTS } from "@/data/whyWebGuru";

/** Presents Web Guru's practical advantages and interactive vendor comparison in Neo-Brutalist color blocks. */
export function WhyWebGuruSection() {
  const [viewMode, setViewMode] = useState<"partner" | "fragmented">("partner");

  return (
    <section
      aria-labelledby="why-heading"
      className="border-b-[3px] border-ink bg-ivory"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-block border-2 border-ink bg-cobalt px-2.5 py-0.5 font-mono text-xs font-bold tracking-[0.1em] text-ivory uppercase">
              WG / 05 — Why Web Guru
            </span>
            <MaskedText
              as="h2"
              id="why-heading"
              className="mt-4 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ink uppercase sm:text-4xl"
              lines={[
                "Practical digital craft",
                <span key="why-l2">
                  built for businesses that{" "}
                  <span className="font-serif font-normal lowercase italic text-orange">
                    value clarity.
                  </span>
                </span>,
              ]}
            />

            <Reveal delay={0.08}>
              <p className="mt-4 text-base leading-relaxed text-slate">
                We are not a distant corporate IT vendor, and we don&apos;t ship
                a site and vanish. Every business we partner with gets one
                focused team committed to practical results.
              </p>

              <div className="mt-8 border-[3px] border-ink bg-concrete p-5 shadow-[6px_6px_0px_#151515]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-3">
                  <span className="font-mono text-[10px] font-bold tracking-[0.08em] text-ink uppercase">
                    Operating Model Comparison
                  </span>
                  <div className="inline-flex border-2 border-ink bg-ivory p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setViewMode("partner")}
                      aria-pressed={viewMode === "partner"}
                      className={`px-3 py-1 font-mono font-bold uppercase transition-colors ${
                        viewMode === "partner"
                          ? "bg-cobalt text-ivory"
                          : "text-ink hover:bg-acid"
                      }`}
                    >
                      With Web Guru
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("fragmented")}
                      aria-pressed={viewMode === "fragmented"}
                      className={`px-3 py-1 font-mono font-bold uppercase transition-colors ${
                        viewMode === "fragmented"
                          ? "bg-orange text-ivory"
                          : "text-ink hover:bg-acid"
                      }`}
                    >
                      Separate Vendors
                    </button>
                  </div>
                </div>

                {viewMode === "partner" ? (
                  <div className="mt-4 space-y-2 border-2 border-ink bg-ivory p-4 text-sm text-ink">
                    <p className="font-display font-extrabold uppercase">
                      One coordinated 4-member agency
                    </p>
                    <p className="text-xs leading-relaxed text-slate">
                      Your Google profile, custom website, workflow app, social
                      content, NFC review cards, domain, and technical support
                      all share one context and one direct conversation.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2 border-2 border-ink bg-ink p-4 text-sm text-ivory">
                    <p className="font-display font-extrabold text-acid uppercase">
                      Disconnected freelancers &amp; finger-pointing
                    </p>
                    <p className="text-xs leading-relaxed text-ivory/80">
                      Separate bills, clashing design styles, slow hosting
                      handoffs, and nobody owning ongoing updates when something
                      breaks on launch week.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-7">
                <Link
                  href="/contact"
                  className="wg-brutal-btn inline-flex items-center gap-1.5 border-2 border-ink bg-acid px-4 py-2 font-mono text-xs font-bold tracking-[0.08em] text-ink uppercase hover:bg-orange hover:text-ivory"
                >
                  Start With One Partner
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y-2 divide-ink border-[3px] border-ink bg-concrete shadow-[8px_8px_0px_#3155F5]">
              {WHY_WEB_GURU_POINTS.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.05}>
                  <div className="group bg-ivory p-6 transition-colors hover:bg-acid/30 sm:p-7">
                    <div className="flex items-baseline gap-3">
                      <span className="border border-ink bg-acid px-2 py-0.5 font-mono text-xs font-extrabold text-ink transition-transform group-hover:translate-x-0.5">
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-xl font-extrabold tracking-tight text-ink uppercase">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 pl-9 text-sm leading-relaxed text-slate sm:text-base">
                      {point.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
