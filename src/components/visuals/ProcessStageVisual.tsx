"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface ProcessStageVisualProps {
  stageIndex: number;
}

/** Renders a bespoke architectural blueprint graphic inside the sticky Process panel for each stage (01-04). */
export function ProcessStageVisual({ stageIndex }: ProcessStageVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border border-paper/15 bg-pine-soft/40 p-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={stageIndex}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {stageIndex === 0 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              {/* Stage 01 Discover: Diagnostic audit rings & focus crosshair */}
              <circle cx="160" cy="85" r="64" stroke="#F6F3EC" strokeOpacity="0.2" strokeDasharray="4 4" />
              <circle cx="160" cy="85" r="42" stroke="#D94E28" strokeWidth="1.6" />
              <line x1="72" y1="85" x2="248" y2="85" stroke="#F6F3EC" strokeOpacity="0.2" />
              <line x1="160" y1="14" x2="160" y2="156" stroke="#F6F3EC" strokeOpacity="0.2" />
              <circle cx="160" cy="85" r="8" fill="#D94E28" />
              <circle cx="195" cy="62" r="4" fill="#F6F3EC" />
              <circle cx="122" cy="108" r="4" fill="#F6F3EC" />
            </svg>
          )}

          {stageIndex === 1 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              {/* Stage 02 Strategize: Connected roadmap architecture */}
              <rect x="28" y="34" width="76" height="42" rx="4" stroke="#F6F3EC" strokeOpacity="0.4" />
              <rect x="122" y="64" width="76" height="42" rx="4" fill="#D94E28" />
              <rect x="216" y="94" width="76" height="42" rx="4" stroke="#F6F3EC" strokeOpacity="0.4" />
              <path d="M104 55H160V64M198 85H254V94" stroke="#F6F3EC" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="160" cy="85" r="5" fill="#F6F3EC" />
            </svg>
          )}

          {stageIndex === 2 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              {/* Stage 03 Build & Implement: Layered interface & system assembly */}
              <rect x="44" y="24" width="164" height="122" rx="6" fill="#F6F3EC" fillOpacity="0.1" stroke="#F6F3EC" strokeOpacity="0.35" />
              <rect x="62" y="42" width="84" height="10" rx="2" fill="#F6F3EC" />
              <rect x="62" y="62" width="124" height="6" rx="2" fill="#F6F3EC" fillOpacity="0.4" />
              <rect x="62" y="76" width="102" height="6" rx="2" fill="#F6F3EC" fillOpacity="0.3" />
              <rect x="62" y="98" width="66" height="22" rx="11" fill="#D94E28" />
              <rect x="184" y="48" width="92" height="92" rx="8" fill="#161A18" stroke="#D94E28" strokeWidth="1.5" />
              <circle cx="230" cy="94" r="14" stroke="#F6F3EC" strokeWidth="1.8" />
              <circle cx="230" cy="94" r="4" fill="#D94E28" />
            </svg>
          )}

          {stageIndex === 3 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              {/* Stage 04 Manage & Grow: Continuous stewardship loop */}
              <path d="M56 122 L116 96 L176 74 L264 38" stroke="#D94E28" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="56" cy="122" r="5" fill="#F6F3EC" />
              <circle cx="116" cy="96" r="5" fill="#F6F3EC" />
              <circle cx="176" cy="74" r="5" fill="#F6F3EC" />
              <circle cx="264" cy="38" r="7" fill="#D94E28" />
              <line x1="40" y1="140" x2="280" y2="140" stroke="#F6F3EC" strokeOpacity="0.25" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
