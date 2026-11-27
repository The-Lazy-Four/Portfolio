"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { Laptop3DStage } from "@/components/visuals/Laptop3DStage";

gsap.registerPlugin(ScrollTrigger);

interface LaptopStageSpec {
  number: string;
  label: string;
  headline: string;
  description: string;
  deliverables: string[];
  serviceAnchor: string;
  serviceTitle: string;
  accentBg: string;
}

const LAPTOP_SERVICE_STAGES: LaptopStageSpec[] = [
  {
    number: "01",
    label: "LOCAL VISIBILITY & MAPS",
    headline: "Get discovered where it matters.",
    description:
      "Help potential customers find your business through accurate Google Business Profile information, stronger local search presence, and an optimized Google Maps listing.",
    deliverables: [
      "Google Business Profile setup and optimization.",
      "Business category and information accuracy.",
      "Local SEO improvements.",
      "Google Maps visibility optimization.",
      "Business photos and profile updates.",
      "Review collection and management workflows.",
    ],
    serviceAnchor: "/services#google-business-local-seo",
    serviceTitle: "Google Business Profile & Local SEO",
    accentBg: "bg-acid text-ink",
  },
  {
    number: "02",
    label: "WEBSITES THAT CONVERT",
    headline: "Turn your online presence into your strongest first impression.",
    description:
      "We design and develop professional websites that communicate your brand, showcase your offerings, and help turn visitors into customers.",
    deliverables: [
      "Custom business website design.",
      "Responsive development.",
      "Landing pages.",
      "E-commerce solutions.",
      "Website redesign and optimization.",
      "Ongoing website maintenance.",
    ],
    serviceAnchor: "/services#website-design-development",
    serviceTitle: "Website Design & Development",
    accentBg: "bg-cobalt text-ivory",
  },
  {
    number: "03",
    label: "CUSTOM WEB & MOBILE APPS",
    headline: "Give your business the tools it needs to grow.",
    description:
      "From custom web applications to mobile experiences, we help businesses implement digital tools that simplify operations and serve customers better.",
    deliverables: [
      "Custom web applications.",
      "Mobile application development.",
      "Business workflow solutions.",
      "Application improvements.",
      "Application maintenance.",
      "Technical troubleshooting.",
    ],
    serviceAnchor: "/services#application-development-management",
    serviceTitle: "Application Development & Management",
    accentBg: "bg-orange text-ivory",
  },
  {
    number: "04",
    label: "CONSISTENT BRAND PRESENCE",
    headline: "Stay relevant. Stay recognizable.",
    description:
      "Maintain a professional and consistent brand identity across your social channels with planned content, creative assets, and reliable publishing.",
    deliverables: [
      "Social media account optimization.",
      "Content strategy and planning.",
      "Editorial calendars.",
      "Creative post design.",
      "Content creation and publishing.",
      "Social media management.",
    ],
    serviceAnchor: "/services#social-media-management",
    serviceTitle: "Social Media Management",
    accentBg: "bg-acid text-ink",
  },
  {
    number: "05",
    label: "PHYSICAL REVIEW TOOLS",
    headline: "Turn real-world interactions into digital trust.",
    description:
      "Make it easier for customers to reach your Google review page through custom-branded NFC and QR solutions designed for physical businesses.",
    deliverables: [
      "Custom NFC review cards.",
      "QR review cards.",
      "Custom-branded designs.",
      "Review link configuration.",
      "QR-based customer feedback access.",
      "Installation and setup assistance.",
    ],
    serviceAnchor: "/services#nfc-qr-review-solutions",
    serviceTitle: "NFC & QR Review Solutions",
    accentBg: "bg-cobalt text-ivory",
  },
  {
    number: "06",
    label: "DEPENDABLE TECH CARE",
    headline: "Your digital presence, continuously supported.",
    description:
      "We stay involved beyond implementation, helping businesses maintain their websites, applications, and digital infrastructure.",
    deliverables: [
      "Website maintenance.",
      "Application maintenance.",
      "Domain and hosting assistance.",
      "Technical troubleshooting.",
      "Business email setup assistance.",
      "Ongoing technical consultation.",
    ],
    serviceAnchor: "/services#complete-technical-support",
    serviceTitle: "Complete Technical Support",
    accentBg: "bg-orange text-ivory",
  },
];

