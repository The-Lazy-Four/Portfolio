import { HeroCinemaScene } from "@/components/sections/HeroCinemaScene";
import { HomeContactCTA } from "@/components/sections/HomeContactCTA";
import { PortfolioCinemaScene } from "@/components/sections/PortfolioCinemaScene";
import { StudioCinemaScene } from "@/components/sections/StudioCinemaScene";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";

/** Renders Web Guru's concise five-section homepage: Hero, What We Do, Selected Work, Team, and Contact CTA. */
export default function HomePage() {
  return (
    <>
      <HeroCinemaScene />
      <WhatWeDoSection />
      <PortfolioCinemaScene />
      <StudioCinemaScene />
      <HomeContactCTA />
    </>
  );
}
