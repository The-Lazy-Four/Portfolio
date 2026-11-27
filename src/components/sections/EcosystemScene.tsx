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

const NODE_POSITIONS: NodeCoordinate[] = [
  { x: 110, y: 74 },
  { x: 390, y: 74 },
  { x: 64, y: 190 },
  { x: 436, y: 190 },
  { x: 110, y: 306 },
  { x: 390, y: 306 },
];

/** Renders Scene 02 (The Digital Ecosystem) in Neo-Brutalist color blocking while preserving ScrubbedStatement and interactive SVG topology. */
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
      className="border-y-[3px] border-ink bg-concrete py-20 sm:py-28 xl:pl-12"
    >
      <ParallaxContourField className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        {/* Scrubbed word-by-word thesis + Neo-Brutalist metadata stamp */}
        <div className="border-b-[3px] border-ink pb-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="border-2 border-ink bg-cobalt px-3 py-1 font-mono text-xs font-bold tracking-[0.14em] text-ivory uppercase shadow-[3px_3px_0px_#151515]">
              [02] · The Digital Ecosystem
            </span>
            <span className="border-2 border-ink bg-acid px-3 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
              + Connected Systems Over Fragmented Vendors +
            </span>
          </div>

          <ScrubbedStatement
            text="Most growing businesses stitch together separate vendors for local SEO, websites, custom software, social feeds, and support. We align every touchpoint under one engineering team."
            accentWord="one"
            className="mt-8 max-w-5xl font-display text-3xl leading-[1.1] font-extrabold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.4rem]"
          />
        </div>

        {/* Interactive Node Topology + Synchronized Deep Ink Block */}
        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Interactive SVG Network Diagram on Warm Ivory grid */}
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <HighlighterReveal
                as="h2"
                id="ecosystem-heading"
                lines={["Select a node to trace", "how the system connects."]}
                className="font-display text-2xl leading-tight font-extrabold tracking-tight text-ink uppercase sm:text-3xl"
                barClassName="bg-cobalt"
              />
              <span className="hidden border-2 border-ink bg-ink px-2.5 py-1 font-mono text-[11px] font-bold text-acid uppercase sm:inline">
                6 Active Nodes
              </span>
            </div>

            <div
              data-cursor="INSPECT"
              className="wg-grid-pattern relative overflow-hidden border-[3px] border-ink bg-ivory p-4 shadow-[8px_8px_0px_#151515] sm:p-6"
            >
              <svg
                viewBox="0 0 500 380"
                className="mx-auto block w-full max-w-[540px]"
                role="img"
                aria-label="Interactive Web Guru digital ecosystem node diagram connecting all six services"
              >
                {/* Signal connector lines from core hub (250, 190) */}
                {NODE_POSITIONS.map((coords, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <line
                      key={`edge-${index}`}
                      x1={250}
                      y1={190}
                      x2={coords.x}
                      y2={coords.y}
                      stroke={isActive ? "#F0522B" : "#151515"}
                      strokeOpacity={isActive ? 1 : 0.25}
                      strokeWidth={isActive ? 3 : 1.5}
                      className={isActive ? "wg-flow-line" : ""}
                    />
                  );
                })}

                {/* Geometric octagonal structural ring */}
                <rect
                  x={64}
                  y={64}
                  width={372}
                  height={252}
                  fill="none"
                  stroke="#151515"
                  strokeOpacity={0.18}
                  strokeDasharray="6 6"
                  strokeWidth={1.5}
                />

                {/* Central Electric Cobalt hub with black brutalist offset */}
                <rect
                  x={203}
                  y={145}
                  width={102}
                  height={98}
                  fill="#151515"
                />
                <rect
                  x={198}
                  y={140}
                  width={102}
                  height={98}
                  fill="#3155F5"
                  stroke="#151515"
                  strokeWidth={2.5}
                />
                <text
                  x={249}
                  y={184}
                  textAnchor="middle"
                  fill="#F5F0E6"
                  fontSize="12"
                  fontWeight="800"
                  letterSpacing="0.08em"
                >
                  WEB GURU
                </text>
                <text
                  x={249}
                  y={202}
                  textAnchor="middle"
                  fill="#E9FF45"
                  fontSize="9"
                  fontWeight="700"
                  letterSpacing="0.1em"
                >
                  CORE ENGINE
                </text>

                {/* Sharp rectangular interactive service nodes */}
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
                      {/* Hard black offset shadow beneath node */}
                      <rect
                        x={pos.x - 55}
                        y={pos.y - 21}
                        width={118}
                        height={48}
                        fill="#151515"
                      />
                      <rect
                        x={pos.x - 59}
                        y={pos.y - 25}
                        width={118}
                        height={48}
                        fill={isSelected ? "#E9FF45" : "#F5F0E6"}
                        stroke="#151515"
                        strokeWidth={2.5}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 6}
                        textAnchor="middle"
                        fill={isSelected ? "#3155F5" : "#F0522B"}
                        fontSize="9"
                        fontWeight="800"
                        letterSpacing="0.1em"
                      >
                        NODE {service.number}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 11}
                        textAnchor="middle"
                        fill="#151515"
                        fontSize="10"
                        fontWeight="700"
                      >
                        {service.shortTitle}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Accessible brutalist pill tabs */}
              <div className="mt-4 flex flex-wrap gap-2 border-t-2 border-ink pt-4">
                {SERVICE_CATEGORIES.map((service, index) => {
                  const active = index === selectedIndex;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`border-2 border-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase transition-colors ${
                        active
                          ? "bg-cobalt text-ivory shadow-[3px_3px_0px_#151515]"
                          : "bg-concrete text-ink hover:bg-acid"
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
          <div className="border-[3px] border-ink bg-ink p-7 text-ivory shadow-[8px_8px_0px_#3155F5] sm:p-9 lg:col-span-5">
            <div className="flex items-center justify-between border-b-2 border-ivory/25 pb-4">
              <span className="bg-acid px-2.5 py-1 font-mono text-xs font-bold tracking-[0.1em] text-ink uppercase">
                Discipline [{selectedService.number}]
              </span>
              <span className="font-mono text-[11px] font-bold text-acid uppercase">
                {selectedService.deliverables.length} Deliverables
              </span>
            </div>

            <h3 className="mt-5 font-display text-2xl leading-tight font-extrabold text-ivory uppercase sm:text-3xl">
              {selectedService.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-ivory/85 sm:text-base">
              {selectedService.summary}
            </p>

            <div className="mt-6 border-2 border-acid bg-cobalt/35 p-4">
              <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-acid uppercase">
                Real Business Impact
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-ivory">
                {selectedService.businessOutcome}
              </p>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 border-t-2 border-ivory/20 pt-5 text-xs text-ivory/90">
              {selectedService.deliverables.slice(0, 4).map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 border border-ivory bg-orange"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ivory/20 pt-5">
              <Link
                href={`/services#${selectedService.id}`}
                data-cursor="DETAILS"
                className="wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink bg-acid px-5 py-2.5 font-mono text-xs font-bold tracking-[0.06em] text-ink uppercase shadow-[4px_4px_0px_#F0522B]"
              >
                Explore Discipline
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                className="font-mono text-xs font-bold text-acid underline decoration-2 underline-offset-4 hover:text-orange"
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
