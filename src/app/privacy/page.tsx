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

/** Renders Web Guru's Neo-Brutalist privacy policy page detailing enquiry data handling clearly. */
export default function PrivacyPage() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <span className="inline-block border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold tracking-[0.1em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
          Legal &amp; Privacy
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink uppercase sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 font-mono text-xs font-bold text-slate">
          Template Policy · Review and finalize with your agency legal details
          before launch
        </p>

        <div className="mt-10 space-y-6 border-[3px] border-ink bg-concrete p-6 text-base leading-relaxed text-ink shadow-[8px_8px_0px_#151515] sm:p-8">
          <div className="border-2 border-ink bg-ivory p-5">
            <h2 className="font-display text-xl font-extrabold text-ink uppercase">
              1. Information Collected via Enquiry Forms
            </h2>
            <p className="mt-2 text-slate">
              When you submit a project enquiry on {SITE_CONFIG.brandName}, we
              collect only the details you enter—such as your name, business
              name, email address, phone number, selected service, and project
              description—for the sole purpose of responding to your request.
            </p>
          </div>

          <div className="border-2 border-ink bg-ivory p-5">
            <h2 className="font-display text-xl font-extrabold text-ink uppercase">
              2. How Enquiry Information Is Delivered
            </h2>
            <p className="mt-2 text-slate">
              Form submissions are transmitted directly to the configured agency
              email or webhook endpoint when active. We do not sell, rent, or
              distribute enquiry contact details to third-party brokers.
            </p>
          </div>

          <div className="border-2 border-ink bg-ivory p-5">
            <h2 className="font-display text-xl font-extrabold text-ink uppercase">
              3. Cookies &amp; Analytics
            </h2>
            <p className="mt-2 text-slate">
              This website does not load invasive third-party advertising
              trackers by default. If optional analytics are added in the
              future, update this section with the exact provider and retention
              policy.
            </p>
          </div>

          <div className="border-2 border-ink bg-ivory p-5">
            <h2 className="font-display text-xl font-extrabold text-ink uppercase">
              4. Contact Regarding Your Data
            </h2>
            <p className="mt-2 text-slate">
              To request deletion or updates to enquiry information shared with
              Web Guru, reach us via{" "}
              {SITE_CONFIG.contact.email ? (
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="font-bold text-cobalt underline hover:text-orange"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              ) : (
                <span>
                  the configured business email in{" "}
                  <code className="bg-acid px-1.5 py-0.5 font-mono text-xs font-bold text-ink">
                    src/config/site.ts
                  </code>
                </span>
              )}
              .
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="wg-brutal-btn inline-flex items-center border-2 border-ink bg-acid px-5 py-2.5 font-mono text-xs font-bold tracking-[0.08em] text-ink uppercase"
          >
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
