import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy placeholder and data handling overview for Web Guru.",
  alternates: {
    canonical: "/privacy",
  },
};

/** Renders Web Guru's privacy policy page explaining contact form data handling and configuration notes. */
export default function PrivacyPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
          Legal &amp; Privacy
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-xs text-slate">
          Template Policy · Review and finalize with your agency legal details
          before launch
        </p>

        <div className="mt-10 space-y-8 border-t border-rule pt-8 text-base leading-relaxed text-ink/90">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              1. Information Collected via Enquiry Forms
            </h2>
            <p className="mt-2 text-slate">
              When you submit a project enquiry on {SITE_CONFIG.brandName}, we
              collect only the details you enter—such as your name, business
              name, email address, phone number, selected service, and project
              description—for the sole purpose of responding to your request.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              2. How Enquiry Information Is Delivered
            </h2>
            <p className="mt-2 text-slate">
              Form submissions are transmitted directly to the configured agency
              email or webhook endpoint when active. We do not sell, rent, or
              distribute enquiry contact details to third-party brokers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              3. Cookies &amp; Analytics
            </h2>
            <p className="mt-2 text-slate">
              This website does not load invasive third-party advertising
              trackers by default. If optional analytics are added in the
              future, update this section with the exact provider and retention
              policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              4. Contact Regarding Your Data
            </h2>
            <p className="mt-2 text-slate">
              To request deletion or updates to enquiry information shared with
              Web Guru, reach us via{" "}
              {SITE_CONFIG.contact.email ? (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="underline hover:text-accent"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              ) : (
                <span>
                  the configured business email in{" "}
                  <code className="font-mono text-xs text-ink">
                    src/config/site.ts
                  </code>
                </span>
              )}
              .
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-rule pt-6">
          <Link
            href="/"
            className="wg-link-underline font-mono text-xs tracking-[0.08em] text-ink uppercase"
          >
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
