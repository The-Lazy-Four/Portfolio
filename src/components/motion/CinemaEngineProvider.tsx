"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export interface SceneMeta {
  number: string;
  title: string;
  targetId: string;
}

export const HOMEPAGE_SCENES: SceneMeta[] = [
  { number: "01", title: "Opening", targetId: "scene-opening" },
  { number: "02", title: "What We Do", targetId: "scene-what-we-do" },
  { number: "03", title: "Selected Work", targetId: "scene-work" },
  { number: "04", title: "The People", targetId: "scene-studio" },
  { number: "05", title: "Contact", targetId: "contact" },
];

interface CinemaEngineContextValue {
  activeSceneIndex: number;
  scrollProgress: number;
  reducedMotion: boolean;
  setActiveSceneIndex: (index: number) => void;
  scrollToTarget: (target: string | HTMLElement | number) => void;
}

const CinemaEngineContext = createContext<CinemaEngineContextValue>({
  activeSceneIndex: 0,
  scrollProgress: 0,
  reducedMotion: false,
  setActiveSceneIndex: () => {},
  scrollToTarget: () => {},
});

/** Exposes Lenis smooth-scroll helpers, active homepage scene tracking, and reduced-motion state. */
export function useCinemaEngine() {
  return useContext(CinemaEngineContext);
}

/** Coordinates GSAP ScrollTrigger with Lenis smooth scrolling while respecting reduced motion preferences. */
export function CinemaEngineProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Sync system reduced-motion setting dynamically without violating React effect rules.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    /** Updates local reducedMotion flag when OS motion setting changes. */
    function handleMediaChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }

    const rafId = window.requestAnimationFrame(() => {
      setReducedMotion(mediaQuery.matches);
    });

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      window.cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Initialize Lenis smooth scroll linked tightly into GSAP's ticker.
  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    /** Keeps GSAP ScrollTrigger synchronized whenever Lenis advances scroll position. */
    function onLenisScroll(event: { progress?: number }) {
      ScrollTrigger.update();
      if (typeof event.progress === "number" && !Number.isNaN(event.progress)) {
        setScrollProgress(event.progress);
      }
    }

    lenis.on("scroll", onLenisScroll);

    /** Drives Lenis inside GSAP's shared animation frame ticker. */
    function updateLenisFromTicker(timeSeconds: number) {
      lenis.raf(timeSeconds * 1000);
    }

    gsap.ticker.add(updateLenisFromTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(updateLenisFromTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Refresh ScrollTrigger boundaries cleanly whenever Next.js changes route or layout settles.
  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    /** Tracks homepage scroll progress even when reduced motion bypasses Lenis. */
    function handleNativeScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / scrollable)));
      }
    }

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("scroll", handleNativeScroll);
    };
  }, [pathname]);

  /** Scrolls smoothly via Lenis (or native fallback under reduced motion) to a selector, element, or vertical pixel offset. */
  const scrollToTarget = useCallback(
    (target: string | HTMLElement | number) => {
      if (typeof target === "number") {
        if (lenisRef.current && !reducedMotion) {
          lenisRef.current.scrollTo(target, { duration: 0.9 });
          return;
        }
        window.scrollTo({ top: target, behavior: "auto" });
        return;
      }

      const element =
        typeof target === "string" ? document.querySelector(target) : target;

      if (!(element instanceof HTMLElement)) {
        return;
      }

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(element, { offset: -76, duration: 1.0 });
        return;
      }

      element.scrollIntoView({ behavior: "auto", block: "start" });
    },
    [reducedMotion]
  );

  return (
    <CinemaEngineContext.Provider
      value={{
        activeSceneIndex,
        scrollProgress,
        reducedMotion,
        setActiveSceneIndex,
        scrollToTarget,
      }}
    >
      {children}
    </CinemaEngineContext.Provider>
  );
}
