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

/** Interactive local search & Maps visibility demonstration (clearly labeled as a simulation). */
function LocalSeoDemo() {
  const [optimized, setOptimized] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
          Conceptual Simulation · Not a live Google interface
        </span>
        <div
          role="group"
          aria-label="Toggle listing state"
          className="inline-flex rounded-full border border-rule bg-paper p-0.5 text-[11px]"
        >
          <button
            type="button"
            onClick={() => setOptimized(false)}
            aria-pressed={!optimized}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              !optimized ? "bg-ink text-paper" : "text-slate hover:text-ink"
            }`}
          >
            Unoptimized
          </button>
          <button
            type="button"
            onClick={() => setOptimized(true)}
            aria-pressed={optimized}
            className={`rounded-full px-3 py-1 font-medium transition-colors ${
              optimized ? "bg-accent text-paper" : "text-slate hover:text-ink"
            }`}
          >
            With Web Guru
          </button>
        </div>
      </div>

      {/* Simulated search bar */}
      <div className="flex items-center justify-between rounded-full border border-rule bg-paper px-4 py-2 text-xs text-ink">
        <span className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span className="font-medium">&ldquo;local bakery &amp; cafe near me&rdquo;</span>
        </span>
        <span className="font-mono text-[10px] text-slate uppercase">
          Local Pack Demo
        </span>
      </div>

      {/* Map + Business Profile Split */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        {/* Stylized local discovery map */}
        <div className="wg-grid-pattern relative flex min-h-[148px] items-center justify-center overflow-hidden border border-rule bg-paper sm:col-span-5">
          {optimized && (
            <>
              <span className="absolute h-28 w-28 rounded-full border border-accent/25" />
              <span className="absolute h-16 w-16 rounded-full border border-accent/55 bg-accent/10" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-colors ${
                optimized ? "bg-accent text-paper" : "bg-stone text-slate"
              }`}
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="mt-1.5 rounded bg-ink px-2 py-0.5 font-mono text-[10px] text-paper">
              {optimized ? "Accurate Pin · Open" : "Incomplete Pin"}
            </span>
          </div>
        </div>

        {/* Simulated listing card */}
        <div className="border border-rule bg-paper p-4 sm:col-span-7">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-display text-sm font-bold text-ink">
                Sample Local Business
              </p>
              <p className="text-[11px] text-slate">
                {optimized
                  ? "Primary + Secondary Categories Configured"
                  : "Uncategorized Listing"}
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${
                optimized
                  ? "bg-pine text-paper"
                  : "border border-rule bg-linen text-slate"
              }`}
            >
              {optimized ? "Verified" : "Incomplete"}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-accent" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((starIndex) => (
                <Star
                  key={starIndex}
                  className={`h-3.5 w-3.5 ${
                    optimized || starIndex < 2 ? "fill-current" : "opacity-30"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[11px] text-slate">
              {optimized ? "Active review responses" : "No reply workflow"}
            </span>
          </div>

          <ul className="mt-3 space-y-1.5 border-t border-rule pt-3 text-[11px] text-slate">
            <li className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>
                {optimized
                  ? "Updated hours, photos & service list"
                  : "Missing hours & outdated gallery"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
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

/** Interactive browser preview showing responsive website architecture across desktop and mobile. */
function WebDevDemo() {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
          Interactive Storefront Preview · Concept UI
        </span>
        <div className="inline-flex rounded-full border border-rule bg-paper p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            aria-pressed={viewport === "desktop"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors ${
              viewport === "desktop"
                ? "bg-ink text-paper"
                : "text-slate hover:text-ink"
            }`}
          >
            <Monitor className="h-3 w-3" aria-hidden="true" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            aria-pressed={viewport === "mobile"}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-colors ${
              viewport === "mobile"
                ? "bg-ink text-paper"
                : "text-slate hover:text-ink"
            }`}
          >
            <Smartphone className="h-3 w-3" aria-hidden="true" />
            Mobile
          </button>
        </div>
      </div>

      {/* Simulated browser container */}
      <div className="flex justify-center bg-stone/50 p-3">
        <div
          className={`overflow-hidden border border-rule bg-paper shadow-sm transition-all duration-300 ${
            viewport === "desktop" ? "w-full" : "w-[230px]"
          }`}
        >
          {/* Browser chrome */}
          <div className="flex items-center justify-between border-b border-rule bg-linen px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="h-2 w-2 rounded-full bg-rule" />
              <span className="h-2 w-2 rounded-full bg-rule" />
            </div>
            <span className="font-mono text-[10px] text-slate">
              yourbusiness.example
            </span>
          </div>

          {/* Demo hero composition inside frame */}
          <div className="p-4">
            <div
              className={`grid gap-3 ${
                viewport === "desktop" ? "grid-cols-12 items-center" : "grid-cols-1"
              }`}
            >
              <div className={viewport === "desktop" ? "col-span-7" : ""}>
                <span className="font-mono text-[9px] tracking-wider text-accent uppercase">
                  Custom Architecture
                </span>
                <p className="mt-1 font-display text-base leading-tight font-bold text-ink">
                  Clear offer above the fold. Fast on every screen.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-medium text-paper">
                    Book Now
                  </span>
                  <span className="rounded-full border border-rule px-3 py-1 text-[10px] text-slate">
                    Services
                  </span>
                </div>
              </div>
              <div
                className={`border border-rule bg-pine p-3 text-paper ${
                  viewport === "desktop" ? "col-span-5" : ""
                }`}
              >
                <p className="font-mono text-[9px] text-accent uppercase">
                  Technical Health
                </p>
                <p className="mt-1 text-xs font-medium">
                  Semantic HTML, accessible contrast &amp; clean URLs
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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
          Workflow App Simulation · Sample Operations UI
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-pine uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-pine" />
          Maintained &amp; Upgradeable
        </span>
      </div>

      {/* Interactive workflow status tabs */}
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
              className={`border px-3 py-2 text-xs font-medium transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-paper text-slate hover:text-ink"
              }`}
            >
              {statusTab.label}
            </button>
          );
        })}
      </div>

      {/* Simulated task rows */}
      <div className="space-y-2">
        {itemsByTab[tab].map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between border border-rule bg-paper px-4 py-3"
          >
            <div>
              <span className="font-mono text-[10px] text-accent">{row.id}</span>
              <p className="text-xs font-semibold text-ink">{row.title}</p>
            </div>
            <span className="rounded-full border border-rule bg-linen px-2.5 py-0.5 font-mono text-[10px] text-ink">
              {row.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Interactive social media content planning and post framing showcase. */
function SocialMediaDemo() {
  const [selectedDay, setSelectedDay] = useState(0);
  const schedule = [
    {
      day: "MON",
      format: "Product Spotlight",
      headline: "Introduce a flagship service with clear customer benefit.",
      tone: "bg-pine text-paper",
    },
    {
      day: "WED",
      format: "Behind the Craft",
      headline: "Show real workspace details that build authentic local trust.",
      tone: "bg-ink text-paper",
    },
    {
      day: "FRI",
      format: "Customer Guide",
      headline: "Answer a frequent buyer question with branded graphics.",
      tone: "bg-accent text-paper",
    },
  ];

  const activePost = schedule[selectedDay];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
          Editorial Calendar &amp; Brand Post System
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-accent uppercase">
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
              className={`border p-2.5 text-left transition-colors ${
                isSelected
                  ? "border-accent bg-paper"
                  : "border-rule bg-paper/60 hover:border-ink/40"
              }`}
            >
              <span className="font-mono text-[10px] text-accent">{slot.day}</span>
              <span className="mt-0.5 block truncate text-xs font-semibold text-ink">
                {slot.format}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
        <div className={`flex flex-col justify-between p-4 sm:col-span-6 ${activePost.tone}`}>
          <span className="font-mono text-[10px] uppercase opacity-75">
            {activePost.day} · Branded Frame
          </span>
          <p className="mt-4 font-display text-base leading-snug font-bold">
            {activePost.format}
          </p>
          <span className="mt-4 font-mono text-[10px] uppercase opacity-75">
            1080 × 1350 Ready
          </span>
        </div>
        <div className="border border-rule bg-paper p-4 sm:col-span-6">
          <p className="font-mono text-[10px] text-slate uppercase">
            Planned Copy &amp; Schedule
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink">
            {activePost.headline}
          </p>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-pine">
            <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Approved &amp; queued for publishing
          </div>
        </div>
      </div>
    </div>
  );
}

/** Interactive NFC tap card and QR scan simulation showing customer review capture. */
function NfcQrDemo() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
          Physical-to-Digital Review Flow Simulation
        </span>
        <button
          type="button"
          onClick={() => setScanned((prev) => !prev)}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1 text-[11px] font-medium text-paper transition-colors hover:bg-accent-hover"
        >
          <Wifi className="h-3 w-3 rotate-90" aria-hidden="true" />
          {scanned ? "Reset Demo" : "Simulate Tap / Scan"}
        </button>
      </div>

      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
        {/* Branded physical NFC + QR counter card */}
        <div className="relative overflow-hidden rounded-lg bg-ink p-5 text-paper sm:col-span-7">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs font-bold tracking-wider uppercase">
              Your Business<span className="text-accent">.</span>
            </span>
            <Wifi
              className={`h-4 w-4 rotate-90 transition-transform duration-300 ${
                scanned ? "scale-125 text-accent" : "text-paper/70"
              }`}
              aria-hidden="true"
            />
          </div>

          <p className="mt-4 font-display text-base leading-snug font-semibold">
            Enjoyed your visit? Tap or scan to leave a Google review.
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-mono text-[10px] text-paper/65 uppercase">
              NFC + Direct QR Link
            </span>
            {/* Clean vector QR pattern */}
            <div className="grid grid-cols-3 gap-1 rounded bg-paper p-1.5">
              {[1, 1, 0, 1, 0, 1, 0, 1, 1].map((filled, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 ${
                    filled ? "bg-ink" : "bg-accent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Simulated customer smartphone screen */}
        <div className="border-2 border-ink bg-paper p-4 sm:col-span-5">
          <div className="mb-2 flex items-center justify-between border-b border-rule pb-2">
            <span className="font-mono text-[9px] text-slate uppercase">
              Customer Phone
            </span>
            <span
              className={`h-2 w-2 rounded-full ${
                scanned ? "bg-pine" : "bg-rule"
              }`}
            />
          </div>

          {scanned ? (
            <div className="space-y-2 py-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-pine">
                <CheckCircle2 className="h-4 w-4 text-accent" aria-hidden="true" />
                Review link opened
              </div>
              <p className="text-[11px] leading-relaxed text-slate">
                Customer lands straight on your verified review screen in one tap.
              </p>
            </div>
          ) : (
            <div className="space-y-2 py-1">
              <p className="text-xs font-medium text-ink">Ready at counter</p>
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

/** Interactive infrastructure and support care topology panel. */
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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
        <span className="font-mono text-[10px] tracking-[0.08em] text-slate uppercase">
          Connected Digital Infrastructure Care
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-pine uppercase">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Single Support Contact
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const active = index === activeLayer;
          return (
            <button
              key={layer.name}
              type="button"
              onClick={() => setActiveLayer(index)}
              aria-pressed={active}
              className={`flex items-center gap-2.5 border p-3 text-left text-xs font-medium transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-paper text-ink hover:border-ink/40"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  active ? "text-accent" : "text-slate"
                }`}
                aria-hidden="true"
              />
              <span>{layer.name}</span>
            </button>
          );
        })}
      </div>

      <div className="border border-rule bg-paper p-4">
        <p className="font-mono text-[10px] text-accent uppercase">
          Supported Layer · {selected.name}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-ink">
          {selected.detail}
        </p>
      </div>
    </div>
  );
}

/** Dispatches and animates the interactive visual demonstration matching each Web Guru service category. */
export function ServiceDemonstration({ kind }: ServiceDemonstrationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border border-rule bg-linen p-4 sm:p-5">
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
