/**
 * Team slot definitions for Web Guru's four-member agency structure.
 * Deliberately avoids fabricated names, fake biographies, or stock portraits.
 */

export interface TeamMemberSlot {
  slotNumber: string;
  placeholderName: string;
  rolePlaceholder: string;
  focusPlaceholder: string;
  initials: string;
  statusNote: string;
}

export const TEAM_SLOTS: TeamMemberSlot[] = [
  {
    slotNumber: "01",
    placeholderName: "Team Member 01",
    rolePlaceholder: "[Role & Title to be added]",
    focusPlaceholder:
      "Update src/data/team.ts with member name, specialty, portrait, and short bio.",
    initials: "01",
    statusNote: "Profile Pending",
  },
  {
    slotNumber: "02",
    placeholderName: "Team Member 02",
    rolePlaceholder: "[Role & Title to be added]",
    focusPlaceholder:
      "Update src/data/team.ts with member name, specialty, portrait, and short bio.",
    initials: "02",
    statusNote: "Profile Pending",
  },
  {
    slotNumber: "03",
    placeholderName: "Team Member 03",
    rolePlaceholder: "[Role & Title to be added]",
    focusPlaceholder:
      "Update src/data/team.ts with member name, specialty, portrait, and short bio.",
    initials: "03",
    statusNote: "Profile Pending",
  },
  {
    slotNumber: "04",
    placeholderName: "Team Member 04",
    rolePlaceholder: "[Role & Title to be added]",
    focusPlaceholder:
      "Update src/data/team.ts with member name, specialty, portrait, and short bio.",
    initials: "04",
    statusNote: "Profile Pending",
  },
];

export const ABOUT_VALUES = [
  {
    label: "Who We Are",
    body: "Web Guru is a focused four-member digital services agency. We keep our team compact by design so business owners speak directly with the people designing, building, and supporting their work.",
  },
  {
    label: "Who We Serve",
    body: "We partner with small businesses, local shops, restaurants, startups, independent professionals, and growing service companies that want dependable digital clarity without enterprise overhead.",
  },
  {
    label: "What Drives Us",
    body: "Good technology should feel effortless for your customers and manageable for your team. We care equally about sharp visual presentation, local discoverability, and staying around after launch.",
  },
];
