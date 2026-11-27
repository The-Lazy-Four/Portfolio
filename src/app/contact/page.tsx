import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Web Guru to discuss Google Business Profile optimization, custom websites, web or mobile applications, social media management, NFC/QR review cards, or ongoing technical support.",
  alternates: {
    canonical: "/contact",
  },
};

/** Renders the dedicated Contact page with Suspense-wrapped URL service preselection. */
export default function ContactPage() {
  return (
    <>
      <section className="border-b border-rule bg-linen">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
            Contact Web Guru
          </span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.06] font-bold tracking-[-0.03em] text-ink sm:text-5xl">
            Tell us what your business needs next.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            Whether you already know which service fits or want practical
            advice on where to start, fill out the brief below or reach out
            through a configured channel.
          </p>
        </div>
      </section>

      <Suspense fallback={<ContactSection />}>
        <ContactPageClient />
      </Suspense>
    </>
  );
}
