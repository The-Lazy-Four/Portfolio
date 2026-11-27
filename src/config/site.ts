/**
 * Central configuration for the Web Guru agency website.
 * Replace placeholder contact and social values before launching to production.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  configured: boolean;
}

export const SITE_CONFIG = {
  brandName: "Web Guru",
  shortMark: "WG",
  tagline: "One partner for your entire digital presence.",
  description:
    "Web Guru is a four-member digital services agency helping businesses establish, improve, and manage their online presence—from Google visibility and custom websites to applications, social media, NFC/QR review tools, and ongoing technical support.",
  // Update NEXT_PUBLIC_SITE_URL in your deployment environment for canonical metadata.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://webguru.example",
  teamSize: 4,
  copyrightYear: 2026,

  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  // Configure real contact endpoints here or via NEXT_PUBLIC_* environment variables.
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    businessHours: "Mon – Fri · 09:30 – 18:30",
  },

  socialLinks: [
    {
      label: "Instagram",
      href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
      configured: Boolean(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
    },
    {
      label: "LinkedIn",
      href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
      configured: Boolean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
    },
    {
      label: "X / Twitter",
      href: process.env.NEXT_PUBLIC_SOCIAL_X || "",
      configured: Boolean(process.env.NEXT_PUBLIC_SOCIAL_X),
    },
    {
      label: "Facebook",
      href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
      configured: Boolean(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK),
    },
  ] satisfies SocialLink[],
};

/** Returns a formatted WhatsApp click-to-chat URL when a phone number is configured. */
export function getWhatsAppUrl(): string | null {
  const digitsOnly = SITE_CONFIG.contact.whatsappNumber.replace(/[^\d]/g, "");
  if (!digitsOnly) {
    return null;
  }
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(
    "Hello Web Guru, I would like to discuss our digital presence."
  )}`;
}
