"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { SITE_CONFIG } from "@/config/site";

interface OverlayRoutePreview {
  href: string;
  label: string;
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
}

const OVERLAY_PREVIEWS: OverlayRoutePreview[] = [
  {
    href: "/",
    label: "Home",
    number: "01",
    eyebrow: "7-Scene Digital Experience",
    title: "One Partner For Your Entire Online Presence",
    summary:
      "Local discovery, custom websites, workflow apps, social media craft, NFC/QR review stands, and ongoing care under one 4-member roof.",
  },
  {
    href: "/work",
    label: "Our Work",
    number: "03",
    eyebrow: "Concept Blueprints & Architecture",
    title: "Concept Showcases Ready For Real Businesses",
    summary:
      "Transparent demonstration concepts showing how hospitality, retail, advisory firms, and operations teams connect physical and digital experiences.",
  },
  {
    href: "/about",
    label: "About",
    number: "04",
    eyebrow: "Compact Studio Structure",
    title: "Four Specialists. Direct Access. Zero Agency Layers.",
    summary:
      "You speak directly with the designers and engineers building, launching, and supporting your online systems.",
  },
  {
    href: "/contact",
    label: "Contact",
    number: "05",
    eyebrow: "Start A Conversation",
    title: "Clear Scope & Practical Recommendations",
    summary:
      "Tell us what your business needs next—from fixing local maps visibility to launching a bespoke web or mobile application.",
  },
];

/** Renders Neo-Brutalist bordered fixed header chrome paired with the preserved full-screen split editorial studio menu overlay. */
export function Navbar() {
  const pathname = usePathname();
  const { reducedMotion } = useCinemaEngine();
  const [overlayPathname, setOverlayPathname] = useState<string | null>(null);
  const [hoveredRouteHref, setHoveredRouteHref] = useState<string>(pathname);
  const [hasScrolled, setHasScrolled] = useState(false);

  const menuOpen = overlayPathname === pathname;
  const activePreview =
    OVERLAY_PREVIEWS.find((item) => item.href === hoveredRouteHref) ||
    OVERLAY_PREVIEWS[0];

  // Track vertical scroll threshold cleanly.
  useEffect(() => {
    /** Updates header border elevation flag on scroll. */
    function handleScroll() {
      setHasScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preserve Escape-key dismissal and scroll lock when overlay is open.
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    /** Closes the full-screen menu overlay when Escape is pressed. */
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOverlayPathname(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  /** Checks whether a navigation link corresponds to the active route. */
  function isActiveRoute(href: string): boolean {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  /** Toggles the full-screen overlay menu open or closed cleanly. */
  function toggleOverlay() {
    setHoveredRouteHref(pathname);
    setOverlayPathname(menuOpen ? null : pathname);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          hasScrolled || pathname !== "/"
            ? "border-b border-white/10 bg-[#100B18]/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Keyboard accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#5227FF] focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:font-semibold focus:text-[#F5F1FA]"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex h-18 max-w-[92rem] items-center justify-between gap-6 px-6 sm:px-10 lg:px-14">
          {/* Minimal brand mark */}
          <div className="flex items-center">
            <Logo inverted size="md" />
          </div>

          {/* Clean editorial navigation links */}
          <nav
            aria-label="Primary site navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {SITE_CONFIG.navigation.map((item) => {
              const active = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 font-sans text-xs font-medium tracking-[0.08em] uppercase transition-colors ${
                    active
                      ? "text-[#F5F1FA]"
                      : "text-[#B8ADC9] hover:text-[#F5F1FA]"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#5227FF]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Restrained contact link + mobile menu trigger */}
          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              data-cursor="ENQUIRE"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-sans text-xs font-medium text-[#F5F1FA] transition-colors hover:border-[#B497CF]/50 hover:bg-[#5227FF]/25 sm:inline-flex"
            >
              Start a Project
              <ArrowUpRight className="h-3.5 w-3.5 text-[#FF9FFC]" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={toggleOverlay}
              aria-expanded={menuOpen}
              aria-controls="studio-navigation-overlay"
              aria-label={menuOpen ? "Close studio menu" : "Open studio menu"}
              data-cursor={menuOpen ? "CLOSE" : "MENU"}
              className="inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.08em] text-[#F5F1FA] uppercase transition-colors hover:text-[#FF9FFC] lg:hidden"
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : null}
            </button>
          </div>
        </div>

        <ScrollProgressBar />
      </header>

      {/* Full-Screen Split Editorial Overlay — exact clipPath animation & staggered reveals preserved */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="studio-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Full studio navigation menu"
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.96 }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.96 }
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-[#100B18]/95 text-[#F5F1FA] backdrop-blur-xl"
          >
            <div className="mx-auto flex min-h-full max-w-[92rem] flex-col justify-between px-6 py-10 sm:px-10 lg:px-14">
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col divide-y divide-white/10 border-y border-white/10"
              >
                {OVERLAY_PREVIEWS.map((item, idx) => {
                  const active = isActiveRoute(item.href);

                  return (
                    <motion.div
                      key={item.href}
                      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: reducedMotion ? 0 : 0.04 + idx * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHoveredRouteHref(item.href)}
                        onFocus={() => setHoveredRouteHref(item.href)}
                        onClick={() => setOverlayPathname(null)}
                        className={`group flex min-h-[56px] items-center justify-between py-5 transition-colors ${
                          active
                            ? "text-[#FF9FFC]"
                            : "text-[#F5F1FA] hover:text-[#B497CF]"
                        }`}
                      >
                        <span className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                          {item.label}
                        </span>

                        <ArrowUpRight
                          className={`h-5 w-5 transition-transform duration-200 ${
                            active
                              ? "text-[#FF9FFC]"
                              : "text-[#91869F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F5F1FA]"
                          }`}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-8 flex flex-col gap-6 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#C7BDD5]">
                  {activePreview.summary}
                </p>

                <Link
                  href="/contact"
                  onClick={() => setOverlayPathname(null)}
                  className="inline-flex min-h-[44px] w-fit shrink-0 items-center gap-2 rounded-full bg-[#5227FF] px-6 py-3 font-sans text-xs font-semibold text-[#F5F1FA] transition-colors hover:bg-[#FF9FFC] hover:text-[#100B18]"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
