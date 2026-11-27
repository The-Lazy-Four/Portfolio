"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface ProcessStageVisualProps {
  stageIndex: number;
}

/** Renders the Neo-Brutalist architectural schematic inside the Process stage panel with preserved transition timing. */
export function ProcessStageVisual({ stageIndex }: ProcessStageVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-2 border-ivory bg-ink p-4">
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
              <rect x="96" y="21" width="128" height="128" stroke="#3155F5" strokeWidth="2" strokeDasharray="5 5" />
              <circle cx="160" cy="85" r="42" stroke="#E9FF45" strokeWidth="2.2" />
              <line x1="60" y1="85" x2="260" y2="85" stroke="#F5F0E6" strokeOpacity="0.35" />
              <line x1="160" y1="12" x2="160" y2="158" stroke="#F5F0E6" strokeOpacity="0.35" />
              <rect x="152" y="77" width="16" height="16" fill="#F0522B" stroke="#F5F0E6" strokeWidth="1.5" />
              <rect x="192" y="58" width="8" height="8" fill="#E9FF45" />
              <rect x="118" y="106" width="8" height="8" fill="#E9FF45" />
            </svg>
          )}

          {stageIndex === 1 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              <rect x="28" y="34" width="76" height="42" fill="#3155F5" stroke="#F5F0E6" strokeWidth="2" />
              <rect x="122" y="64" width="76" height="42" fill="#E9FF45" stroke="#151515" strokeWidth="2" />
              <rect x="216" y="94" width="76" height="42" fill="#F0522B" stroke="#F5F0E6" strokeWidth="2" />
              <path d="M104 55H160V64M198 85H254V94" stroke="#E9FF45" strokeWidth="2" strokeDasharray="4 3" />
            </svg>
          )}

          {stageIndex === 2 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              <rect x="44" y="24" width="164" height="122" fill="#3155F5" stroke="#F5F0E6" strokeWidth="2" />
              <rect x="62" y="42" width="84" height="12" fill="#E9FF45" />
              <rect x="62" y="64" width="124" height="7" fill="#F5F0E6" fillOpacity="0.55" />
              <rect x="62" y="78" width="102" height="7" fill="#F5F0E6" fillOpacity="0.4" />
              <rect x="62" y="98" width="70" height="24" fill="#F0522B" stroke="#151515" strokeWidth="1.5" />
              <rect x="184" y="48" width="92" height="92" fill="#151515" stroke="#E9FF45" strokeWidth="2.5" />
              <rect x="216" y="80" width="28" height="28" stroke="#F5F0E6" strokeWidth="2" />
              <rect x="226" y="90" width="8" height="8" fill="#F0522B" />
            </svg>
          )}

          {stageIndex === 3 && (
            <svg viewBox="0 0 320 170" fill="none" className="h-auto w-full" aria-hidden="true">
              <path d="M56 122 L116 96 L176 74 L264 38" stroke="#E9FF45" strokeWidth="3" />
              <rect x="50" y="116" width="12" height="12" fill="#F5F0E6" stroke="#151515" strokeWidth="1.5" />
              <rect x="110" y="90" width="12" height="12" fill="#3155F5" stroke="#F5F0E6" strokeWidth="1.5" />
              <rect x="170" y="68" width="12" height="12" fill="#F0522B" stroke="#F5F0E6" strokeWidth="1.5" />
              <rect x="256" y="30" width="16" height="16" fill="#E9FF45" stroke="#151515" strokeWidth="2" />
              <line x1="40" y1="142" x2="280" y2="142" stroke="#F5F0E6" strokeOpacity="0.4" strokeWidth="2" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
