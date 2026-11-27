import { ContactSection } from "@/components/sections/ContactSection";
import { EcosystemScene } from "@/components/sections/EcosystemScene";
import { HeroCinemaScene } from "@/components/sections/HeroCinemaScene";
import { PortfolioCinemaScene } from "@/components/sections/PortfolioCinemaScene";
import { ProcessCinemaScene } from "@/components/sections/ProcessCinemaScene";
import { ServicesCinemaScene } from "@/components/sections/ServicesCinemaScene";
import { StudioCinemaScene } from "@/components/sections/StudioCinemaScene";

/** Renders Web Guru's 7-scene cinematic flagship experience unifying award-researched layout, WebGL shaders, scroll choreography, and business clarity. */
export default function HomePage() {
  return (
    <>
      <HeroCinemaScene />
      <EcosystemScene />
      <ServicesCinemaScene />
      <PortfolioCinemaScene />
      <ProcessCinemaScene />
      <StudioCinemaScene />
      <ContactSection />
    </>
  );
}
