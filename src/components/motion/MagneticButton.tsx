"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Applies a subtle pointer-only magnetic offset on desktop devices while staying static on touch or reduced motion. */
export function MagneticButton({
  children,
  className = "",
  strength = 0.18,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Track pointer position relative to the wrapper center only on fine-pointer desktops.
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const element = wrapperRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const deltaX = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const deltaY = (event.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x: deltaX, y: deltaY });
  }

  // Return smoothly to rest position when the pointer leaves.
  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}
