"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MaskedText } from "@/components/motion/MaskedText";
import { HeroEcosystem } from "@/components/visuals/HeroEcosystem";

const AUDIENCE_TYPES = [
  "Small Businesses",
  "Local Shops",
  "Restaurants & Cafes",
  "Startups",
  "Independent Professionals",
  "Service Providers",
];

/** Renders the art-directed Hero section with staged line-by-line typography reveal and interactive 6-node ecosystem. */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative border-b border-rule bg-paper"
    >
      <div className="mx-auto max-w-7xl px-5 pt-8 pb-14 sm:px-8 sm:pt-12 sm:pb-16 lg:px-10 lg:pt-14 lg:pb-20">
        {/* Step 2 of Hero Choreography: Editorial metadata bar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-4"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] text-ink uppercase">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            WG / 00 — One Partner For Your Entire Digital Presence
          </span>
          <span className="font-mono text-xs tracking-[0.08em] text-slate uppercase">
            Four-Member Digital Studio
          </span>
        </motion.div>

        {/* Main asymmetric 12-column hero composition */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left column: Line-by-line masked headline + supporting copy + magnetic CTAs */}
          <div className="lg:col-span-6">
            {/* Step 3: Expressive line-by-line clipped reveal */}
            <MaskedText
              as="h1"
              id="hero-heading"
              trigger="mount"
              baseDelay={0.14}
              lineDelay={0.09}
              className="font-display text-[2.65rem] leading-[1.01] font-bold tracking-[-0.038em] text-ink sm:text-[3.75rem] xl:text-[4.55rem]"
              lines={[
                "Your business",
                <span key="line-better">
                  deserves a{" "}
                  <span className="relative inline-block font-serif font-normal italic text-accent">
                    better
                    <motion.span
                      aria-hidden="true"
                      initial={shouldReduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.48,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ transformOrigin: "left center" }}
                      className="absolute right-0 bottom-[0.08em] left-0 h-[2px] bg-accent/65"
                    />
                  </span>
                </span>,
                "digital presence.",
              ]}
            />

            {/* Step 4: Supporting narrative enters smoothly after heading */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.48,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate sm:text-lg"
            >
              From Google visibility and high-performing websites to custom
              applications, social media management, NFC &amp; QR review tools,
              and ongoing technical support—Web Guru helps businesses build,
              manage, and grow online under one roof.
            </motion.p>

            {/* Step 5: Magnetic conversion CTAs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.48,
                delay: 0.46,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-accent-hover active:scale-[0.98] sm:text-base"
                >
                  Let&apos;s Grow Your Business
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </MagneticButton>

              <Link
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 bg-linen px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-150 hover:border-ink hover:bg-stone sm:text-base"
              >
                Explore Our Services
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* Step 6: Interactive 6-node Web Guru ecosystem visualization */}
          <div className="lg:col-span-6">
            <HeroEcosystem />
          </div>
        </div>

        {/* Bottom audience strip + scroll exploration prompt */}
        <div className="mt-12 border-t border-rule pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <span className="font-mono text-[11px] tracking-[0.1em] text-slate uppercase">
                Built for
              </span>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ink/85 sm:text-sm">
                {AUDIENCE_TYPES.map((audience) => (
                  <li key={audience} className="inline-flex items-center gap-2">
                    <span
                      className="h-1 w-1 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#positioning"
              className="wg-link-underline inline-flex w-fit items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-slate uppercase hover:text-ink"
            >
              Scroll to explore
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
