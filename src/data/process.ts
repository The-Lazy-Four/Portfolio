/**
 * Four-stage client workflow for Web Guru.
 * Explains how engagements move smoothly from initial discovery to long-term stewardship.
 */

export interface ProcessStage {
  number: string;
  title: string;
  summary: string;
  focusLabel: string;
  clientReceives: string[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Discover",
    summary:
      "We start by listening carefully—learning how your business operates, who your customers are, what is currently holding back your online visibility, and what goals matter most.",
    focusLabel: "Understanding & Audit",
    clientReceives: [
      "Review of your current website, Google profile, and social channels",
      "Clear identification of customer friction and missed visibility",
      "Plain-language summary of priorities before any build begins",
    ],
  },
  {
    number: "02",
    title: "Strategize",
    summary:
      "Rather than recommending unnecessary tools, we identify the exact combination of design, development, local SEO, or review solutions that fits your requirements and budget.",
    focusLabel: "Practical Roadmap",
    clientReceives: [
      "Tailored architecture covering only the services you actually need",
      "Defined scope, structure, and milestone expectations",
      "Single cohesive plan connecting web, local search, and social presence",
    ],
  },
  {
    number: "03",
    title: "Build & Implement",
    summary:
      "Our four-member team designs, develops, optimizes, and configures every piece—from fast responsive code and Google Business updates to custom NFC/QR cards and social templates.",
    focusLabel: "Design & Engineering",
    clientReceives: [
      "Clean, responsive website or application built for everyday usability",
      "Configured Google Business Profile, review links, domains, and business email",
      "Careful testing across mobile, tablet, and desktop before launch",
    ],
  },
  {
    number: "04",
    title: "Manage & Grow",
    summary:
      "Our partnership continues after launch day. We handle ongoing updates, technical support, content scheduling, and continuous refinements as your business evolves.",
    focusLabel: "Ongoing Partnership",
    clientReceives: [
      "Direct human technical support and troubleshooting when needed",
      "Ongoing maintenance, security updates, and profile freshness",
      "Iterative improvements as new services, locations, or tools are added",
    ],
  },
];
