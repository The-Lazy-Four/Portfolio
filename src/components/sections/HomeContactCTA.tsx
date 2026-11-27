"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useCinemaEngine } from "@/components/motion/CinemaEngineProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SITE_CONFIG, getWhatsAppUrl } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

/** Renders Section 05 (Closing Contact CTA) as an open dark-purple invitation over LiquidEther linking to the Contact page. */
export function HomeContactCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { setActiveSceneIndex } = useCinemaEngine();
  const whatsAppUrl = getWhatsAppUrl();
  const hasEmail = Boolean(SITE_CONFIG.contact.email);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom bottom",
        onEnter: () => setActiveSceneIndex(4),
        onEnterBack: () => setActiveSceneIndex(4),
      });
    }, section);

    return () => ctx.revert();
  }, [setActiveSceneIndex]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="home-contact-heading"
      className="relative border-t border-white/10 bg-[#100B18]/40 py-20 text-[#F5F1FA] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
        <div className="max-w-3xl">
          <h2
            id="home-contact-heading"
            className="font-display text-[clamp(2.1rem,5.2vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.03em] text-[#F5F1FA]"
          >
            Have a business to grow?{" "}
            <span className="font-serif font-normal italic text-[#FF9FFC]">
              Let&apos;s talk.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#C7BDD5] sm:text-lg">
            Tell us what you need. We&apos;ll help you find the right digital
            solution.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10 sm:gap-7">
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="CHAT"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#5227FF] px-7 py-3.5 text-sm font-medium text-[#F5F1FA] transition-colors hover:bg-[#A78BFA] hover:text-[#100B18]"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </MagneticButton>

            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wg-link-underline inline-flex min-h-[44px] items-center text-sm font-medium text-[#D8C5F2] hover:text-[#FF9FFC]"
              >
                Chat on WhatsApp
              </a>
            )}

            {hasEmail && (
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="wg-link-underline inline-flex min-h-[44px] items-center text-sm font-medium text-[#D8C5F2] hover:text-[#FF9FFC]"
              >
                {SITE_CONFIG.contact.email}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
