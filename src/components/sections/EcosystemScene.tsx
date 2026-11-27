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
      className="border-y-[3px] border-ink bg-concrete text-ink"
    >
      <div
        ref={pinStageRef}
        className={`mx-auto max-w-[92rem] px-5 pt-20 pb-10 sm:px-8 lg:px-12 ${
          reducedMotion
            ? "lg:py-20"
            : "lg:flex lg:h-[100dvh] lg:max-h-[100dvh] lg:flex-col lg:justify-between lg:overflow-hidden lg:pt-[clamp(4.85rem,8.5dvh,5.75rem)] lg:pb-[clamp(0.75rem,2.2dvh,1.75rem)]"
        }`}
      >
        {/* Top subtle bar framing the 2-column Neo-Brutalist composition */}
        <div className="mb-4 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-3 lg:mb-[clamp(0.5rem,1.4dvh,1.25rem)] lg:pb-[clamp(0.35rem,1dvh,0.85rem)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-2 border-ink bg-cobalt px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-ivory uppercase shadow-[3px_3px_0px_#151515]">
              [02] · Interactive 3D Showcase
            </span>
            <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
              + Scroll To Orbit Hardware &amp; Explore Six Capabilities +
            </span>
          </div>

          <span className="border-2 border-ink bg-ink px-3 py-1 font-mono text-xs font-bold text-acid uppercase">
            Stage {stage.number} / 06
          </span>
        </div>

        {/* Full-width 2-Column Showcase: Left ~58% 3D Laptop, Right ~42% Animated Editorial Stage */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:my-auto lg:min-h-0 lg:max-h-[680px] lg:flex-1 lg:grid-cols-12 lg:gap-[clamp(1.25rem,2.2vw,2.5rem)]">
          {/* LEFT (~58%): Interactive 3D Laptop Stage */}
          <div className="lg:col-span-7 lg:min-h-0">
            <div
              data-cursor="SCROLL 360°"
              className="wg-grid-pattern relative flex h-[300px] flex-col justify-between overflow-hidden border-[3px] border-ink bg-ivory shadow-[8px_8px_0px_#151515] sm:h-[360px] lg:h-full lg:min-h-0"
            >
              {/* Top left / right calibration annotations */}
              <div className="pointer-events-none relative z-10 flex items-center justify-between px-4 pt-3.5 font-mono text-[10px] font-bold tracking-[0.12em] text-ink uppercase">
                <span className="border border-ink bg-acid px-2 py-0.5">
                  {"+ CAM // ORBIT SYNC"}
                </span>
                <span className="border border-ink bg-concrete px-2 py-0.5">
                  STAGE {stage.number} PERSPECTIVE
                </span>
              </div>

              {/* Three.js Canvas Mounted Cleanly Inside Stage */}
              <div className="absolute inset-0">
                <Laptop3DStage
                  progressRef={laptopProgressRef}
                  activeStage={activeStage}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Bottom corner hardware specs strip */}
              <div className="pointer-events-none relative z-10 flex items-center justify-between border-t-2 border-ink bg-ink px-4 py-2 font-mono text-[10px] font-bold tracking-[0.1em] text-ivory uppercase">
                <span>One Partner · Full Digital Stack</span>
                <span className="text-acid">
                  {`Stage ${stage.number} // ${stage.label}`}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT (~42%): Six-Stage Animated Service Story + Progress Indicator */}
          <div className="flex flex-col justify-between border-[3px] border-ink bg-ivory p-5 shadow-[8px_8px_0px_#3155F5] sm:p-6 lg:col-span-5 lg:h-full lg:min-h-0 lg:p-[clamp(1rem,2.1dvh,1.75rem)]">
            {/* Integrated Stage Progress Indicator */}
            <div className="shrink-0 border-b-2 border-ink pb-[clamp(0.5rem,1.3dvh,1rem)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-extrabold tracking-[0.1em] text-ink uppercase">
                  {stage.number} / 06
                </span>

                <div
                  role="tablist"
                  aria-label="3D service showcase stages"
                  className="flex items-center gap-1.5"
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
                        className={`border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold transition-colors ${
                          active
                            ? "bg-cobalt text-ivory shadow-[2px_2px_0px_#151515]"
                            : "bg-concrete text-ink hover:bg-acid"
                        }`}
                      >
                        {item.number}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clean progress bar synced to active stage progression */}
              <div className="mt-2.5 h-2 w-full border border-ink bg-concrete p-[1px]">
                <div
                  className="h-full bg-orange transition-all duration-300"
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
                    <span
                      className={`inline-block border-2 border-ink px-2.5 py-0.5 font-mono text-[10px] font-extrabold tracking-[0.1em] uppercase shadow-[2px_2px_0px_#151515] ${stage.accentBg}`}
                    >
                      STAGE {stage.number} — {stage.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-[clamp(1.65rem,2.8dvh,2.25rem)] leading-none font-extrabold text-ink/15"
                    >
                      {stage.number}
                    </span>
                  </div>

                  <motion.h2
                    id="laptop-showcase-heading"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.04 }}
                    className="font-display text-[clamp(1.2rem,2.05vw,1.875rem)] leading-[1.06] font-extrabold tracking-[-0.025em] text-ink uppercase"
                  >
                    {stage.headline}
                  </motion.h2>

                  <motion.p
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: 0.08 }}
                    className="text-[clamp(0.8125rem,1.3dvh,0.95rem)] leading-snug text-slate"
                  >
                    {stage.description}
                  </motion.p>

                  {/* Progressive deliverable checklist */}
                  <ul className="space-y-[clamp(0.22rem,0.75dvh,0.5rem)] border-t-2 border-ink pt-[clamp(0.45rem,1.15dvh,0.9rem)]">
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
                        className="flex items-start gap-2 text-[clamp(0.75rem,1.25dvh,0.875rem)] leading-snug font-semibold text-ink"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cobalt"
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
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t-2 border-ink pt-[clamp(0.5rem,1.3dvh,1.1rem)]">
              <Link
                href={stage.serviceAnchor}
                data-cursor="SCOPE"
                className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-acid px-4 py-2 font-mono text-xs font-extrabold text-ink uppercase hover:bg-cobalt hover:text-ivory"
              >
                Explore Discipline
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/contact?service=${encodeURIComponent(stage.serviceTitle)}`}
                className="font-mono text-xs font-bold text-cobalt underline decoration-2 underline-offset-4 hover:text-orange"
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
