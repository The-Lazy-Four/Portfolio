/**
 * Structured catalog of all six Web Guru service categories.
 * Keeps copy accessible for non-technical business owners while preserving exact scope.
 */

export type ServiceDiagramKind =
  | "local-seo"
  | "web-dev"
  | "app-dev"
  | "social-media"
  | "nfc-qr"
  | "tech-support";

export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  businessOutcome: string;
  idealFor: string;
  diagramKind: ServiceDiagramKind;
  deliverables: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "google-business-local-seo",
    number: "01",
    title: "Google Business Profile & Local SEO",
    shortTitle: "Local Visibility & Maps",
    summary:
      "Help local and service businesses show up accurately when nearby customers search for their products or services on Google Search and Google Maps.",
    businessOutcome:
      "Turn local searches into phone calls, direction requests, and website visits with complete, trustworthy business listings.",
    idealFor: "Local shops, restaurants, clinics, salons, and regional service providers",
    diagramKind: "local-seo",
    deliverables: [
      "Google Business Profile setup and optimization",
      "Business information and category optimization",
      "Business description and service listing optimization",
      "Google Maps visibility improvement",
      "Local SEO fundamentals and structured local signals",
      "Business photos and regular profile updates",
      "Review management strategy and response workflows",
      "Local search presence improvement",
    ],
  },
  {
    id: "website-design-development",
    number: "02",
    title: "Website Design & Development",
    shortTitle: "Websites That Convert",
    summary:
      "Design and build fast, clear, and dependable websites tailored to your brand so visitors understand what you offer and know how to reach you.",
    businessOutcome:
      "Replace outdated or generic templates with a purposeful online home built for credibility, speed, and customer enquiries.",
    idealFor: "Growing businesses, startups, studios, retail brands, and independent professionals",
    diagramKind: "web-dev",
    deliverables: [
      "Custom business websites",
      "Portfolio websites",
      "Focused landing pages",
      "E-commerce websites",
      "Website redesign and modernization",
      "Responsive website development across mobile, tablet, and desktop",
      "Website performance optimization",
      "On-page search engine optimization",
      "Website maintenance and ongoing management",
    ],
  },
  {
    id: "application-development-management",
    number: "03",
    title: "Application Development & Management",
    shortTitle: "Custom Web & Mobile Apps",
    summary:
      "Move beyond static brochure websites whenever your business requires customer portals, booking tools, internal dashboards, or dedicated mobile software.",
    businessOutcome:
      "Streamline daily operations and give customers or staff reliable software designed around how your business actually runs.",
    idealFor: "Operations teams, startups, and businesses automating manual workflows",
    diagramKind: "app-dev",
    deliverables: [
      "Custom web applications",
      "Mobile application development",
      "Business workflow applications",
      "Application maintenance",
      "Application upgrades and feature iterations",
      "Ongoing technical support and troubleshooting",
    ],
  },
  {
    id: "social-media-management",
    number: "04",
    title: "Social Media Management",
    shortTitle: "Consistent Brand Presence",
    summary:
      "Maintain an active, cohesive visual voice across your social channels without pulling your team away from running the business.",
    businessOutcome:
      "Stay visible and recognizable to returning and prospective customers with planned, well-designed content.",
    idealFor: "Hospitality venues, retail stores, consumer brands, and local professionals",
    diagramKind: "social-media",
    deliverables: [
      "Social media account setup and optimization",
      "Content planning and editorial calendars",
      "Creative post design aligned with brand guidelines",
      "Content creation and publishing",
      "Consistent posting and scheduling",
      "Social media page management",
      "Cohesive brand presentation across platforms",
    ],
  },
  {
    id: "nfc-qr-review-solutions",
    number: "05",
    title: "NFC & QR Review Solutions",
    shortTitle: "Physical Review Tools",
    summary:
      "Make it effortless for happy walk-in customers to leave verified Google reviews right at the counter, dining table, or checkout desk.",
    businessOutcome:
      "Bridge physical foot traffic and online reputation with a single phone tap or camera scan.",
    idealFor: "Restaurants, cafes, retail counters, salons, clinics, and hospitality spaces",
    diagramKind: "nfc-qr",
    deliverables: [
      "Google review NFC tap cards",
      "QR code review cards and table stands",
      "Custom-branded NFC review products",
      "Direct Google review link setup",
      "QR-based customer feedback solutions",
      "On-site or guided installation and setup assistance",
    ],
  },
  {
    id: "complete-technical-support",
    number: "06",
    title: "Complete Technical Support",
    shortTitle: "Dependable Tech Care",
    summary:
      "Give your team one reliable point of contact for domains, hosting, email, updates, and day-to-day technical troubleshooting.",
    businessOutcome:
      "Eliminate the stress of juggling separate hosting vendors, freelance developers, and IT tickets.",
    idealFor: "Any business seeking long-term reliability without an in-house IT department",
    diagramKind: "tech-support",
    deliverables: [
      "Website troubleshooting and bug resolution",
      "Proactive website maintenance and backups",
      "Domain registration and DNS / hosting assistance",
      "Professional business email setup assistance",
      "Practical technical consultation",
      "Digital infrastructure assistance",
      "Ongoing website and application management",
    ],
  },
];

/** Looks up a service category by its URL slug/id, returning undefined when not found. */
export function getServiceById(id: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((service) => service.id === id);
}
