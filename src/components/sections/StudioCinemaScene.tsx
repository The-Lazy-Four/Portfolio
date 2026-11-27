"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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

/** Renders Section 04 (The People Behind Web Guru) with staggered editorial portraits, roles, short bios, and LinkedIn profiles. */
export function StudioCinemaScene({
  showAboutLink = true,
}: StudioCinemaSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { reducedMotion, setActiveSceneIndex } = useCinemaEngine();

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
      className="relative border-t border-white/10 bg-[#100B18]/45 py-16 text-[#F5F1FA] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
        {/* Section header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid grid-cols-1 gap-5 border-b border-white/10 pb-8 lg:grid-cols-12 lg:items-end lg:gap-14"
        >
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
              Four minds, different strengths, one shared vision.
            </p>
          </div>
        </motion.div>

        {/* Editorial 4-member portrait grid (staggered vertically on desktop, open typography) */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {VERIFIED_TEAM_MEMBERS.map((member, index) => {
            const staggered = index % 2 === 1;

            return (
              <motion.article
                key={member.slotNumber}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group flex flex-col ${
                  staggered ? "lg:mt-12" : ""
                }`}
              >
                {/* Prominent portrait frame (non-clickable image so LinkedIn stays explicit) */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#171027]/60">
                  <div className="relative h-full w-full transition-transform duration-700 ease-out md:group-hover:scale-[1.04]">
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className={member.imageClassName}
                    />
                  </div>

                  {/* Subtle dark-purple studio atmosphere vignette integrating bright backgrounds */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100B18]/75 via-[#100B18]/10 to-transparent transition-opacity duration-500 md:group-hover:opacity-65"
                  />
                </div>

                {/* Editorial member caption */}
                <div className="mt-4 space-y-1.5 sm:mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#F5F1FA] transition-colors duration-300 md:group-hover:text-[#FF9FFC]">
                      {member.name}
                    </h3>

                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 px-1 text-xs font-medium text-[#B497CF] transition-colors hover:text-[#FF9FFC]"
                    >
                      <LinkedInGlyph />
                      <span>LinkedIn</span>
                    </a>
                  </div>

                  <p className="text-sm font-medium text-[#A78BFA]">
                    {member.role}
                  </p>

                  <p className="pt-1 text-sm leading-relaxed text-[#C7BDD5]">
                    {member.focus}
                  </p>
                </div>
              </motion.article>
            );
          })}
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
