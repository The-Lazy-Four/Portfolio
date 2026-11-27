"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Monitor,
  Server,
  Smartphone,
  Star,
  Wifi,
} from "lucide-react";
import type { ServiceDiagramKind } from "@/data/services";

interface ServiceDemonstrationProps {
  kind: ServiceDiagramKind;
}

/** 01 — Local Visibility & Maps: Open cinematic "From invisible to discoverable" visual story. */
function LocalSeoStory() {
  const [discovered, setDiscovered] = useState(true);
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative py-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <p className="font-serif text-xl italic text-[#D8C5F2] sm:text-2xl">
          &ldquo;local bakery near me&rdquo;
        </p>

        <div className="flex items-center gap-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setDiscovered(false)}
            className={`pb-1 transition-colors ${
              !discovered
                ? "border-b border-[#FF9FFC] text-[#F5F1FA]"
                : "text-[#91869F] hover:text-[#F5F1FA]"
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setDiscovered(true)}
            className={`pb-1 transition-colors ${
              discovered
                ? "border-b border-[#5227FF] text-[#F5F1FA]"
                : "text-[#91869F] hover:text-[#F5F1FA]"
            }`}
          >
            With Web Guru
          </button>
        </div>
      </div>

      {/* Open geographical route & location reveal */}
      <div className="relative mt-6 flex min-h-[220px] flex-col justify-between overflow-hidden py-4 sm:min-h-[250px]">
        <svg
          viewBox="0 0 480 200"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
        >
          <path
            d="M20 155 C 110 140, 150 65, 240 85 C 320 105, 360 35, 460 55"
            stroke="url(#routeGrad)"
            strokeWidth="1.5"
            strokeDasharray={discovered ? "0" : "5 6"}
          />
          <path
            d="M40 45 C 140 80, 210 150, 320 125 C 390 110, 420 155, 470 145"
            stroke="rgba(180,151,207,0.22)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5227FF" stopOpacity="0.2" />
              <stop offset="55%" stopColor="#B497CF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FF9FFC" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : { scale: discovered ? 1 : 0.85, opacity: discovered ? 1 : 0.45 }
            }
            transition={{ duration: 0.35 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5227FF]/25 text-[#FF9FFC] ring-1 ring-[#B497CF]/40"
          >
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </motion.div>

          <div>
            <p className="font-display text-xl font-semibold text-[#F5F1FA] sm:text-2xl">
              {discovered ? "Your Local Business" : "Hard to find nearby"}
            </p>
            <p className="mt-1 text-sm text-[#C7BDD5]">
              {discovered
                ? "Clear hours, directions, and photos right where customers search."
                : "Missing hours, unclear location, and buried below competitors."}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs text-[#C7BDD5]">
          <span className="inline-flex items-center gap-1.5 text-[#FF9FFC]">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          </span>
          <span>
            {discovered
              ? "Directions, calls, and website visits in one tap"
              : "Customers move on to the next listing"}
          </span>
        </div>
      </div>
    </div>
  );
}

/** 02 — Websites That Convert: Open responsive website composition. */
function WebsitePreviewStory() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="py-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xs font-medium text-[#B497CF]">
          Responsive storefront experience
        </span>
        <div className="flex items-center gap-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`inline-flex items-center gap-1.5 pb-1 transition-colors ${
              device === "desktop"
                ? "border-b border-[#5227FF] text-[#F5F1FA]"
                : "text-[#91869F] hover:text-[#F5F1FA]"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`inline-flex items-center gap-1.5 pb-1 transition-colors ${
              device === "mobile"
                ? "border-b border-[#5227FF] text-[#F5F1FA]"
                : "text-[#91869F] hover:text-[#F5F1FA]"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            Mobile
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`overflow-hidden rounded-xl bg-gradient-to-br from-[#171027]/90 to-[#241542]/70 p-6 backdrop-blur-md ring-1 ring-white/10 ${
            device === "mobile" ? "w-full max-w-[300px]" : "w-full"
          }`}
        >
          <p className="text-xs font-medium text-[#FF9FFC]">yourbusiness.com</p>
          <h4 className="mt-3 font-display text-xl leading-snug font-semibold text-[#F5F1FA] sm:text-2xl">
            Clear offer above the fold. Fast on every screen.
          </h4>
          <p className="mt-2 text-sm text-[#C7BDD5]">
            Visitors immediately see what you do, why they can trust you, and
            how to get in touch.
          </p>
          <div className="mt-6 flex items-center gap-5 text-xs font-semibold">
            <span className="rounded-full bg-[#5227FF] px-4 py-2 text-[#F5F1FA]">
              Book a Visit
            </span>
            <span className="text-[#D8C5F2]">See Services &rarr;</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** 03 — Custom Web & Mobile Apps: Open workflow progression visual. */
function WorkflowAppStory() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      label: "Customer Request",
      title: "Client books or submits online",
      detail: "No lost messages or manual spreadsheets.",
    },
    {
      label: "Team Action",
      title: "Your team updates progress in one place",
      detail: "Everyone sees the latest status instantly.",
    },
    {
      label: "Completed",
      title: "Automatic confirmation sent",
      detail: "Customers stay informed without extra phone calls.",
    },
  ];

  return (
    <div className="py-4">
      <div className="flex flex-wrap gap-6 border-b border-white/10 pb-4">
        {steps.map((step, index) => (
          <button
            key={step.label}
            type="button"
            onClick={() => setActiveStep(index)}
            className={`pb-1 text-xs font-medium transition-colors ${
              activeStep === index
                ? "border-b border-[#FF9FFC] text-[#F5F1FA]"
                : "text-[#91869F] hover:text-[#F5F1FA]"
            }`}
          >
            0{index + 1} · {step.label}
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs font-medium text-[#B497CF]">
              Step 0{activeStep + 1}
            </p>
            <h4 className="mt-2 font-display text-2xl font-semibold text-[#F5F1FA]">
              {steps[activeStep].title}
            </h4>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#C7BDD5]">
              {steps[activeStep].detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** 04 — Social Media Management: Dynamic editorial content format switcher. */
function SocialStory() {
  const [format, setFormat] = useState<"feed" | "story" | "reel">("feed");
  const formats = {
    feed: {
      title: "Consistent visual identity",
      caption: "Cohesive posts that make your brand recognizable at a glance.",
    },
    story: {
      title: "Daily offers & updates",
      caption: "Timely stories that keep local customers coming back.",
    },
    reel: {
      title: "Short-form storytelling",
      caption: "Engaging reels showcasing your products, space, and team.",
    },
  };

  return (
    <div className="py-4">
      <div className="flex gap-6 border-b border-white/10 pb-4 text-xs font-medium">
        {(["feed", "story", "reel"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFormat(item)}
            className={`capitalize pb-1 transition-colors ${
              format === item
                ? "border-b border-[#5227FF] text-[#F5F1FA]"
                : "text-[#91869F] hover:text-[#F5F1FA]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-serif text-3xl italic text-[#FF9FFC]">
            {formats[format].title}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#C7BDD5]">
            {formats[format].caption}
          </p>
        </div>
        <span className="text-xs font-medium text-[#B497CF]">
          Planned · Designed · Published
        </span>
      </div>
    </div>
  );
}

/** 05 — NFC & QR Review Solutions: Physical tap-to-review interaction. */
function NfcQrStory() {
  const [tapped, setTapped] = useState(false);

  return (
    <div className="py-4">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xs rounded-2xl bg-gradient-to-br from-[#241542] to-[#100B18] p-6 ring-1 ring-white/15">
          <div className="flex items-center justify-between text-[#FF9FFC]">
            <span className="font-display text-sm font-semibold text-[#F5F1FA]">
              Web Guru NFC
            </span>
            <Wifi className="h-4 w-4 rotate-90" aria-hidden="true" />
          </div>
          <p className="mt-5 font-display text-lg font-semibold text-[#F5F1FA]">
            Enjoyed your visit? Tap to leave a review.
          </p>
          <button
            type="button"
            onClick={() => setTapped((prev) => !prev)}
            className="mt-6 text-xs font-semibold text-[#B497CF] underline decoration-[#5227FF] underline-offset-4 hover:text-[#FF9FFC]"
          >
            {tapped ? "Reset tap preview" : "Simulate customer tap →"}
          </button>
        </div>

        <div className="flex-1">
          <p className="text-xs font-medium text-[#B497CF]">
            {tapped ? "Review page opened" : "Ready at your counter"}
          </p>
          <h4 className="mt-2 font-display text-xl font-semibold text-[#F5F1FA]">
            {tapped
              ? "Straight to your Google review form in one tap."
              : "No searching. No awkward links."}
          </h4>
          <p className="mt-2 text-sm text-[#C7BDD5]">
            {tapped
              ? "Happy customers leave feedback in seconds before they walk out."
              : "Place a sleek NFC card or QR stand at your desk or dining table."}
          </p>
        </div>
      </div>
    </div>
  );
}

/** 06 — Dependable Tech Care: Connected digital infrastructure visual. */
function SupportStory() {
  const pillars = [
    { icon: Globe, label: "Domain & Hosting" },
    { icon: Server, label: "Website Updates" },
    { icon: Mail, label: "Business Email" },
    { icon: CheckCircle2, label: "Direct Support" },
  ];

  return (
    <div className="py-4">
      <p className="font-serif text-2xl italic text-[#D8C5F2]">
        Everything connected, monitored, and cared for.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="space-y-2 border-t border-white/10 pt-4">
              <Icon className="h-5 w-5 text-[#FF9FFC]" aria-hidden="true" />
              <p className="text-sm font-medium text-[#F5F1FA]">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Renders the open cinematic visual storytelling experience for each of the six Web Guru services. */
export function ServiceDemonstration({ kind }: ServiceDemonstrationProps) {
  switch (kind) {
    case "local-seo":
      return <LocalSeoStory />;
    case "web-dev":
      return <WebsitePreviewStory />;
    case "app-dev":
      return <WorkflowAppStory />;
    case "social-media":
      return <SocialStory />;
    case "nfc-qr":
      return <NfcQrStory />;
    case "tech-support":
      return <SupportStory />;
    default:
      return <LocalSeoStory />;
  }
}
