import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE_CONFIG, getWhatsAppUrl } from "@/config/site";

/** Renders a compact dark-purple footer showing logo, one-line tagline, essential links, and configured contact details. */
export function Footer() {
  const whatsAppUrl = getWhatsAppUrl();
  const hasEmail = Boolean(
    SITE_CONFIG.contact.email &&
      !SITE_CONFIG.contact.email.includes(".example")
  );
  const configuredSocials = SITE_CONFIG.socialLinks.filter(
    (s) => s.configured && Boolean(s.href)
  );

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0D0815]/90 text-[#F5F1FA] backdrop-blur-md">
      <div className="mx-auto max-w-[92rem] px-5 py-10 sm:px-10 sm:py-12 lg:px-14">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div className="space-y-2.5">
            <Logo size="md" />
            <p className="max-w-md text-sm text-[#C7BDD5]">
              {SITE_CONFIG.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#C7BDD5]"
          >
            {SITE_CONFIG.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="wg-link-underline py-1 transition-colors hover:text-[#F5F1FA]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/privacy"
              className="wg-link-underline py-1 transition-colors hover:text-[#F5F1FA]"
            >
              Privacy
            </Link>
          </nav>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 text-xs text-[#91869F] sm:flex-row sm:items-center">
          <p>
            &copy; {SITE_CONFIG.copyrightYear} {SITE_CONFIG.brandName}. All
            rights reserved.
          </p>

          {(hasEmail || whatsAppUrl || configuredSocials.length > 0) && (
            <div className="flex flex-wrap items-center gap-5 text-[#C7BDD5]">
              {hasEmail && (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="hover:text-[#FF9FFC]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              )}
              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF9FFC]"
                >
                  WhatsApp
                </a>
              )}
              {configuredSocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF9FFC]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
