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
        <span className="inline-flex items-center gap-1.5 border-2 border-ink bg-acid px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
          <span className="h-1.5 w-1.5 bg-cobalt" />
          {cursorLabel}
        </span>
      ) : (
        <span className="block h-3 w-3 border-2 border-ink bg-acid shadow-[2px_2px_0px_#151515]" />
      )}
    </div>
  );
}
