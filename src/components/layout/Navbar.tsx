"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import {
  HOMEPAGE_SCENES,
  useCinemaEngine,
} from "@/components/motion/CinemaEngineProvider";
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
    href: "/services",
    label: "Services",
    number: "02",
    eyebrow: "Six Connected Disciplines",
    title: "Built Together So Nothing Falls Between Vendors",
    summary:
      "Explore interactive demos across Google Business Profile & Local SEO, Websites, Apps, Social Media, NFC/QR Reviews, and Technical Support.",
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
  const { activeSceneIndex, reducedMotion } = useCinemaEngine();
  const [overlayPathname, setOverlayPathname] = useState<string | null>(null);
  const [hoveredRouteHref, setHoveredRouteHref] = useState<string>(pathname);
  const [hasScrolled, setHasScrolled] = useState(false);

  const menuOpen = overlayPathname === pathname;
  const activeScene = HOMEPAGE_SCENES[activeSceneIndex] || HOMEPAGE_SCENES[0];
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
        className={`fixed inset-x-0 top-0 z-50 border-b-2 border-ink transition-colors duration-150 ${
          hasScrolled ? "bg-ivory" : "bg-ivory/95"
        }`}
      >
        {/* Keyboard accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:border-2 focus:border-ink focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:text-ink"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex h-18 max-w-[92rem] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          {/* Left Neo-Brutalist logo + scene stamp */}
          <div className="flex items-center gap-4">
            <Logo size="md" />
            {pathname === "/" && (
              <span className="hidden items-center gap-2 border-2 border-ink bg-acid px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.1em] text-ink uppercase shadow-[2px_2px_0px_#151515] 2xl:inline-flex">
                <span className="h-2 w-2 bg-cobalt" aria-hidden="true" />
                Scene {activeScene.number} · {activeScene.title}
              </span>
            )}
          </div>

          {/* Center structured brutalist navigation strip */}
          <nav
            aria-label="Primary site navigation"
            className="hidden items-stretch divide-x-2 divide-ink border-2 border-ink bg-concrete shadow-[4px_4px_0px_#151515] lg:flex"
          >
            {SITE_CONFIG.navigation.map((item) => {
              const active = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs font-bold tracking-[0.06em] uppercase transition-colors ${
                    active
                      ? "bg-cobalt text-ivory"
                      : "bg-ivory text-ink hover:bg-acid"
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      className="h-2 w-2 border border-ink bg-acid"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right brutalist action cluster */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              data-cursor="ENQUIRE"
              className="wg-brutal-btn hidden items-center gap-2 border-2 border-ink bg-orange px-4 py-2 font-mono text-xs font-bold tracking-[0.08em] text-ivory uppercase sm:inline-flex"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={toggleOverlay}
              aria-expanded={menuOpen}
              aria-controls="studio-navigation-overlay"
              aria-label={menuOpen ? "Close studio menu" : "Open studio menu"}
              data-cursor={menuOpen ? "CLOSE" : "MENU"}
              className={`wg-brutal-btn inline-flex items-center gap-2 border-2 border-ink px-4 py-2 font-mono text-xs font-bold tracking-[0.1em] uppercase ${
                menuOpen
                  ? "bg-acid text-ink"
                  : "bg-ink text-ivory hover:bg-cobalt"
              }`}
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <span className="grid grid-cols-2 gap-0.5" aria-hidden="true">
                  <span className="h-1.5 w-1.5 bg-acid" />
                  <span className="h-1.5 w-1.5 bg-ivory" />
                  <span className="h-1.5 w-1.5 bg-ivory" />
                  <span className="h-1.5 w-1.5 bg-orange" />
                </span>
              )}
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
                : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.98 }
            }
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
            }
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.98 }
            }
            transition={{ duration: 0.44, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t-2 border-ink bg-ink text-ivory"
          >
            <div className="wg-grid-pattern-dark mx-auto grid min-h-full max-w-[92rem] grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-14">
              {/* Left electric-cobalt preview block with hard Acid Yellow shadow */}
              <div className="hidden flex-col justify-between border-2 border-ivory bg-cobalt p-8 shadow-[8px_8px_0px_#E9FF45] lg:col-span-5 lg:flex">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-ivory/30 pb-4">
                    <span className="bg-ink px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.14em] text-acid uppercase">
                      [{activePreview.number}] · {activePreview.eyebrow}
                    </span>
                    <Sparkles className="h-4 w-4 text-acid" aria-hidden="true" />
                  </div>

                  <div>
                    <h2 className="font-display text-3xl leading-[1.06] font-extrabold tracking-tight text-ivory">
                      {activePreview.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-ivory/90">
                      {activePreview.summary}
                    </p>
                  </div>

                  <div className="space-y-3 border-2 border-ink bg-ivory p-4 text-ink shadow-[4px_4px_0px_#151515]">
                    <span className="font-mono text-[10px] font-bold tracking-[0.12em] uppercase">
                      Studio Availability &amp; Capabilities
                    </span>
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px] font-bold">
                      <span className="border-2 border-ink bg-acid px-2 py-2">
                        01 Local SEO
                      </span>
                      <span className="border-2 border-ink bg-concrete px-2 py-2">
                        02 Web &amp; Apps
                      </span>
                      <span className="border-2 border-ink bg-orange px-2 py-2 text-ivory">
                        03 NFC &amp; Care
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t-2 border-ivory/30 pt-5 font-mono text-[11px] font-bold text-acid">
                  <span>{SITE_CONFIG.contact.businessHours}</span>
                  <span>{SITE_CONFIG.teamSize}-MEMBER STUDIO</span>
                </div>
              </div>

              {/* Right monumental stacked navigation links */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <nav
                  aria-label="Overlay route links"
                  className="flex flex-col divide-y-2 divide-ivory/25 border-y-2 border-ivory/25"
                >
                  {OVERLAY_PREVIEWS.map((item, idx) => {
                    const active = isActiveRoute(item.href);
                    const focused = hoveredRouteHref === item.href;

                    return (
                      <motion.div
                        key={item.href}
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: reducedMotion ? 0 : 0.06 + idx * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onMouseEnter={() => setHoveredRouteHref(item.href)}
                          onFocus={() => setHoveredRouteHref(item.href)}
                          onClick={() => setOverlayPathname(null)}
                          className={`group relative flex items-center justify-between px-3 py-5 transition-colors sm:py-6 ${
                            focused ? "bg-cobalt/25 text-acid" : "hover:text-acid"
                          }`}
                        >
                          <div className="flex items-baseline gap-4 sm:gap-7">
                            <span className="border border-acid bg-ink px-2 py-0.5 font-mono text-xs font-bold text-acid">
                              /{item.number}
                            </span>
                            <span className="relative font-display text-3xl font-extrabold tracking-[-0.03em] uppercase sm:text-5xl">
                              {item.label}
                              {(active || focused) && (
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 bg-orange"
                                />
                              )}
                            </span>
                          </div>

                          <ArrowUpRight
                            className={`h-6 w-6 transition-transform duration-200 ${
                              focused
                                ? "translate-x-1 -translate-y-1 text-acid"
                                : "text-ivory/50"
                            }`}
                            aria-hidden="true"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="font-mono text-xs text-ivory/75">
                    {SITE_CONFIG.contact.email ||
                      SITE_CONFIG.contact.emailPlaceholder}
                  </p>
                  <Link
                    href="/contact"
                    onClick={() => setOverlayPathname(null)}
                    className="inline-flex w-fit items-center gap-2 border-2 border-ivory bg-orange px-6 py-3 font-mono text-xs font-bold tracking-[0.08em] text-ivory uppercase shadow-[4px_4px_0px_#E9FF45] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    Start Your Project
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
