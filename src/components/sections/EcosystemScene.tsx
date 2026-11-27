"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import {
  HighlighterReveal,
  ParallaxContourField,
  ScrubbedStatement,
} from "@/components/motion/KineticTypography";
import { SERVICE_CATEGORIES } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

interface NodeCoordinate {
  x: number;
  y: number;
}

// Radial coordinates around a 500x380 blueprint canvas uniting all 6 disciplines into one center engine
const NODE_POSITIONS: NodeCoordinate[] = [
  { x: 110, y: 74 },
  { x: 390, y: 74 },
  { x: 64, y: 190 },
  { x: 436, y: 190 },
  { x: 110, y: 306 },
  { x: 390, y: 306 },
];

/** Renders Scene 02 (The Digital Ecosystem) with scrubbed manifesto copy, highlighter blocks, and an interactive node-topology diagram. */
export function EcosystemScene() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedService = SERVICE_CATEGORIES[selectedIndex];

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
      id="scene-ecosystem"
      ref={sectionRef}
      aria-labelledby="ecosystem-heading"
      className="border-y border-rule bg-linen py-20 sm:py-28 xl:pl-11"
    >
      <ParallaxContourField className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Scrubbed word-by-word thesis + Highlighter wipe subhead */}
        <div className="border-b border-rule pb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
              [02] · The Digital Ecosystem
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] text-slate uppercase">
              Connected Systems Over Fragmented Freelancers
            </span>
          </div>

          <ScrubbedStatement
            text="Most growing businesses stitch together separate vendors for local SEO, websites, custom software, social feeds, and support. We align every touchpoint under one engineering team."
            accentWord="one"
            className="mt-7 max-w-5xl font-display text-3xl leading-[1.12] font-bold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.4rem]"
          />
        </div>

        {/* Interactive Node Topology + Synchronized Specification Rail (Shopify Editions inspired) */}
        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Interactive SVG Network Diagram */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <HighlighterReveal
                as="h2"
                id="ecosystem-heading"
                lines={["Select a node to trace", "how the system connects."]}
                className="font-display text-2xl leading-tight font-bold tracking-tight text-ink sm:text-3xl"
                barClassName="bg-accent"
              />
              <span className="hidden font-mono text-[11px] text-slate uppercase sm:inline">
                6 Active Nodes
              </span>
            </div>

            <div
              data-cursor="INSPECT"
              className="wg-grid-pattern relative overflow-hidden rounded-xl border border-rule bg-paper p-4 sm:p-6"
            >
              <svg
                viewBox="0 0 500 380"
                className="mx-auto block w-full max-w-[540px]"
                role="img"
                aria-label="Interactive Web Guru digital ecosystem node diagram connecting all six services"
              >
                {/* Signal connector lines from core hub (250, 190) to all 6 disciplines */}
                {NODE_POSITIONS.map((coords, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <line
                      key={`edge-${index}`}
                      x1={250}
                      y1={190}
                      x2={coords.x}
                      y2={coords.y}
                      stroke={isActive ? "#d94e28" : "#161a18"}
                      strokeOpacity={isActive ? 0.95 : 0.18}
                      strokeWidth={isActive ? 2.2 : 1}
                      className={isActive ? "wg-flow-line" : ""}
                    />
                  );
                })}

                {/* Outer dashed orbital boundary */}
                <ellipse
                  cx={250}
                  cy={190}
                  rx={176}
                  ry={130}
                  fill="none"
                  stroke="#161a18"
                  strokeOpacity={0.12}
                  strokeDasharray="4 4"
                />

                {/* Central Web Guru hub */}
                <circle cx={250} cy={190} r={46} fill="#18362f" />
                <circle
                  cx={250}
                  cy={190}
                  r={54}
                  fill="none"
                  stroke="#d94e28"
                  strokeOpacity={0.55}
                  strokeWidth={1.2}
                />
                <text
                  x={250}
                  y={186}
                  textAnchor="middle"
                  fill="#f6f3ec"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="0.08em"
                >
                  WEB GURU
                </text>
                <text
                  x={250}
                  y={202}
                  textAnchor="middle"
                  fill="#f3b340"
                  fontSize="8.5"
                  letterSpacing="0.1em"
                >
                  CORE ENGINE
                </text>

                {/* Interactive service nodes rendered directly inside SVG */}
                {SERVICE_CATEGORIES.map((service, index) => {
                  const pos = NODE_POSITIONS[index];
                  const isSelected = index === selectedIndex;
                  return (
                    <g
                      key={service.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${service.title}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedIndex(index)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedIndex(index);
                        }
                      }}
                      className="cursor-pointer outline-none"
                    >
                      <rect
                        x={pos.x - 58}
                        y={pos.y - 24}
                        width={116}
                        height={48}
                        rx={8}
                        fill={isSelected ? "#d94e28" : "#ece7dc"}
                        stroke={isSelected ? "#161a18" : "#c7bfb1"}
                        strokeWidth={isSelected ? 1.5 : 1}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 5}
                        textAnchor="middle"
                        fill={isSelected ? "#f6f3ec" : "#d94e28"}
                        fontSize="9"
                        fontWeight="700"
                        letterSpacing="0.1em"
                      >
                        NODE {service.number}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 11}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "#161a18"}
                        fontSize="10"
                        fontWeight="600"
                      >
                        {service.shortTitle}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Accessible horizontal fallback pill bar for quick tap switching on small screens */}
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-rule pt-4">
                {SERVICE_CATEGORIES.map((service, index) => {
                  const active = index === selectedIndex;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                        active
                          ? "bg-ink text-paper"
                          : "border border-rule bg-linen text-slate hover:border-ink hover:text-ink"
                      }`}
                    >
                      {service.number} · {service.shortTitle}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Synchronized right specification card */}
          <div className="rounded-xl border border-ink/15 bg-ink p-7 text-paper sm:p-9 lg:col-span-5">
            <div className="flex items-center justify-between border-b border-paper/15 pb-4">
              <span className="font-mono text-xs tracking-[0.12em] text-amber uppercase">
                Discipline [{selectedService.number}]
              </span>
              <span className="font-mono text-[11px] text-paper/65 uppercase">
                {selectedService.deliverables.length} Deliverables
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl leading-tight font-bold text-paper sm:text-3xl">
              {selectedService.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-paper/80 sm:text-base">
              {selectedService.summary}
            </p>

            <div className="mt-6 border-l-2 border-accent pl-4">
              <span className="font-mono text-[10px] tracking-[0.12em] text-amber uppercase">
                Real Business Impact
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-paper/90">
                {selectedService.businessOutcome}
              </p>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-2 border-t border-paper/15 pt-5 text-xs text-paper/80">
              {selectedService.deliverables.slice(0, 4).map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-5">
              <Link
                href={`/services#${selectedService.id}`}
                data-cursor="DETAILS"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold tracking-[0.06em] text-paper uppercase transition-colors hover:bg-accent-hover"
              >
                Explore Discipline
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                className="font-mono text-[11px] text-amber underline-offset-4 hover:underline"
              >
                Enquire Directly &rarr;
              </Link>
            </div>
          </div>
        </div>
      </ParallaxContourField>
    </section>
  );
}
