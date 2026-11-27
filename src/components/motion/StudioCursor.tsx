"use client";

import { useEffect, useRef, useState } from "react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";

/** Renders a fine-pointer desktop Neo-Brutalist cursor stamp that labels interactive elements via data-cursor without altering tracking physics. */
export function StudioCursor() {
  const { reducedMotion } = useCinemaEngine();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches || reducedMotion) {
      return;
    }

    const cursorEl = cursorRef.current;
    if (!cursorEl) {
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId = 0;

    /** Tracks pointer coordinates and detects nearest data-cursor attribute cleanly. */
    function handlePointerMove(event: MouseEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
      setVisible(true);

      const element =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cursor]")
          : null;
      const nextLabel = element?.getAttribute("data-cursor") || "";
      setCursorLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    }

    /** Hides the cursor marker when pointer leaves viewport bounds. */
    function handleMouseLeave() {
      setVisible(false);
    }

    /** Interpolates custom cursor coordinates smoothly on every animation frame. */
    function renderTick() {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = window.requestAnimationFrame(renderTick);
    }

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = window.requestAnimationFrame(renderTick);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 lg:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {cursorLabel ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B497CF]/50 bg-[#171027]/85 px-3 py-1 font-sans text-[11px] font-medium text-[#F5F1FA] backdrop-blur-sm">
          {cursorLabel}
        </span>
      ) : (
        <span className="block h-3 w-3 rounded-full bg-[#A78BFA]/80 shadow-[0_0_12px_rgba(167,139,250,0.65)]" />
      )}
    </div>
  );
}
