"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { VERIFIED_TEAM_MEMBERS } from "@/data/team";

gsap.registerPlugin(ScrollTrigger);

interface StudioCinemaSceneProps {
  showAboutLink?: boolean;
}

/** Renders a clean geometric LinkedIn mark for external team member links. */
function LinkedInGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

/** Renders Section 04 (The People Behind Web Guru) as a scroll-driven portrait showcase with four circular member selectors. */
export function StudioCinemaScene({
  showAboutLink = true,
}: StudioCinemaSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const { reducedMotion, setActiveSceneIndex, scrollToTarget } =
    useCinemaEngine();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMember =
    VERIFIED_TEAM_MEMBERS[activeIndex] || VERIFIED_TEAM_MEMBERS[0];

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!section || !pinWrapper) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(3),
        onEnterBack: () => setActiveSceneIndex(3),
      });

      if (reducedMotion) return;

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: pinWrapper,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 2.6)}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (VERIFIED_TEAM_MEMBERS.length - 1),
            duration: { min: 0.2, max: 0.45 },
            delay: 0.05,
            ease: "power2.out",
          },
          onUpdate: (self) => {
            const idx = Math.min(
              VERIFIED_TEAM_MEMBERS.length - 1,
              Math.round(self.progress * (VERIFIED_TEAM_MEMBERS.length - 1))
            );
            setActiveIndex((prev) => (prev === idx ? prev : idx));
          },
        });
        scrollTriggerRef.current = st;
        return () => {
          scrollTriggerRef.current = null;
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const st = ScrollTrigger.create({
          trigger: pinWrapper,
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (VERIFIED_TEAM_MEMBERS.length - 1),
            duration: { min: 0.18, max: 0.35 },
            delay: 0.04,
            ease: "power2.out",
          },
          onUpdate: (self) => {
            const idx = Math.min(
              VERIFIED_TEAM_MEMBERS.length - 1,
              Math.round(self.progress * (VERIFIED_TEAM_MEMBERS.length - 1))
            );
            setActiveIndex((prev) => (prev === idx ? prev : idx));
          },
        });
        scrollTriggerRef.current = st;
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

  /** Scrolls the page smoothly to the selected team member's scroll stage. */
  function selectMember(index: number) {
    setActiveIndex(index);
    const st = scrollTriggerRef.current;
    if (st && !reducedMotion) {
      const targetProgress = index / (VERIFIED_TEAM_MEMBERS.length - 1);
      const y = st.start + targetProgress * (st.end - st.start);
      scrollToTarget(y);
    }
  }

  return (
    <section
      id="scene-studio"
      ref={sectionRef}
      aria-labelledby="studio-cinema-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#100B18]/45 text-[#F5F1FA]"
    >
      <div
        ref={pinWrapperRef}
        className={`mx-auto max-w-[92rem] px-5 pt-20 pb-8 sm:px-10 ${
          reducedMotion
            ? "py-16 lg:py-24"
            : "flex min-h-[100dvh] flex-col justify-center lg:px-14 lg:pt-24 lg:pb-12"
        }`}
      >
        {/* Section header */}
        <div className="grid grid-cols-1 gap-4 border-b border-white/10 pb-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <h2
              id="studio-cinema-heading"
              className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-[#F5F1FA]"
            >
              The people behind the{" "}
              <span className="font-serif font-normal italic text-[#FF9FFC]">
                work.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#C7BDD5] sm:text-lg">
              Four people. Different strengths. One shared vision.
            </p>
          </div>
        </div>

        {/* Main Large Portrait Display + Active Member Profile */}
        <div className="mt-6 grid grid-cols-1 items-center gap-5 sm:mt-8 sm:gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-14">
          {/* Large Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-2xl bg-[#171027]/60 sm:max-w-[320px] lg:mx-0 lg:max-w-[400px]">
              {VERIFIED_TEAM_MEMBERS.map((member, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={member.slotNumber}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 ${
                      reducedMotion
                        ? ""
                        : "transition-[opacity,transform] duration-500 ease-out"
                    } ${
                      isActive
                        ? "z-10 scale-100 opacity-100"
                        : "pointer-events-none z-0 scale-[1.03] opacity-0"
                    }`}
                  >
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      loading="eager"
                      sizes="(max-width: 1023px) 360px, 400px"
                      className={member.imageClassName}
                    />
                  </div>
                );
              })}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#100B18]/70 via-transparent to-transparent"
              />
            </div>
          </div>

          {/* Synchronized Profile Information */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeMember.slotNumber}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="space-y-3 sm:space-y-4"
              >
                <p className="text-xs font-medium tabular-nums text-[#A78BFA]">
                  {activeMember.slotNumber} / 04
                </p>

                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#F5F1FA] sm:text-4xl">
                  {activeMember.name}
                </h3>

                <p className="text-sm font-medium text-[#FF9FFC] sm:text-base">
                  {activeMember.role}
                </p>

                <p className="max-w-xl text-base leading-relaxed text-[#C7BDD5] sm:text-lg">
                  {activeMember.focus}
                </p>

                <div className="pt-2">
                  <a
                    href={activeMember.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activeMember.name} on LinkedIn`}
                    className="wg-link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D8C5F2] transition-colors hover:text-[#FF9FFC]"
                  >
                    <LinkedInGlyph />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Four Circular Portrait Selectors + Optional About Link */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row">
          <div
            role="tablist"
            aria-label="Select team member"
            className="flex items-center justify-center gap-4 sm:gap-6"
          >
            {VERIFIED_TEAM_MEMBERS.map((member, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={member.slotNumber}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${member.name}`}
                  onClick={() => selectMember(index)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-full transition-all duration-300 sm:h-16 sm:w-16 ${
                    isActive
                      ? "scale-105 opacity-100 ring-2 ring-[#A78BFA] ring-offset-2 ring-offset-[#100B18] shadow-[0_0_24px_rgba(82,39,255,0.45)]"
                      : "opacity-55 ring-1 ring-white/15 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="64px"
                    className={member.imageClassName}
                  />
                </button>
              );
            })}
          </div>

          {showAboutLink && (
            <Link
              href="/about"
              className="wg-link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D8C5F2] transition-colors hover:text-[#FF9FFC]"
            >
              More about our studio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
