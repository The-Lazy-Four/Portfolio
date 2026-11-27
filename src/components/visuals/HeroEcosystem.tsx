"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Globe, Layers, LifeBuoy, MapPin, QrCode, Share2 } from "lucide-react";

interface EcosystemNode {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  serviceId: string;
  connectionNote: string;
  summary: string;
  // Percentage coordinates for desktop radial constellation layout.
  xPercent: number;
  yPercent: number;
  // SVG coordinates matching the 540x420 canvas viewBox.
  svgX: number;
  svgY: number;
  iconKind: "map" | "web" | "app" | "social" | "nfc" | "support";
}

const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "visibility",
    number: "01",
    label: "Google Visibility",
    shortLabel: "Google Maps & SEO",
    serviceId: "google-business-local-seo",
    connectionNote: "Feeds high-intent local searchers directly to your website & storefront",
    summary:
      "Google Business Profile setup, local categories, photos, and Maps discoverability.",
    xPercent: 18,
    yPercent: 18,
    svgX: 112,
    svgY: 78,
    iconKind: "map",
  },
  {
    id: "websites",
    number: "02",
    label: "Websites",
    shortLabel: "Web Design & Dev",
    serviceId: "website-design-development",
    connectionNote: "Converts traffic from Google Search & Social channels into enquiries",
    summary:
      "Custom business sites, portfolios, landing pages, and fast online stores.",
    xPercent: 80,
    yPercent: 18,
    svgX: 428,
    svgY: 78,
    iconKind: "web",
  },
  {
    id: "apps",
    number: "03",
    label: "Applications",
    shortLabel: "Custom Web & Mobile",
    serviceId: "application-development-management",
    connectionNote: "Extends your website into customer portals, booking tools, and workflows",
    summary:
      "Tailored web apps, mobile apps, and ongoing application upgrades.",
    xPercent: 88,
    yPercent: 54,
    svgX: 468,
    svgY: 222,
    iconKind: "app",
  },
  {
    id: "support",
    number: "04",
    label: "Tech Support",
    shortLabel: "Hosting, DNS & Care",
    serviceId: "complete-technical-support",
    connectionNote: "Keeps websites, domains, business email, and apps healthy year-round",
    summary:
      "Troubleshooting, updates, domain/hosting setup, and business email care.",
    xPercent: 78,
    yPercent: 86,
    svgX: 416,
    svgY: 356,
    iconKind: "support",
  },
  {
    id: "reviews",
    number: "05",
    label: "Customer Reviews",
    shortLabel: "NFC & QR Cards",
    serviceId: "nfc-qr-review-solutions",
    connectionNote: "Turns in-person visits into verified reviews that lift Google Visibility",
    summary:
      "Custom-branded Google review NFC tap cards and QR feedback stands.",
    xPercent: 22,
    yPercent: 86,
    svgX: 124,
    svgY: 356,
    iconKind: "nfc",
  },
  {
    id: "social",
    number: "06",
    label: "Social Media",
    shortLabel: "Content & Scheduling",
    serviceId: "social-media-management",
    connectionNote: "Keeps your brand voice active and sends audiences back to your site",
    summary:
      "Account optimization, planned posts, creative design, and consistent publishing.",
    xPercent: 12,
    yPercent: 54,
    svgX: 72,
    svgY: 222,
    iconKind: "social",
  },
];

/** Renders the matching icon for each ecosystem node cleanly. */
function NodeIcon({ kind }: { kind: EcosystemNode["iconKind"] }) {
  switch (kind) {
    case "map":
      return <MapPin className="h-4 w-4" aria-hidden="true" />;
    case "web":
      return <Globe className="h-4 w-4" aria-hidden="true" />;
    case "app":
      return <Layers className="h-4 w-4" aria-hidden="true" />;
    case "support":
      return <LifeBuoy className="h-4 w-4" aria-hidden="true" />;
    case "nfc":
      return <QrCode className="h-4 w-4" aria-hidden="true" />;
    case "social":
      return <Share2 className="h-4 w-4" aria-hidden="true" />;
  }
}

