import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { ABOUT_VALUES, TEAM_SLOTS } from "@/data/team";

/** Renders a subtle architectural 2x2 quadrant glyph highlighting each member's slot in the 4-member studio. */
function QuadrantMarker({ slotIndex }: { slotIndex: number }) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className="h-20 w-20" aria-hidden="true">
      <rect
        x="4"
        y="4"
        width="36"
        height="36"
        rx="4"
        fill={slotIndex === 0 ? "#D94E28" : "#F6F3EC"}
        stroke="#161A18"
        strokeOpacity="0.2"
      />
      <rect
        x="48"
        y="4"
        width="36"
        height="36"
        rx="4"
        fill={slotIndex === 1 ? "#D94E28" : "#F6F3EC"}
        stroke="#161A18"
        strokeOpacity="0.2"
      />
      <rect
        x="4"
        y="48"
        width="36"
        height="36"
        rx="4"
        fill={slotIndex === 2 ? "#D94E28" : "#F6F3EC"}
        stroke="#161A18"
        strokeOpacity="0.2"
      />
      <rect
        x="48"
        y="48"
        width="36"
        height="36"
        rx="4"
        fill={slotIndex === 3 ? "#D94E28" : "#F6F3EC"}
        stroke="#161A18"
        strokeOpacity="0.2"
      />
    </svg>
  );
}

/** Introduces Web Guru as a four-member studio with four architectural reserved team slots. */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-rule bg-paper"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        {/* Top studio manifesto */}
        <div className="grid grid-cols-1 gap-10 border-b border-rule pb-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
              WG / 06 — About Web Guru
            </span>
            <MaskedText
              as="h2"
              id="about-heading"
              className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl"
              lines={[
                "Four people.",
                <span key="abt-l2">
                  One{" "}
                  <span className="font-serif font-normal italic text-accent">
                    accountable
                  </span>{" "}
                  studio.
                </span>,
              ]}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
            {ABOUT_VALUES.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div className="border-t border-rule pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-5">
                  <p className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Dedicated 4-part architectural team slot layout */}
        <div className="mt-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Four-Member Collective
              </h3>
              <p className="mt-1.5 max-w-xl text-sm text-slate">
                Dedicated profile frames ready for our four team members&apos;
                verified names, roles, portraits, and specialties.
              </p>
            </div>
            <Link
              href="/about"
              className="wg-link-underline inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-[0.08em] text-ink uppercase hover:text-accent"
            >
              Read Studio Story
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_SLOTS.map((member, index) => (
              <Reveal key={member.slotNumber} variant="scale" delay={index * 0.06}>
                <article className="group flex h-full flex-col border border-rule bg-linen transition-transform duration-200 hover:-translate-y-1">
                  {/* Architectural registration portrait frame */}
                  <div className="wg-dot-matrix relative flex aspect-[4/4] items-center justify-center border-b border-rule bg-stone/50 p-6">
                    {/* Corner registration ticks */}
                    <span className="absolute top-3 left-3 font-mono text-[10px] text-slate">
                      + MEMBER {member.slotNumber}
                    </span>
                    <span className="absolute top-3 right-3 rounded-full border border-rule bg-paper px-2.5 py-0.5 font-mono text-[10px] text-slate uppercase">
                      {member.statusNote}
                    </span>

                    <div className="transition-transform duration-300 group-hover:scale-105">
                      <QuadrantMarker slotIndex={index} />
                    </div>

                    <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-slate/75 uppercase">
                      Portrait Slot 0{index + 1} / 04
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between bg-paper p-5">
                    <div>
                      <h4 className="font-display text-lg font-bold tracking-tight text-ink">
                        {member.placeholderName}
                      </h4>
                      <p className="mt-1 font-mono text-xs text-accent">
                        {member.rolePlaceholder}
                      </p>
                    </div>
                    <p className="mt-4 border-t border-rule pt-3 text-xs leading-relaxed text-slate">
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
