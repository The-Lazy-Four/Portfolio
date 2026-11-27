/**
 * Selected Work / Real Client Projects for Web Guru.
 */

export type ProjectVisualTheme = "hospitality" | "retail" | "services" | "workflow";

export interface CaseStudyProject {
  slug: string;
  isDemo: boolean;
  demoLabel: string;
  name: string;
  headline: string;
  clientLabel: string;
  industry: string;
  liveUrl: string;
  desktopImage: string;
  mobileImage: string;
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
    slug: "food-n-feel",
    isDemo: false,
    demoLabel: "01 · Restaurant Website",
    name: "FOOD N FEEL",
    headline: "Bringing the restaurant experience online.",
    clientLabel: "FOOD N FEEL — Panchberya, Goura",
    industry: "Restaurant & Hospitality",
    liveUrl: "https://foodnfeel.vercel.app/",
    desktopImage: "/images/projects/food-n-feel-desktop.png",
    mobileImage: "/images/projects/food-n-feel-mobile.png",
    servicesDelivered: [
      "Website Design & Development",
      "Interactive Menu & Ordering",
      "Google Maps & Reviews",
    ],
    shortDescription:
      "A complete restaurant website with food discovery, digital menu browsing, and WhatsApp ordering.",
    visualTheme: "hospitality",
    overview:
      "Web Guru created a complete digital presence for FOOD N FEEL—connecting its dining atmosphere and food photography with category-based menu browsing, a shopping cart, and direct WhatsApp ordering.",
    challenge:
      "Diners searching on their phones needed an inviting way to browse dishes, check the restaurant's location, and place orders without friction.",
    strategy:
      "Lead with rich restaurant photography, organize the menu by category, and connect the cart directly to WhatsApp with customer details and location.",
    solution:
      "Built a responsive restaurant website with a food photography marquee, category-based menu browsing, cart quantity controls, browser-based delivery location detection, Google Maps directions, and a Google Reviews showcase.",
    deliverables: [
      "Cinematic hero and food photography showcase",
      "Category-based menu with cart management",
      "WhatsApp ordering with order summary",
      "Google Maps directions and reviews section",
    ],
    galleryNotes: [
      {
        title: "Restaurant Hero & Food Showcase",
        caption: "Full-screen dining presentation with animated food marquee.",
      },
      {
        title: "Mobile Menu & WhatsApp Ordering",
        caption: "Category browsing, cart controls, and direct WhatsApp order flow.",
      },
    ],
    verifiedResultsNote:
      "Live deployed website showcasing FOOD N FEEL's menu, dining identity, and WhatsApp ordering experience.",
  },
  {
    slug: "medicine-world",
    isDemo: false,
    demoLabel: "02 · Pharmacy Website",
    name: "MEDICINE WORLD",
    headline: "A neighbourhood pharmacy, digitally connected.",
    clientLabel: "Medicine World — Kolkata",
    industry: "Healthcare & Pharmacy",
    liveUrl: "https://medicine-blue.vercel.app/",
    desktopImage: "/images/projects/medicine-world-desktop.png",
    mobileImage: "/images/projects/medicine-world-mobile.png",
    servicesDelivered: [
      "Website Design & Development",
      "Product Catalogue",
      "Healthcare Discovery",
    ],
    shortDescription:
      "A professional digital storefront for a neighbourhood pharmacy, making healthcare products easier to explore.",
    visualTheme: "services",
    overview:
      "Medicine World brings a trusted neighbourhood pharmacy online with clear product discovery, organized medicine and wellness categories, doctor information, and prescription enquiry.",
    challenge:
      "Local customers needed a clear, trustworthy way to browse healthcare products, medical equipment, and pharmacy contact details from home.",
    strategy:
      "Design a clean, approachable healthcare storefront with structured category browsing, search, and straightforward prescription enquiry.",
    solution:
      "Delivered a responsive pharmacy website featuring custom branding, medicine and wellness product catalogues, category browsing, product detail views, a health tracker interface, and prescription enquiry.",
    deliverables: [
      "Custom pharmacy branding and layout",
      "Medicine and wellness product catalogue",
      "Category browsing and search discovery",
      "Prescription enquiry and doctor information",
    ],
    galleryNotes: [
      {
        title: "Pharmacy Identity & Catalogue",
        caption: "Organized medicine, wellness, and medical equipment categories.",
      },
      {
        title: "Mobile Product Discovery",
        caption: "Clean mobile browsing for everyday healthcare needs.",
      },
    ],
    verifiedResultsNote:
      "Live deployed website presenting Medicine World's product catalogue and pharmacy services.",
  },
  {
    slug: "prachiti-homemade-cakes",
    isDemo: false,
    demoLabel: "03 · Bakery Website",
    name: "PRACHITI HOMEMADE CAKES",
    headline: "Making a bakery's digital presence as memorable as its creations.",
    clientLabel: "Prachiti Homemade Cakes",
    industry: "Bakery & Food Business",
    liveUrl: "https://praciti-bakery.vercel.app/",
    desktopImage: "/images/projects/prachiti-homemade-cakes-desktop.png",
    mobileImage: "/images/projects/prachiti-homemade-cakes-mobile.png",
    servicesDelivered: [
      "Website Design & Development",
      "Product Showcase",
      "Responsive Storefront",
    ],
    shortDescription:
      "A dedicated digital storefront showcasing a homemade cake and bakery brand.",
    visualTheme: "retail",
    overview:
      "Web Guru crafted a dedicated digital storefront for Prachiti Homemade Cakes, putting its homemade cakes and bakery photography front and center across desktop and mobile.",
    challenge:
      "A homemade bakery needed a dedicated online home where customers could explore cake varieties and reach out easily.",
    strategy:
      "Highlight genuine cake photography with clean typography and a simple, mobile-friendly browsing experience.",
    solution:
      "Built a responsive bakery website featuring Prachiti Homemade Cakes' brand identity, product photography, category presentation, and clear contact details.",
    deliverables: [
      "Dedicated bakery brand presentation",
      "Cake and product photography showcase",
      "Responsive mobile and desktop layout",
      "Clear business and contact information",
    ],
    galleryNotes: [
      {
        title: "Bakery Storefront Hero",
        caption: "Warm presentation highlighting homemade cakes and creations.",
      },
      {
        title: "Mobile Cake Showcase",
        caption: "Easy-to-browse product presentation on mobile screens.",
      },
    ],
    verifiedResultsNote:
      "Live deployed website showcasing Prachiti Homemade Cakes' products and bakery identity.",
  },
];

/** Returns a single project record by URL slug, or undefined when not found. */
export function getProjectBySlug(slug: string): CaseStudyProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}
