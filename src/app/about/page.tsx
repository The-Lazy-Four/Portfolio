import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyWebGuruSection } from "@/components/sections/WhyWebGuruSection";

export const metadata: Metadata = {
  title: "About Web Guru",
  description:
    "Learn about Web Guru—a four-member digital agency partnering with small businesses, shops, restaurants, startups, and service providers.",
  alternates: {
    canonical: "/about",
  },
};

/** Renders the dedicated About page introducing the four-member agency, values, process, and differentiators. */
export default function AboutPage() {
  return (
    <>
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <span className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
            About Us · Four-Member Studio
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] text-ink sm:text-6xl">
            Small enough to care personally.{" "}
            <span className="font-serif font-normal italic text-accent">
              Skilled enough
            </span>{" "}
            to own the whole stack.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
            Web Guru was formed around a practical observation: business owners
            deserve one reliable technology partner—not a maze of disconnected
            agencies and disappearing freelancers.
          </p>
        </div>
      </section>

      <AboutSection />
      <WhyWebGuruSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
