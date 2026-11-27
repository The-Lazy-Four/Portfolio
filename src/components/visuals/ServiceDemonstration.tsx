"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Globe,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Server,
  ShieldCheck,
  Smartphone,
  Star,
  Wifi,
} from "lucide-react";
import type { ServiceDiagramKind } from "@/data/services";

interface ServiceDemonstrationProps {
  kind: ServiceDiagramKind;
}

/** Interactive local search & Maps visibility demonstration framed in Neo-Brutalist blocks (conceptual simulation). */
function LocalSeoDemo() {
  const [optimized, setOptimized] = useState(true);

  return (
    <div className="space-y-2.5 lg:space-y-[clamp(0.45rem,1.1dvh,0.85rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <span className="bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Conceptual Simulation · Not a live Google interface
        </span>
        <div
          role="group"
          aria-label="Toggle listing state"
          className="inline-flex border-2 border-ink bg-ivory p-0.5 text-[11px]"
        >
          <button
            type="button"
            onClick={() => setOptimized(false)}
            aria-pressed={!optimized}
            className={`px-3 py-1 font-mono font-bold uppercase transition-colors ${
              !optimized ? "bg-ink text-acid" : "text-ink hover:bg-concrete"
            }`}
          >
            Unoptimized
          </button>
          <button
            type="button"
            onClick={() => setOptimized(true)}
            aria-pressed={optimized}
            className={`px-3 py-1 font-mono font-bold uppercase transition-colors ${
              optimized ? "bg-cobalt text-ivory" : "text-ink hover:bg-concrete"
            }`}
          >
            With Web Guru
          </button>
        </div>
      </div>

      {/* Simulated search bar */}
      <div className="flex items-center justify-between border-2 border-ink bg-ivory px-4 py-2 text-xs text-ink shadow-[3px_3px_0px_#151515]">
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-orange" aria-hidden="true" />
          <span className="font-semibold">&ldquo;local bakery &amp; cafe near me&rdquo;</span>
        </span>
        <span className="bg-acid px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
          Local Pack Demo
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        {/* Stylized local discovery map */}
        <div className="wg-grid-pattern relative flex min-h-[116px] items-center justify-center overflow-hidden border-2 border-ink bg-ivory sm:col-span-5">
          {optimized && (
            <>
              <span className="absolute h-28 w-28 border-2 border-dashed border-cobalt" />
              <span className="absolute h-16 w-16 border-2 border-ink bg-acid/60" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <span
              className={`flex h-9 w-9 items-center justify-center border-2 border-ink shadow-[3px_3px_0px_#151515] transition-colors ${
                optimized ? "bg-orange text-ivory" : "bg-concrete text-ink"
              }`}
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="mt-2 border border-ink bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-acid">
              {optimized ? "Accurate Pin · Open" : "Incomplete Pin"}
            </span>
          </div>
        </div>

        {/* Simulated listing card */}
        <div className="border-2 border-ink bg-ivory p-4 shadow-[4px_4px_0px_#151515] sm:col-span-7">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-display text-sm font-extrabold text-ink uppercase">
                Sample Local Business
              </p>
              <p className="text-[11px] font-medium text-slate">
                {optimized
                  ? "Primary + Secondary Categories Configured"
                  : "Uncategorized Listing"}
              </p>
            </div>
            <span
              className={`border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                optimized ? "bg-acid text-ink" : "bg-concrete text-ink"
              }`}
            >
              {optimized ? "Verified" : "Incomplete"}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-orange" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((starIndex) => (
                <Star
                  key={starIndex}
                  className={`h-3.5 w-3.5 ${
                    optimized || starIndex < 2 ? "fill-current" : "opacity-30"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[11px] font-bold text-ink">
              {optimized ? "Active review responses" : "No reply workflow"}
            </span>
          </div>

          <ul className="mt-3 space-y-1.5 border-t-2 border-ink pt-3 text-[11px] text-ink">
            <li className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-cobalt" aria-hidden="true" />
              <span>
                {optimized
                  ? "Updated hours, photos & service list"
                  : "Missing hours & outdated gallery"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-cobalt" aria-hidden="true" />
              <span>
                {optimized
                  ? "Direct website & click-to-call actions"
                  : "Broken or missing website link"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Interactive browser preview showing Neo-Brutalist desktop vs mobile storefront layout. */
function WebDevDemo() {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="space-y-2.5 lg:space-y-[clamp(0.45rem,1.1dvh,0.85rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <span className="bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Interactive Storefront Preview · Concept UI
        </span>
        <div className="inline-flex border-2 border-ink bg-ivory p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            aria-pressed={viewport === "desktop"}
            className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono font-bold uppercase transition-colors ${
              viewport === "desktop"
                ? "bg-cobalt text-ivory"
                : "text-ink hover:bg-concrete"
            }`}
          >
            <Monitor className="h-3 w-3" aria-hidden="true" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            aria-pressed={viewport === "mobile"}
            className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono font-bold uppercase transition-colors ${
              viewport === "mobile"
                ? "bg-cobalt text-ivory"
                : "text-ink hover:bg-concrete"
            }`}
          >
            <Smartphone className="h-3 w-3" aria-hidden="true" />
            Mobile
          </button>
        </div>
      </div>

      {/* Simulated browser container */}
      <div className="wg-grid-pattern flex justify-center border-2 border-ink bg-concrete p-3">
        <div
          className={`overflow-hidden border-2 border-ink bg-ivory shadow-[5px_5px_0px_#151515] transition-all duration-300 ${
            viewport === "desktop" ? "w-full" : "w-[230px]"
          }`}
        >
          <div className="flex items-center justify-between border-b-2 border-ink bg-acid px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 border border-ink bg-orange" />
              <span className="h-2.5 w-2.5 border border-ink bg-ivory" />
              <span className="h-2.5 w-2.5 border border-ink bg-cobalt" />
            </div>
            <span className="font-mono text-[10px] font-bold text-ink">
              yourbusiness.example
            </span>
          </div>

          <div className="p-4">
            <div
              className={`grid gap-3 ${
                viewport === "desktop" ? "grid-cols-12 items-center" : "grid-cols-1"
              }`}
            >
              <div className={viewport === "desktop" ? "col-span-7" : ""}>
                <span className="bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-acid uppercase">
                  Custom Architecture
                </span>
                <p className="mt-2 font-display text-base leading-tight font-extrabold text-ink uppercase">
                  Clear offer above the fold. Fast on every screen.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="border-2 border-ink bg-orange px-3 py-1 font-mono text-[10px] font-bold text-ivory uppercase">
                    Book Now
                  </span>
                  <span className="border-2 border-ink bg-concrete px-3 py-1 font-mono text-[10px] font-bold text-ink uppercase">
                    Services
                  </span>
                </div>
              </div>
              <div
                className={`border-2 border-ink bg-cobalt p-3 text-ivory ${
                  viewport === "desktop" ? "col-span-5" : ""
                }`}
              >
                <p className="font-mono text-[9px] font-bold text-acid uppercase">
                  Technical Health
                </p>
                <p className="mt-1 text-xs font-semibold">
                  Semantic HTML, sharp contrast &amp; clean URLs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Interactive business workflow application demonstration with clickable status queue. */
function AppDevDemo() {
  const [tab, setTab] = useState<"queue" | "active" | "done">("queue");

  const itemsByTab = {
    queue: [
      { id: "REQ-104", title: "Client Onboarding Portal Request", tag: "New" },
      { id: "REQ-105", title: "Mobile Field Quote Approval", tag: "Pending" },
    ],
    active: [
      { id: "JOB-088", title: "Custom Booking & Dispatch View", tag: "In Review" },
      { id: "JOB-089", title: "Inventory Sync Workflow", tag: "Scheduled" },
    ],
    done: [
      { id: "REL-041", title: "Staff Role Permissions Upgrade", tag: "Deployed" },
      { id: "REL-042", title: "Database Backup Check", tag: "Healthy" },
    ],
  };

  return (
    <div className="space-y-2.5 lg:space-y-[clamp(0.45rem,1.1dvh,0.85rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <span className="bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Workflow App Simulation · Sample Operations UI
        </span>
        <span className="inline-flex items-center gap-1.5 bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-acid uppercase">
          <span className="h-2 w-2 bg-orange" />
          Maintained &amp; Upgradeable
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(
          [
            { key: "queue", label: "Incoming" },
            { key: "active", label: "In Progress" },
            { key: "done", label: "Completed" },
          ] as const
        ).map((statusTab) => {
          const active = tab === statusTab.key;
          return (
            <button
              key={statusTab.key}
              type="button"
              onClick={() => setTab(statusTab.key)}
              aria-pressed={active}
              className={`border-2 border-ink px-3 py-2 font-mono text-xs font-bold uppercase transition-colors ${
                active
                  ? "bg-cobalt text-ivory shadow-[3px_3px_0px_#151515]"
                  : "bg-ivory text-ink hover:bg-acid"
              }`}
            >
              {statusTab.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {itemsByTab[tab].map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between border-2 border-ink bg-ivory px-4 py-3 shadow-[3px_3px_0px_#151515]"
          >
            <div>
              <span className="font-mono text-[10px] font-bold text-orange">
                {row.id}
              </span>
              <p className="text-xs font-bold text-ink">{row.title}</p>
            </div>
            <span className="border-2 border-ink bg-acid px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
              {row.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Interactive social media content planning and Neo-Brutalist post framing showcase. */
function SocialMediaDemo() {
  const [selectedDay, setSelectedDay] = useState(0);
  const schedule = [
    {
      day: "MON",
      format: "Product Spotlight",
      headline: "Introduce a flagship service with clear customer benefit.",
      tone: "bg-cobalt text-ivory",
    },
    {
      day: "WED",
      format: "Behind the Craft",
      headline: "Show real workspace details that build authentic local trust.",
      tone: "bg-ink text-acid",
    },
    {
      day: "FRI",
      format: "Customer Guide",
      headline: "Answer a frequent buyer question with branded graphics.",
      tone: "bg-orange text-ivory",
    },
  ];

  const activePost = schedule[selectedDay];

  return (
    <div className="space-y-2.5 lg:space-y-[clamp(0.45rem,1.1dvh,0.85rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <span className="bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Editorial Calendar &amp; Brand Post System
        </span>
        <span className="inline-flex items-center gap-1 bg-acid px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          Consistent Cadence
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {schedule.map((slot, index) => {
          const isSelected = index === selectedDay;
          return (
            <button
              key={slot.day}
              type="button"
              onClick={() => setSelectedDay(index)}
              aria-pressed={isSelected}
              className={`border-2 border-ink p-2.5 text-left transition-colors ${
                isSelected
                  ? "bg-acid text-ink shadow-[3px_3px_0px_#151515]"
                  : "bg-ivory text-ink hover:bg-concrete"
              }`}
            >
              <span className="font-mono text-[10px] font-extrabold text-orange">
                {slot.day}
              </span>
              <span className="mt-0.5 block truncate text-xs font-bold text-ink">
                {slot.format}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div
          className={`flex flex-col justify-between border-2 border-ink p-4 shadow-[4px_4px_0px_#151515] sm:col-span-6 ${activePost.tone}`}
        >
          <span className="font-mono text-[10px] font-bold uppercase opacity-85">
            {activePost.day} · Branded Frame
          </span>
          <p className="mt-4 font-display text-base leading-snug font-extrabold uppercase">
            {activePost.format}
          </p>
          <span className="mt-4 font-mono text-[10px] font-bold uppercase opacity-85">
            1080 × 1350 Ready
          </span>
        </div>
        <div className="border-2 border-ink bg-ivory p-4 shadow-[4px_4px_0px_#151515] sm:col-span-6">
          <p className="font-mono text-[10px] font-bold text-cobalt uppercase">
            Planned Copy &amp; Schedule
          </p>
          <p className="mt-2 text-xs leading-relaxed font-medium text-ink">
            {activePost.headline}
          </p>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] font-bold text-ink">
            <Check className="h-4 w-4 text-orange" aria-hidden="true" />
            Approved &amp; queued for publishing
          </div>
        </div>
      </div>
    </div>
  );
}

/** Interactive NFC tap card and QR scan simulation framed cleanly in Deep Ink and Acid Yellow. */
function NfcQrDemo() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="space-y-2.5 lg:space-y-[clamp(0.45rem,1.1dvh,0.85rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <span className="bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Physical-to-Digital Review Flow Simulation
        </span>
        <button
          type="button"
          onClick={() => setScanned((prev) => !prev)}
          className="wg-brutal-btn inline-flex items-center gap-1.5 border-2 border-ink bg-orange px-3.5 py-1 font-mono text-[11px] font-bold text-ivory uppercase hover:bg-cobalt"
        >
          <Wifi className="h-3 w-3 rotate-90" aria-hidden="true" />
          {scanned ? "Reset Demo" : "Simulate Tap / Scan"}
        </button>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
        <div className="relative overflow-hidden border-2 border-ink bg-ink p-5 text-ivory shadow-[5px_5px_0px_#3155F5] sm:col-span-7">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs font-extrabold tracking-wider uppercase">
              Your Business<span className="text-acid">.</span>
            </span>
            <Wifi
              className={`h-4 w-4 rotate-90 transition-transform duration-300 ${
                scanned ? "scale-125 text-acid" : "text-ivory/75"
              }`}
              aria-hidden="true"
            />
          </div>

          <p className="mt-4 font-display text-base leading-snug font-bold">
            Enjoyed your visit? Tap or scan to leave a Google review.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="bg-acid px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
              NFC + Direct QR Link
            </span>
            <div className="grid grid-cols-3 gap-1 border border-ivory bg-ivory p-1.5">
              {[1, 1, 0, 1, 0, 1, 0, 1, 1].map((filled, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 ${
                    filled ? "bg-ink" : "bg-orange"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-2 border-ink bg-ivory p-4 shadow-[4px_4px_0px_#151515] sm:col-span-5">
          <div className="mb-2 flex items-center justify-between border-b-2 border-ink pb-2">
            <span className="font-mono text-[9px] font-bold text-ink uppercase">
              Customer Phone
            </span>
            <span
              className={`h-2.5 w-2.5 border border-ink ${
                scanned ? "bg-acid" : "bg-concrete"
              }`}
            />
          </div>

          {scanned ? (
            <div className="space-y-2 py-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-cobalt">
                <CheckCircle2 className="h-4 w-4 text-orange" aria-hidden="true" />
                Review link opened
              </div>
              <p className="text-[11px] leading-relaxed font-medium text-ink">
                Customer lands straight on your verified review screen in one tap.
              </p>
            </div>
          ) : (
            <div className="space-y-2 py-1">
              <p className="text-xs font-bold text-ink">Ready at counter</p>
              <p className="text-[11px] leading-relaxed text-slate">
                Click &ldquo;Simulate Tap / Scan&rdquo; above to preview the flow.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Interactive infrastructure and support care topology panel in bold Neo-Brutalist style. */
function TechSupportDemo() {
  const [activeLayer, setActiveLayer] = useState(0);
  const layers = [
    {
      name: "Domain & DNS",
      icon: Globe,
      detail: "Registrar records, SSL certificates, and clean domain routing.",
    },
    {
      name: "Hosting & Uptime",
      icon: Server,
      detail: "Server configuration, backups, speed checks, and troubleshooting.",
    },
    {
      name: "Business Email",
      icon: Mail,
      detail: "Professional domain email setup and deliverability records.",
    },
    {
      name: "Ongoing Maintenance",
      icon: ShieldCheck,
      detail: "Regular updates, bug fixes, and direct support when needed.",
    },
  ];

  const selected = layers[activeLayer];

  return (
    <div className="space-y-2.5 lg:space-y-[clamp(0.45rem,1.1dvh,0.85rem)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-2">
        <span className="bg-concrete px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
          Connected Digital Infrastructure Care
        </span>
        <span className="inline-flex items-center gap-1 bg-acid px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Single Support Contact
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const active = index === activeLayer;
          return (
            <button
              key={layer.name}
              type="button"
              onClick={() => setActiveLayer(index)}
              aria-pressed={active}
              className={`flex items-center gap-2.5 border-2 border-ink p-3 text-left font-mono text-xs font-bold uppercase transition-colors ${
                active
                  ? "bg-cobalt text-ivory shadow-[3px_3px_0px_#151515]"
                  : "bg-ivory text-ink hover:bg-acid"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  active ? "text-acid" : "text-orange"
                }`}
                aria-hidden="true"
              />
              <span>{layer.name}</span>
            </button>
          );
        })}
      </div>

      <div className="border-2 border-ink bg-ivory p-4 shadow-[4px_4px_0px_#151515]">
        <p className="font-mono text-[10px] font-bold text-orange uppercase">
          Supported Layer · {selected.name}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed font-semibold text-ink">
          {selected.detail}
        </p>
      </div>
    </div>
  );
}

/** Dispatches and animates the preserved interactive visual demonstration for each Web Guru service category. */
export function ServiceDemonstration({ kind }: ServiceDemonstrationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-2 border-ink bg-concrete p-4 sm:p-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={kind}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {kind === "local-seo" && <LocalSeoDemo />}
          {kind === "web-dev" && <WebDevDemo />}
          {kind === "app-dev" && <AppDevDemo />}
          {kind === "social-media" && <SocialMediaDemo />}
          {kind === "nfc-qr" && <NfcQrDemo />}
          {kind === "tech-support" && <TechSupportDemo />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
