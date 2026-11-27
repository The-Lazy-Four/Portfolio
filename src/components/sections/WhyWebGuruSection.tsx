"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { WHY_WEB_GURU_POINTS } from "@/data/whyWebGuru";

/** Presents Web Guru's practical advantages and interactive vendor comparison without exaggerated claims. */
export function WhyWebGuruSection() {
  const [viewMode, setViewMode] = useState<"partner" | "fragmented">("partner");

  return (
    <section
      aria-labelledby="why-heading"
      className="border-b border-rule bg-linen"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left editorial summary + interactive model comparison */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
              WG / 05 — Why Web Guru
            </span>
            <MaskedText
              as="h2"
              id="why-heading"
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-4xl"
              lines={[
                "Practical digital craft",
                <span key="why-l2">
                  built for businesses that{" "}
                  <span className="font-serif font-normal italic text-accent">
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

              {/* Interactive comparison switcher */}
              <div className="mt-8 border border-rule bg-paper p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
                  <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
                    Operating Model Comparison
                  </span>
                  <div className="inline-flex rounded-full border border-rule bg-linen p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setViewMode("partner")}
                      aria-pressed={viewMode === "partner"}
                      className={`rounded-full px-3 py-1 font-medium transition-colors ${
                        viewMode === "partner"
                          ? "bg-ink text-paper"
                          : "text-slate hover:text-ink"
                      }`}
                    >
                      With Web Guru
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("fragmented")}
                      aria-pressed={viewMode === "fragmented"}
                      className={`rounded-full px-3 py-1 font-medium transition-colors ${
                        viewMode === "fragmented"
                          ? "bg-accent text-paper"
                          : "text-slate hover:text-ink"
                      }`}
                    >
                      Separate Vendors
                    </button>
                  </div>
                </div>

                {viewMode === "partner" ? (
                  <div className="mt-4 space-y-2 text-sm text-ink">
                    <p className="font-semibold">
                      One coordinated 4-member agency
                    </p>
                    <p className="text-xs leading-relaxed text-slate">
                      Your Google profile, custom website, workflow app, social
                      content, NFC review cards, domain, and technical support
                      all share one context and one direct conversation.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-2 text-sm text-ink">
                    <p className="font-semibold text-accent">
                      Disconnected freelancers &amp; finger-pointing
                    </p>
                    <p className="text-xs leading-relaxed text-slate">
                      Separate bills, clashing design styles, slow hosting
                      handoffs, and nobody owning ongoing updates when something
                      breaks on launch week.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-7">
                <Link
                  href="/about"
                  className="wg-link-underline inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-[0.08em] text-ink uppercase hover:text-accent"
                >
                  Meet Our Four-Member Approach
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right 5-point structured differentiator ledger */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-rule border-y border-rule bg-paper px-6 sm:px-8">
              {WHY_WEB_GURU_POINTS.map((point, index) => (
                <Reveal key={point.title} delay={index * 0.05}>
                  <div className="group py-6 sm:py-7">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-2 pl-7 text-sm leading-relaxed text-slate sm:text-base">
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