/** Displays an interactive six-node digital ecosystem connecting Web Guru's services around the client's business. */
export function HeroEcosystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothTiltX = useSpring(pointerX, { stiffness: 140, damping: 24 });
  const smoothTiltY = useSpring(pointerY, { stiffness: 140, damping: 24 });

  const activeNode = ECOSYSTEM_NODES[activeIndex];
  const centerX = 270;
  const centerY = 212;

  /** Applies subtle cursor-driven parallax to the ecosystem stage on fine-pointer desktop screens. */
  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const normX = (event.clientX - rect.left) / rect.width - 0.5;
    const normY = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(normX * 10);
    pointerY.set(normY * 10);
  }

  /** Resets cursor parallax smoothly when leaving the visualization area. */
  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative"
    >
      {/* Desktop radial interactive constellation (sm and above) */}
      <div className="wg-dot-matrix relative hidden border border-rule bg-linen/80 p-4 sm:block">
        <div className="mb-2 flex items-center justify-between border-b border-rule/80 pb-2.5">
          <span className="font-mono text-[10px] tracking-[0.12em] text-slate uppercase">
            Web Guru Ecosystem · Interactive Map
          </span>
          <span className="font-mono text-[10px] text-accent uppercase">
            Hover or Select Any Node
          </span>
        </div>

        <motion.div
          style={
            shouldReduceMotion ? undefined : { x: smoothTiltX, y: smoothTiltY }
          }
          className="relative h-[370px] w-full"
        >
          {/* SVG architectural connectors & active signal paths */}
          <svg
            viewBox="0 0 540 420"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none h-full w-full"
          >
            {/* Outer architectural orbit ring */}
            <circle
              cx={centerX}
              cy={centerY}
              r="165"
              stroke="#D6CFC2"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="98"
              stroke="#D6CFC2"
              strokeOpacity="0.65"
              strokeWidth="1"
            />

            {/* Cross-links showing real business feedback loops (e.g. Reviews -> Google Visibility) */}
            <path
              d="M124 356 Q 40 210 112 78"
              stroke="#D6CFC2"
              strokeWidth="1"
            />
            <path
              d="M428 78 Q 505 215 416 356"
              stroke="#D6CFC2"
              strokeWidth="1"
            />

            {/* Radial spokes from business core to every Web Guru service node */}
            {ECOSYSTEM_NODES.map((node, index) => {
              const isSelected = index === activeIndex;
              return (
                <g key={node.id}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={node.svgX}
                    y2={node.svgY}
                    stroke={isSelected ? "#D94E28" : "#C8C0B1"}
                    strokeWidth={isSelected ? "2" : "1"}
                    className={isSelected ? "wg-flow-line" : ""}
                  />
                  <circle
                    cx={node.svgX}
                    cy={node.svgY}
                    r={isSelected ? "6" : "3.5"}
                    fill={isSelected ? "#D94E28" : "#161A18"}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central hub anchor */}
          <div
            style={{ left: "50%", top: "50%" }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-ink bg-ink text-center text-paper shadow-sm">
              <span className="font-mono text-[9px] tracking-[0.14em] text-accent uppercase">
                Core Hub
              </span>
              <span className="mt-0.5 font-display text-xs leading-tight font-bold tracking-tight">
                YOUR
                <br />
                BUSINESS
              </span>
            </div>
          </div>

          {/* Interactive nodes positioned around the ring */}
          {ECOSYSTEM_NODES.map((node, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={isSelected}
                style={{
                  left: `${node.xPercent}%`,
                  top: `${node.yPercent}%`,
                }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3.5 py-2 text-left transition-all duration-200 ${
                  isSelected
                    ? "z-20 scale-105 border-accent bg-ink text-paper shadow-md"
                    : "z-10 border-rule bg-paper/95 text-ink hover:border-ink"
                }`}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                      isSelected
                        ? "bg-accent text-paper"
                        : "bg-linen text-ink group-hover:bg-ink group-hover:text-paper"
                    }`}
                  >
                    <NodeIcon kind={node.iconKind} />
                  </span>
                  <span className="text-xs font-semibold tracking-tight">
                    {node.label}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile / compact touch-first node selector */}
      <div className="border border-rule bg-linen p-4 sm:hidden">
        <div className="mb-3 flex items-center justify-between border-b border-rule pb-2">
          <span className="font-mono text-[10px] tracking-[0.1em] text-slate uppercase">
            6 Connected Services
          </span>
          <span className="font-mono text-[10px] text-accent uppercase">
            Tap to Inspect
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {ECOSYSTEM_NODES.map((node, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isSelected}
                className={`flex items-center gap-2 border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                  isSelected
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-ink"
                }`}
              >
                <span className={isSelected ? "text-accent" : "text-slate"}>
                  {node.number}
                </span>
                <span className="truncate">{node.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contextual live readout panel for the selected ecosystem node */}
      <div className="border-x border-b border-rule bg-paper p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                Node {activeNode.number} · {activeNode.shortLabel}
              </span>
              <Link
                href={`/services#${activeNode.serviceId}`}
                className="wg-link-underline inline-flex items-center gap-1 font-mono text-[11px] font-medium whitespace-nowrap text-ink uppercase hover:text-accent"
              >
                Explore Discipline
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </div>

            <p className="mt-2 text-sm font-medium text-ink">
              {activeNode.summary}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate">
              <strong className="font-semibold text-ink">System Link: </strong>
              {activeNode.connectionNote}.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
