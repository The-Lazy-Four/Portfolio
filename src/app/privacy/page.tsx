import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and enquiry data handling overview for Web Guru.",
  alternates: {
    canonical: "/privacy",
  },
};

/** Renders Web Guru's Privacy Policy page matching the dark-purple LiquidEther visual system. */
export default function PrivacyPage() {
  const hasEmail = Boolean(
    SITE_CONFIG.contact.email &&
      !SITE_CONFIG.contact.email.includes(".example")
  );

  return (
    <section className="bg-[#100B18]/45 pt-32 pb-20 text-[#F5F1FA] sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <p className="text-xs font-medium text-[#A78BFA]">Legal &amp; Privacy</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#F5F1FA] sm:text-5xl">
          Privacy Policy
        </h1>

        <div className="mt-12 divide-y divide-white/12 border-y border-white/12 text-base leading-relaxed text-[#C7BDD5]">
          <div className="py-8">
            <h2 className="font-display text-xl font-semibold text-[#F5F1FA]">
              1. Information Collected via Enquiry Forms
            </h2>
            <p className="mt-2">
              When you submit a project enquiry on {SITE_CONFIG.brandName}, we
              collect only the details you enter—such as your name, business
              name, email address, phone number, selected service, and short
              message—for the sole purpose of responding to your request.
            </p>
          </div>

          <div className="py-8">
            <h2 className="font-display text-xl font-semibold text-[#F5F1FA]">
              2. How Enquiry Information Is Handled
            </h2>
            <p className="mt-2">
              Form submissions are transmitted only to respond to your enquiry.
              We do not sell, rent, or distribute your contact details to
              third-party brokers.
            </p>
          </div>

          <div className="py-8">
            <h2 className="font-display text-xl font-semibold text-[#F5F1FA]">
              3. Cookies &amp; Tracking
            </h2>
            <p className="mt-2">
              This website does not load invasive third-party advertising
              trackers by default.
            </p>
          </div>

          <div className="py-8">
            <h2 className="font-display text-xl font-semibold text-[#F5F1FA]">
              4. Contact Regarding Your Data
            </h2>
            <p className="mt-2">
              To request deletion or updates to enquiry information shared with{" "}
              {SITE_CONFIG.brandName}, reach us via{" "}
              {hasEmail ? (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-[#F5F1FA] underline decoration-[#5227FF] underline-offset-4 hover:text-[#FF9FFC]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="text-[#F5F1FA] underline decoration-[#5227FF] underline-offset-4 hover:text-[#FF9FFC]"
                >
                  our contact form
                </Link>
              )}
              .
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex min-h-[40px] items-center text-sm font-medium text-[#D8C5F2] underline decoration-[#5227FF] underline-offset-8 transition-colors hover:text-[#FF9FFC]"
          >
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
