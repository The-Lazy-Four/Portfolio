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

/** Renders the Neo-Brutalist About page introducing Web Guru's compact structure, advantages, process, and contact section. */
export default function AboutPage() {
  return (
    <>
      <section className="border-b-[3px] border-ink bg-ivory">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <span className="inline-block border-2 border-ink bg-acid px-3 py-1 font-mono text-xs font-bold tracking-[0.12em] text-ink uppercase shadow-[3px_3px_0px_#151515]">
            About Us · Four-Member Studio
          </span>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.035em] text-ink uppercase sm:text-6xl">
            Small enough to care personally.{" "}
            <span className="font-serif font-normal lowercase italic text-cobalt underline decoration-orange decoration-4 underline-offset-4">
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
