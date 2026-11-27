"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { TRUST_PILLARS } from "@/data/whyWebGuru";

/** Presents Web Guru's core positioning using scroll-linked typographic contrast and editorial pillar rows. */
export function ValuePropSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle horizontal editorial shift tied naturally to vertical scrolling.
  const driftX = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section
      id="positioning"
      ref={sectionRef}
      aria-labelledby="value-prop-heading"
      className="relative overflow-hidden border-b border-rule bg-linen"
    >
      {/* Subtle oversized background typographic watermark driven gently by scroll */}
      <motion.div
        aria-hidden="true"
        style={shouldReduceMotion ? undefined : { x: driftX }}
        className="pointer-events-none absolute -top-6 right-0 left-0 select-none text-center font-display text-[8rem] leading-none font-extrabold tracking-tighter text-ink/[0.03] uppercase sm:text-[13rem]"
      >
        ONE PARTNER
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left sticky manifesto column */}
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
              WG / 01 — Positioning
            </span>

            <MaskedText
              as="h2"
              id="value-prop-heading"
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
              lines={[
                "One dependable",
                <span key="vp-line2">
                  team instead of{" "}
                  <span className="font-serif font-normal italic text-accent">
                    five
                  </span>
                </span>,
                "separate providers.",
              ]}
            />

            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                Growing online slows down when your web designer, SEO contact,
                social freelancer, and IT person never communicate. Web Guru
                connects every layer from day one—and stays with you after launch.
              </p>
            </Reveal>
          </div>

          {/* Right structured architectural pillars */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-rule border-y border-rule bg-paper/70 px-6 sm:px-8">
              {TRUST_PILLARS.map((pillar, index) => (
                <Reveal key={pillar.code} delay={index * 0.06}>
                  <article className="group grid grid-cols-1 gap-3 py-7 transition-colors sm:grid-cols-12 sm:gap-6 sm:py-8">
                    <div className="sm:col-span-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-linen font-mono text-xs font-medium text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
                        {pillar.code}
                      </span>
                    </div>
                    <div className="sm:col-span-10">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate sm:text-base">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
