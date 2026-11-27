import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Web Guru to discuss Google visibility, custom websites, web or mobile applications, social media, NFC & QR reviews, or ongoing technical support.",
  alternates: {
    canonical: "/contact",
  },
};

/** Renders the dedicated dark-purple Contact page with Suspense-wrapped URL service preselection. */
export default function ContactPage() {
  return (
    <div className="pt-16">
      <Suspense fallback={<ContactSection />}>
        <ContactPageClient />
      </Suspense>
    </div>
  );
}
