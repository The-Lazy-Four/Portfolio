"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";

gsap.registerPlugin(ScrollTrigger);

interface CapabilityItem {
  number: string;
  id: string;
  title: string;
  description: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    id: "google-business-local-seo",
    title: "Google Visibility",
    description: "Help local customers find your business.",
  },
  {
    number: "02",
    id: "website-design-development",
    title: "Websites",
    description: "Build a professional online presence.",
  },
  {
    number: "03",
    id: "application-development-management",
    title: "Business Apps",
    description: "Make everyday work easier with useful digital tools.",
  },
  {
    number: "04",
    id: "social-media-management",
    title: "Social Media",
    description: "Keep your brand active and recognizable.",
  },
  {
    number: "05",
    id: "nfc-qr-review-solutions",
    title: "NFC & QR Reviews",
    description: "Make it easier for customers to leave reviews.",
  },
  {
    number: "06",
    id: "complete-technical-support",
    title: "Technical Support",
    description: "Keep your digital presence running smoothly.",
  },
];

/** Renders Section 02 (What We Do) as a single concise editorial overview of Web Guru's six capabilities. */
export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(1),
        onEnterBack: () => setActiveSceneIndex(1),
      });
    }, section);

    return () => ctx.revert();
  }, [setActiveSceneIndex]);

  return (
    <section
      id="scene-what-we-do"
      ref={sectionRef}
      aria-labelledby="what-we-do-heading"
      className="relative border-t border-white/10 bg-[#100B18]/45 py-16 text-[#F5F1FA] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
        {/* Intro copy */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <h2
              id="what-we-do-heading"
              className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-[#F5F1FA]"
            >
              Everything your business needs to{" "}
              <span className="font-serif font-normal italic text-[#FF9FFC]">
                grow online.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#C7BDD5] sm:text-lg">
              From getting discovered on Google to building websites and
              managing your digital presence, we bring everything together under
              one roof.
            </p>
          </div>
        </div>

        {/* Open editorial six-capability list */}
        <div className="mt-12 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:mt-16 md:grid-cols-2 md:divide-y-0">
          {CAPABILITIES.map((item) => (
            <Link
              key={item.id}
              href={`/services#${item.id}`}
              className="group flex items-start justify-between gap-5 py-6 transition-colors hover:bg-white/[0.02] md:border-b md:border-white/10 md:px-4 md:py-7 [&:nth-last-child(-n+2)]:md:border-b-0"
            >
              <div className="flex items-baseline gap-4 sm:gap-5">
                <span className="shrink-0 font-sans text-xs font-medium text-[#A78BFA]">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-[#F5F1FA] transition-colors group-hover:text-[#FF9FFC] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#C7BDD5] sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 text-[#91869F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#FF9FFC]"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        {/* Discreet link to dedicated Services page */}
        <div className="mt-8 flex justify-start sm:mt-10 sm:justify-end">
          <Link
            href="/services"
            className="wg-link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D8C5F2] transition-colors hover:text-[#FF9FFC]"
          >
            Explore all services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
