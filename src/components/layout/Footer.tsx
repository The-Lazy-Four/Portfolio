import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SITE_CONFIG, getWhatsAppUrl } from "@/config/site";
import { SERVICE_CATEGORIES } from "@/data/services";

/** Renders the bold Neo-Brutalist graphic closing footer with Cobalt CAD framing and poster typography. */
export function Footer() {
  const whatsAppUrl = getWhatsAppUrl();

  return (
    <footer className="relative overflow-hidden border-t-4 border-ink bg-ink text-ivory">
      <div className="mx-auto max-w-[92rem] px-5 pt-16 pb-10 sm:px-8 lg:px-12 lg:pt-20">
        {/* Bold top brand block */}
        <div className="flex flex-col justify-between gap-8 border-b-2 border-ivory/25 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-xl space-y-5">
            <Logo inverted size="lg" />
            <p className="text-base leading-relaxed text-ivory/85">
              {SITE_CONFIG.tagline} Four specialists designing, building, and
              maintaining cohesive digital ecosystems for growing businesses.
            </p>
          </div>

          <Link
            href="/contact"
            data-cursor="BOOK"
            className="inline-flex w-fit items-center gap-2 border-2 border-ivory bg-acid px-7 py-3.5 font-mono text-xs font-bold tracking-[0.08em] text-ink uppercase shadow-[5px_5px_0px_#3155F5] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Book a Consultation
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Structured directory grid */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <p className="mb-4 inline-block border border-acid px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] text-acid uppercase">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="wg-link-underline text-ivory/90 transition-colors hover:text-acid"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="wg-link-underline text-ivory/90 transition-colors hover:text-acid"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="mb-4 inline-block border border-orange px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] text-orange uppercase">
              Disciplines
            </p>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_CATEGORIES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="wg-link-underline text-ivory/90 transition-colors hover:text-acid"
                  >
                    {service.number} — {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-4 inline-block border border-ivory/40 px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.14em] text-ivory uppercase">
              Direct Channels
            </p>
            <ul className="space-y-3 text-sm text-ivory/85">
              <li>
                <span className="block font-mono text-[10px] text-acid uppercase">
                  Business Email
                </span>
                {SITE_CONFIG.contact.email ? (
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="wg-link-underline text-ivory hover:text-acid"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                ) : (
                  <span className="text-ivory/70">
                    {SITE_CONFIG.contact.emailPlaceholder}
                  </span>
                )}
              </li>
              <li>
                <span className="block font-mono text-[10px] text-acid uppercase">
                  Phone / WhatsApp
                </span>
                {whatsAppUrl ? (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wg-link-underline text-ivory hover:text-acid"
                  >
                    Chat on WhatsApp
                  </a>
                ) : (
                  <span className="text-ivory/70">
                    {SITE_CONFIG.contact.whatsappDisplayPlaceholder}
                  </span>
                )}
              </li>
              <li>
                <span className="block font-mono text-[10px] text-acid uppercase">
                  Hours
                </span>
                <span>{SITE_CONFIG.contact.businessHours}</span>
              </li>
            </ul>
          </div>

          {/* Cobalt Brutalist studio schematic box */}
          <div className="flex flex-col justify-between border-2 border-ivory bg-cobalt p-5 text-ivory shadow-[6px_6px_0px_#E9FF45] lg:col-span-3">
            <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase">
              <span className="bg-ink px-2 py-0.5 text-acid">Socials</span>
              <span>4-Seat Studio</span>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 220 96"
              className="my-4 w-full text-ivory"
            >
              <rect
                x="10"
                y="10"
                width="200"
                height="76"
                fill="#151515"
                stroke="#F5F0E6"
                strokeWidth="2"
              />
              <line
                x1="10"
                y1="48"
                x2="210"
                y2="48"
                stroke="#F5F0E6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <rect
                x="44"
                y="26"
                width="44"
                height="44"
                fill="none"
                stroke="#E9FF45"
                strokeWidth="2"
              />
              <circle
                cx="156"
                cy="48"
                r="16"
                fill="#F0522B"
                stroke="#F5F0E6"
                strokeWidth="1.5"
              />
            </svg>

            <ul className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
              {SITE_CONFIG.socialLinks.map((social) => (
                <li key={social.label}>
                  {social.configured && social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wg-link-underline text-ivory hover:text-acid"
                    >
                      {social.label}
                    </a>
                  ) : (
                    <span className="text-ivory/75">
                      {social.label} (Soon)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monumental Acid-Yellow & Ivory closing brand block */}
        <div className="border-t-2 border-ivory/25 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 font-mono text-[11px] font-bold uppercase sm:flex-row sm:items-center">
            <p className="text-acid">
              &copy; {SITE_CONFIG.copyrightYear} {SITE_CONFIG.brandName}. Built cleanly in-house.
            </p>
            <p className="text-ivory/75">
              + Six Services · One Cohesive Engineering Desk +
            </p>
          </div>
          <p
            aria-hidden="true"
            className="mt-6 select-none font-display text-[clamp(3.2rem,14vw,11.5rem)] leading-[0.8] font-extrabold tracking-[-0.05em] text-ivory uppercase"
          >
            WEB <span className="text-cobalt">GURU</span>
            <span className="text-acid">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
