"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import DepthCarousel from "@/components/visuals/DepthCarousel";
import { VERIFIED_TEAM_MEMBERS } from "@/data/team";

gsap.registerPlugin(ScrollTrigger);

interface StudioCinemaSceneProps {
  showAboutLink?: boolean;
}

const TEAM_ITEMS = VERIFIED_TEAM_MEMBERS.map((member) => ({
  image: member.image,
  alt: `${member.name} — ${member.role}`,
}));

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

/** Renders Section 04 (The People Behind Web Guru) with the 3D DepthCarousel and synchronized member profile details. */
export function StudioCinemaScene({
  showAboutLink = true,
}: StudioCinemaSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, setActiveSceneIndex } = useCinemaEngine();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMember =
    VERIFIED_TEAM_MEMBERS[activeIndex] || VERIFIED_TEAM_MEMBERS[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSceneIndex(3),
        onEnterBack: () => setActiveSceneIndex(3),
      });
    }, section);

    return () => ctx.revert();
  }, [setActiveSceneIndex]);

  return (
    <section
      id="scene-studio"
      ref={sectionRef}
      aria-labelledby="studio-cinema-heading"
      className="relative overflow-hidden border-t border-white/10 bg-[#100B18]/45 py-16 text-[#F5F1FA] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
        {/* Section header */}
        <div className="grid grid-cols-1 gap-5 border-b border-white/10 pb-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <h2
              id="studio-cinema-heading"
              className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-[#F5F1FA]"
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

        {/* Two-column desktop / stacked mobile DepthCarousel + Synchronized Profile */}
        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="h-[400px] w-full sm:h-[440px] lg:h-[480px]">
              <DepthCarousel
                items={TEAM_ITEMS}
                cardWidth={300}
                cardHeight={390}
                radius={12}
                tint="#100B18"
                depth={150}
                spread={65}
                tilt={16}
                tiltDirection="right"
                perspective={1400}
                visibleCards={3}
                falloff={0.14}
                blur={2}
                duration={700}
                ease="power3.out"
                autoplay={false}
                loop={true}
                showControls={true}
                showIndicators={false}
                onChange={(index: number) => setActiveIndex(index)}
              />
            </div>
          </div>

          {/* Synchronized active member details */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.slotNumber}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="space-y-4 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pt-0 lg:pl-10"
              >
                <p className="text-xs font-medium tabular-nums text-[#A78BFA]">
                  {activeMember.slotNumber} / 04
                </p>

                <h3 className="font-display text-2xl font-semibold tracking-tight text-[#F5F1FA] sm:text-3xl">
                  {activeMember.name}
                </h3>

                <p className="text-sm font-medium text-[#FF9FFC] sm:text-base">
                  {activeMember.role}
                </p>

                <p className="max-w-md text-base leading-relaxed text-[#C7BDD5]">
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

        {showAboutLink && (
          <div className="mt-10 flex justify-start sm:mt-12 sm:justify-end">
            <Link
              href="/about"
              className="wg-link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#D8C5F2] transition-colors hover:text-[#FF9FFC]"
            >
              More about our studio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