/** Renders the pinned scroll-driven 3D laptop showcase on the left and six-stage animated editorial descriptions on the right. */
export function EcosystemScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinStageRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const laptopProgressRef = useRef<number>(0);

  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [activeStage, setActiveStage] = useState(0);

  const stage = LAPTOP_SERVICE_STAGES[activeStage] || LAPTOP_SERVICE_STAGES[0];

  // Configure desktop GSAP pinned 6-stage scrub and responsive mobile scroll progress cleanly.
  useEffect(() => {
    const section = sectionRef.current;
    const pinStage = pinStageRef.current;
    if (!section || !pinStage) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(1),
        onEnterBack: () => setActiveSceneIndex(1),
      });

      if (reducedMotion) {
        return;
      }

      // Desktop pinned experience: keep 3D laptop fixed on left while scrolling cleanly through 01..06
      mm.add("(min-width: 1024px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: pinStage,
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          start: "top top",
          end: "+=3200",
          onUpdate: (self) => {
            laptopProgressRef.current = self.progress;
            const nextStage = Math.min(
              LAPTOP_SERVICE_STAGES.length - 1,
              Math.max(
                0,
                Math.floor(self.progress * LAPTOP_SERVICE_STAGES.length)
              )
            );
            setActiveStage((prev) => (prev === nextStage ? prev : nextStage));
          },
        });
        scrollTriggerRef.current = trigger;
        return () => {
          scrollTriggerRef.current = null;
        };
      });

      // Mobile / Tablet natural flow: keep Stage 01 visible at entry and scrub smoothly on downward scroll
      mm.add("(max-width: 1023px)", () => {
        const mobileTrigger = ScrollTrigger.create({
          trigger: section,
          scrub: true,
          start: "top 15%",
          end: "bottom 35%",
          onUpdate: (self) => {
            laptopProgressRef.current = self.progress;
            const nextStage = Math.min(
              LAPTOP_SERVICE_STAGES.length - 1,
              Math.max(
                0,
                Math.floor(self.progress * LAPTOP_SERVICE_STAGES.length)
              )
            );
            setActiveStage((prev) => (prev === nextStage ? prev : nextStage));
          },
        });
        scrollTriggerRef.current = mobileTrigger;
        return () => {
          scrollTriggerRef.current = null;
        };
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [reducedMotion, setActiveSceneIndex]);

  /** Scrolls directly to a chosen stage milestone or updates immediately under reduced motion. */
  function jumpToStage(index: number) {
    setActiveStage(index);
    const targetProgress = (index + 0.08) / LAPTOP_SERVICE_STAGES.length;
    laptopProgressRef.current = targetProgress;

    const st = scrollTriggerRef.current;
    if (st && window.innerWidth >= 1024 && !reducedMotion) {
      const targetY = st.start + targetProgress * (st.end - st.start);
      scrollToTarget(targetY);
    }
  }

  return (
    <section
      id="scene-ecosystem"
      ref={sectionRef}
      aria-labelledby="laptop-showcase-heading"
      className="relative overflow-hidden border-t border-ivory/10 bg-[#05091B]/25 text-ivory"
    >

      <div
        ref={pinStageRef}
        className={`relative z-10 mx-auto max-w-[92rem] px-6 pt-20 pb-10 sm:px-10 lg:px-14 ${
          reducedMotion
            ? "lg:py-20"
            : "lg:flex lg:h-[100dvh] lg:max-h-[100dvh] lg:flex-col lg:justify-between lg:overflow-hidden lg:pt-[clamp(4.85rem,8.5dvh,5.75rem)] lg:pb-[clamp(0.75rem,2.2dvh,1.75rem)]"
        }`}
      >
        {/* Minimal editorial chapter header */}
        <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-ivory/10 pb-3 lg:mb-[clamp(0.5rem,1.4dvh,1.25rem)] lg:pb-[clamp(0.35rem,1dvh,0.85rem)]">
          <span className="font-sans text-xs font-medium tracking-[0.06em] text-ivory/70">
            Capabilities in motion
          </span>

          <span className="font-mono text-xs tracking-[0.12em] text-ivory/60">
            {stage.number} / 06
          </span>
        </div>

        {/* Open 2-Column Composition: Left ~58% Floating 3D Laptop, Right ~42% Editorial Narrative */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:my-auto lg:min-h-0 lg:max-h-[680px] lg:flex-1 lg:grid-cols-12 lg:gap-[clamp(1.5rem,3vw,3.5rem)]">
          {/* LEFT (~58%): Open Atmospheric 3D Laptop Stage */}
          <div className="lg:col-span-7 lg:min-h-0">
            <div
              data-cursor="SCROLL 360°"
              className="relative flex h-[300px] flex-col justify-between overflow-hidden sm:h-[360px] lg:h-full lg:min-h-0"
            >
              {/* Subtle radial cobalt studio glow behind floating hardware */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,85,245,0.22),transparent_68%)]"
              />

              {/* Three.js Canvas Mounted Cleanly Inside Open Stage */}
              <div className="relative h-full w-full">
                <Laptop3DStage
                  progressRef={laptopProgressRef}
                  activeStage={activeStage}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </div>

          {/* RIGHT (~42%): Open Editorial Narrative + Minimal Progress Indicator */}
          <div className="flex flex-col justify-between py-2 lg:col-span-5 lg:h-full lg:min-h-0 lg:py-4">
            {/* Integrated Stage Progress Indicator */}
            <div className="shrink-0 border-b border-ivory/10 pb-[clamp(0.5rem,1.3dvh,1rem)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs tracking-[0.14em] text-ivory/70 uppercase">
                  {stage.number} / 06
                </span>

                <div
                  role="tablist"
                  aria-label="3D service showcase stages"
                  className="flex items-center gap-2"
                >
                  {LAPTOP_SERVICE_STAGES.map((item, idx) => {
                    const active = idx === activeStage;
                    return (
                      <button
                        key={item.number}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-label={`View stage ${item.number}: ${item.label}`}
                        onClick={() => jumpToStage(idx)}
                        className={`px-1.5 py-0.5 font-mono text-[11px] transition-colors ${
                          active
                            ? "border-b border-acid font-bold text-acid"
                            : "text-ivory/45 hover:text-ivory"
                        }`}
                      >
                        {item.number}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hairline progress bar synced to active stage progression */}
              <div className="mt-3 h-[2px] w-full bg-ivory/10">
                <div
                  className="h-full bg-acid transition-all duration-300"
                  style={{
                    width: `${((activeStage + 1) / LAPTOP_SERVICE_STAGES.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Transitioning Service Stage Content Container */}
            <div className="relative my-[clamp(0.5rem,1.4dvh,1.25rem)] flex min-h-0 flex-1 flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.number}
                  initial={
                    reducedMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 16,
                          filter: "blur(4px)",
                          clipPath: "inset(0% 0% 18% 0%)",
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    clipPath: "inset(0% 0% 0% 0%)",
                  }}
                  exit={
                    reducedMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: -12,
                          filter: "blur(3px)",
                        }
                  }
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-[clamp(0.45rem,1.15dvh,0.9rem)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-acid uppercase">
                      Stage {stage.number} — {stage.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-[clamp(1.65rem,2.8dvh,2.25rem)] leading-none font-extrabold text-ivory/10"
                    >
                      {stage.number}
                    </span>
                  </div>

                  <motion.h2
                    id="laptop-showcase-heading"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.04 }}
                    className="font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.06] font-extrabold tracking-[-0.025em] text-ivory uppercase"
                  >
                    {stage.headline}
                  </motion.h2>

                  <motion.p
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.08 }}
                    className="text-[clamp(0.85rem,1.35dvh,1rem)] leading-relaxed text-ivory/75"
                  >
                    {stage.description}
                  </motion.p>

                  {/* Progressive deliverable checklist */}
                  <ul className="space-y-[clamp(0.25rem,0.75dvh,0.5rem)] border-t border-ivory/10 pt-[clamp(0.5rem,1.2dvh,0.9rem)]">
                    {stage.deliverables.map((item, itemIdx) => (
                      <motion.li
                        key={item}
                        initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.22,
                          delay: reducedMotion ? 0 : 0.1 + itemIdx * 0.032,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-2.5 text-[clamp(0.78rem,1.25dvh,0.875rem)] leading-snug text-ivory/85"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-acid"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom consistent action bar */}
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-[clamp(0.6rem,1.3dvh,1.1rem)]">
              <Link
                href={stage.serviceAnchor}
                data-cursor="SCOPE"
                className="inline-flex items-center gap-2 rounded-full bg-acid px-5 py-2 font-mono text-xs font-bold text-ink uppercase transition-colors hover:bg-orange hover:text-ivory"
              >
                Explore Discipline
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/contact?service=${encodeURIComponent(stage.serviceTitle)}`}
                className="font-mono text-xs font-semibold text-ivory/80 underline decoration-acid/50 underline-offset-4 transition-colors hover:text-acid"
              >
                Enquire Stage {stage.number} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
