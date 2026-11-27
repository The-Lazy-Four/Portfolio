import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { WorkDirectory } from "@/components/work/WorkDirectory";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse Web Guru's demonstration case studies and reusable client project blueprints across hospitality, retail, professional services, and workflow software.",
  alternates: {
    canonical: "/work",
  },
};

/** Renders the Selected Work page containing filterable case study blueprints and an enquiry section. */
export default function WorkPage() {
  return (
    <>
      <section className="border-b border-rule bg-paper">
        <WorkDirectory />
      </section>
      <ContactSection />
    </>
  );
}
