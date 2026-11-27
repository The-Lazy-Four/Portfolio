import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { WorkDirectory } from "@/components/work/WorkDirectory";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore real websites built by Web Guru across restaurants, pharmacy healthcare, and homemade bakery storefronts.",
  alternates: {
    canonical: "/work",
  },
};

/** Renders the Selected Work route over the global LiquidEther background. */
export default function WorkPage() {
  return (
    <>
      <section className="bg-[#100B18]/35 text-[#F5F1FA]">
        <WorkDirectory />
      </section>
      <ContactSection />
    </>
  );
}
