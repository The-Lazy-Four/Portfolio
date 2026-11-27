/**
 * Selected Work / Case Study structure for Web Guru.
 * Note: All entries currently represent DEMO CONCEPTS / RESERVED SLOTS until
 * verified Web Guru client engagements and assets are supplied.
 */

export type ProjectVisualTheme = "hospitality" | "retail" | "services" | "workflow";

export interface CaseStudyProject {
  slug: string;
  isDemo: boolean;
  demoLabel: string;
  name: string;
  clientLabel: string;
  industry: string;
  servicesDelivered: string[];
  shortDescription: string;
  visualTheme: ProjectVisualTheme;
  overview: string;
  challenge: string;
  strategy: string;
  solution: string;
  deliverables: string[];
  galleryNotes: { title: string; caption: string }[];
  verifiedResultsNote: string;
}

export const PORTFOLIO_PROJECTS: CaseStudyProject[] = [
  {
    slug: "demo-neighborhood-bistro-local-presence",
    isDemo: true,
    demoLabel: "Demo Concept · Reserved Client Slot 01",
    name: "Neighborhood Bistro — Local Discovery & Review Flow",
    clientLabel: "Sample Concept (Hospitality)",
    industry: "Restaurants & Local Hospitality",
    servicesDelivered: [
      "Google Business Profile & Local SEO",
      "Website Design & Development",
      "NFC & QR Review Solutions",
    ],
    shortDescription:
      "A demonstration case study showing how a neighborhood restaurant can unify mobile-first menu browsing, accurate Google Maps discovery, and counter NFC review cards.",
    visualTheme: "hospitality",
    overview:
      "This demo case study illustrates how Web Guru connects a restaurant's street-level guest experience with clear online discovery—replacing PDF-only menus and neglected map listings with one cohesive presence.",
    challenge:
      "Independent restaurants often lose hungry local searchers due to outdated opening hours, uncategorized Google profiles, slow mobile pages, and friction when asking happy diners for reviews.",
    strategy:
      "Combine structured Google Business Profile optimization with a lightweight, scannable website and physical NFC + QR review table cards placed at checkout.",
    solution:
      "Designed a mobile-friendly digital storefront featuring clear dining hours, table-booking links, updated location categories, and branded tap-to-review cards linking directly to the restaurant's Google review form.",
    deliverables: [
      "Fast responsive restaurant website",
      "Google Business Profile category, menu & photo setup",
      "Custom-branded NFC & QR table review cards",
      "Ongoing seasonal hour and menu support",
    ],
    galleryNotes: [
      {
        title: "Mobile Menu & Direct Booking Layout",
        caption: "Conceptual presentation showing clear above-the-fold hours and reservation actions.",
      },
      {
        title: "Google Maps & Profile Architecture",
        caption: "Structured local categories, high-clarity imagery slots, and direct review link flow.",
      },
      {
        title: "Countertop NFC & QR Card Mockup",
        caption: "Physical-to-digital review card concept ready for custom client branding.",
      },
    ],
    verifiedResultsNote:
      "Demo concept slot — verified metrics and live customer outcomes will be published here once real client project data is supplied.",
  },
  {
    slug: "demo-artisan-retail-storefront-social",
    isDemo: true,
    demoLabel: "Demo Concept · Reserved Client Slot 02",
    name: "Specialty Goods Shop — E-Commerce & Social Cadence",
    clientLabel: "Sample Concept (Local Retail)",
    industry: "Retail & Specialty Shops",
    servicesDelivered: [
      "Website Design & Development",
      "Social Media Management",
      "Complete Technical Support",
    ],
    shortDescription:
      "A sample blueprint pairing a streamlined online store and consistent social visual system with worry-free domain, hosting, and email management.",
    visualTheme: "retail",
    overview:
      "Designed as an example for independent retail stores moving online without wanting to manage separate web developers, social freelancers, and hosting providers.",
    challenge:
      "Shop owners frequently struggle with disjointed branding across Instagram and their storefront, slow checkout pages, and confusing domain or email configurations.",
    strategy:
      "Establish one clean visual identity across web and social channels while centralizing technical infrastructure under Web Guru's ongoing care.",
    solution:
      "Built a structured catalog storefront concept with crisp product hierarchy, paired with reusable social media post templates, scheduled publishing workflows, and reliable business email setup.",
    deliverables: [
      "E-commerce storefront and product templates",
      "Cohesive social media profile setup and post design system",
      "Domain, DNS, SSL, and business email configuration",
      "Monthly maintenance and troubleshooting support",
    ],
    galleryNotes: [
      {
        title: "Editorial Storefront Grid",
        caption: "Clean catalog hierarchy designed to keep product details readable on phones.",
      },
      {
        title: "Cohesive Social Feed Templates",
        caption: "Consistent visual framing for seasonal launches and store announcements.",
      },
    ],
    verifiedResultsNote:
      "Demo concept slot — replace with verified store photography, live URL, and documented outcomes when available.",
  },
  {
    slug: "demo-advisory-practice-modernization",
    isDemo: true,
    demoLabel: "Demo Concept · Reserved Client Slot 03",
    name: "Independent Advisory Practice — Redesign & Local Trust",
    clientLabel: "Sample Concept (Professional Services)",
    industry: "Consultancies & Service Providers",
    servicesDelivered: [
      "Website Design & Development",
      "Google Business Profile & Local SEO",
      "Complete Technical Support",
    ],
    shortDescription:
      "An architectural website redesign concept built to help service professionals explain complex offerings clearly and convert consultations.",
    visualTheme: "services",
    overview:
      "Demonstrates how Web Guru elevates service providers—clinics, legal advisors, consultants, and trades—with authoritative typography, clear service navigation, and local search precision.",
    challenge:
      "Outdated brochure sites undermine trust before a prospective client even books a call, especially when competitors display clearer credentials and structured enquiry pathways.",
    strategy:
      "Prioritize readability, structured service explanations, accessible consultation forms, and accurate Google Business service listings.",
    solution:
      "Crafted a calm editorial layout separating core services from process transparency, supported by fast page loads, technical SEO metadata, and continuous site maintenance.",
    deliverables: [
      "Website redesign and mobile modernization",
      "On-page SEO structure and metadata",
      "Google Business service listing alignment",
      "Ongoing security updates and hosting support",
    ],
    galleryNotes: [
      {
        title: "Service Clarity & Consultation Flow",
        caption: "Structured navigation guiding non-technical visitors straight to the right service.",
      },
      {
        title: "Accessible Form & Lead Routing",
        caption: "Clean, validated enquiry form connected to dedicated business email.",
      },
    ],
    verifiedResultsNote:
      "Demo concept slot — reserved for a verified professional services case study upon client approval.",
  },
  {
    slug: "demo-operations-booking-portal",
    isDemo: true,
    demoLabel: "Demo Concept · Reserved Client Slot 04",
    name: "Service Team Portal — Custom Workflow Application",
    clientLabel: "Sample Concept (Workflow Software)",
    industry: "Growing Operations & Field Services",
    servicesDelivered: [
      "Application Development & Management",
      "Complete Technical Support",
    ],
    shortDescription:
      "A demonstration architecture showing how growing teams replace scattered spreadsheets with a focused custom web application and continuous maintenance.",
    visualTheme: "workflow",
    overview:
      "Illustrates Web Guru's Application Development & Management tier for businesses whose operations have outgrown standard informational websites.",
    challenge:
      "Growing teams often piece together spreadsheets, chat threads, and manual PDFs—leading to missed appointments, duplicate data entry, and zero visibility.",
    strategy:
      "Build only the focused workflow screens the team truly needs, backed by clean code and a continuous maintenance retainer for upgrades and troubleshooting.",
    solution:
      "Architected a custom web application concept featuring structured intake queues, status tracking, mobile-friendly staff views, and ongoing application stewardship.",
    deliverables: [
      "Custom business workflow web application",
      "Role-appropriate mobile & desktop interfaces",
      "Technical documentation and team onboarding",
      "Ongoing application upgrades and troubleshooting",
    ],
    galleryNotes: [
      {
        title: "Workflow Queue & Request Overview",
        caption: "Clean, readable status tracking designed for daily staff usability.",
      },
      {
        title: "Long-Term Upgrade Lifecycle",
        caption: "Modular architecture enabling steady improvements without full rewrites.",
      },
    ],
    verifiedResultsNote:
      "Demo concept slot — ready to showcase verified custom application architecture once live client details are supplied.",
  },
];

/** Returns a single demo/case-study project matching the provided slug, or undefined. */
export function getProjectBySlug(slug: string): CaseStudyProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}
