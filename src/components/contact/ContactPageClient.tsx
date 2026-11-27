"use client";

import { useSearchParams } from "next/navigation";
import { ContactSection } from "@/components/sections/ContactSection";

/** Reads the optional ?service= query parameter and passes it into the validated ContactSection form. */
export function ContactPageClient() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") || "";

  return (
    <ContactSection
      key={requestedService || "default"}
      initialService={requestedService}
    />
  );
}
