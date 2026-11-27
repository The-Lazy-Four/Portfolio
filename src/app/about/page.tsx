import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProcessCinemaScene } from "@/components/sections/ProcessCinemaScene";
import { StudioCinemaScene } from "@/components/sections/StudioCinemaScene";
import { STUDIO_PRINCIPLES } from "@/data/team";

export const metadata: Metadata = {
  title: "About Web Guru",
  description:
    "Learn about Web Guru—a four-member digital agency partnering with small businesses, shops, restaurants, startups, and service providers.",
  alternates: {
    canonical: "/about",
  },
};

/** Renders the concise About page covering Web Guru's studio principles, four-member team, process, and contact form. */
export default function AboutPage() {
  return (
    <>
      <section className="bg-transparent pt-28 pb-14 text-[#F5F1FA] sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-[92rem] px-5 sm:px-10 lg:px-14">
          <p className="text-xs font-medium text-[#A78BFA]">About Web Guru</p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.15rem,5vw,4.25rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#F5F1FA]">
            Small enough to care personally.{" "}
            <span className="font-serif font-normal italic text-[#FF9FFC]">
              Skilled enough
            </span>{" "}
            to handle everything online.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#C7BDD5] sm:text-lg">
            Business owners deserve one reliable partner—from Google visibility
            and websites to custom apps and ongoing technical care—without
            juggling disconnected freelancers.
          </p>

          <div className="mt-12 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:mt-16 md:grid-cols-3 md:divide-y-0">
            {STUDIO_PRINCIPLES.map((item) => (
              <div
                key={item.number}
                className="py-6 md:border-r md:border-white/10 md:px-6 md:py-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span className="text-xs font-medium text-[#A78BFA]">
                  {item.number}
                </span>
                <h2 className="mt-2 font-display text-xl font-semibold text-[#F5F1FA]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#C7BDD5]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioCinemaScene showAboutLink={false} />
      <ProcessCinemaScene />
      <ContactSection />
    </>
  );
}
