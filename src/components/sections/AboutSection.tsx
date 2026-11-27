import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT_VALUES, TEAM_SLOTS } from "@/data/team";

/** Renders a sharp Neo-Brutalist 2x2 registration square identifying each partner desk cleanly. */
function QuadrantMarker({ slotIndex }: { slotIndex: number }) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className="h-20 w-20" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="36"
        height="36"
        fill={slotIndex === 0 ? "#3155F5" : "#F5F0E6"}
        stroke="#151515"
        strokeWidth="3"
      />
      <rect
        x="48"
        y="4"
        width="36"
        height="36"
        fill={slotIndex === 1 ? "#F0522B" : "#F5F0E6"}
        stroke="#151515"
        strokeWidth="3"
      />
      <rect
        x="4"
        y="48"
        width="36"
        height="36"
        fill={slotIndex === 2 ? "#E9FF45" : "#F5F0E6"}
        stroke="#151515"
        strokeWidth="3"
      />
      <rect
        x="48"
        y="48"
        width="36"
        height="36"
        fill={slotIndex === 3 ? "#3155F5" : "#F5F0E6"}
        stroke="#151515"
        strokeWidth="3"
      />
    </svg>
  );
}

/** Renders the Neo-Brutalist four-member collective section for /about with preserved MaskedText and Reveal animations. */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b-[3px] border-ink bg-concrete"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b-[3px] border-ink pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-block border-2 border-ink bg-orange px-2.5 py-0.5 font-mono text-xs font-bold tracking-[0.1em] text-ivory uppercase">
              WG / 06 — About Web Guru
            </span>
            <MaskedText
              as="h2"
              id="about-heading"
              className="mt-4 font-display text-3xl leading-[1.04] font-extrabold tracking-[-0.03em] text-ink uppercase sm:text-5xl"
              lines={[
                "Four people.",
                <span key="abt-l2">
                  One{" "}
                  <span className="font-serif font-normal lowercase italic text-cobalt">
                    accountable
                  </span>{" "}
                  studio.
                </span>,
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-7">
            {ABOUT_VALUES.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div className="h-full border-2 border-ink bg-ivory p-5 shadow-[4px_4px_0px_#151515]">
                  <p className="inline-block bg-acid px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-ink uppercase">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink uppercase sm:text-3xl">
                The Four-Member Collective
              </h3>
              <p className="mt-1.5 max-w-xl text-sm font-medium text-slate">
                Dedicated profile frames ready for our four team members&apos;
                verified names, roles, portraits, and specialties.
              </p>
            </div>
            <Link
              href="/contact"
              className="wg-brutal-btn inline-flex items-center gap-1.5 border-2 border-ink bg-acid px-4 py-2 font-mono text-xs font-bold tracking-[0.08em] text-ink uppercase hover:bg-cobalt hover:text-ivory"
            >
              Work With Us
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_SLOTS.map((member, index) => (
              <Reveal key={member.slotNumber} variant="scale" delay={index * 0.06}>
                <article className="group flex h-full flex-col border-[3px] border-ink bg-ivory shadow-[6px_6px_0px_#151515] transition-transform duration-200 hover:-translate-y-1">
                  <div className="wg-dot-matrix relative flex aspect-[4/4] items-center justify-center border-b-[3px] border-ink bg-concrete p-6">
                    <span className="absolute top-3 left-3 bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-acid">
                      + MEMBER {member.slotNumber}
                    </span>
                    <span className="absolute top-3 right-3 border-2 border-ink bg-ivory px-2 py-0.5 font-mono text-[9px] font-bold text-ink uppercase">
                      {member.statusNote}
                    </span>

                    <div className="transition-transform duration-300 group-hover:scale-105">
                      <QuadrantMarker slotIndex={index} />
                    </div>

                    <span className="absolute bottom-3 left-3 font-mono text-[10px] font-bold tracking-widest text-ink uppercase">
                      Slot 0{index + 1} / 04
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between bg-ivory p-5">
                    <div>
                      <h4 className="font-display text-lg font-extrabold tracking-tight text-ink uppercase">
                        {member.placeholderName}
                      </h4>
                      <p className="mt-1 font-mono text-xs font-bold text-cobalt">
                        {member.rolePlaceholder}
                      </p>
                    </div>
                    <p className="mt-4 border-t-2 border-ink pt-3 text-xs leading-relaxed text-slate">
                      {member.focusPlaceholder}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
