/**
 * Verified team members and studio principles for Web Guru's four-member agency.
 * Centralizes portrait paths, framing coordinates, roles, bios, and LinkedIn links.
 */

export interface TeamMemberProfile {
  slotNumber: string;
  name: string;
  role: string;
  focus: string;
  image: string;
  linkedinUrl: string;
  imageClassName: string;
  hasVerifiedProfile: boolean;
}

export const TEAM_MEMBERS: TeamMemberProfile[] = [
  {
    slotNumber: "01",
    name: "Partha Sarathi Sarkar",
    role: "Web & Application Developer",
    focus:
      "Building websites, applications, and practical digital solutions for businesses.",
    image: "/images/team/partha-sarathi.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/partha-sarathi-sarkar-7385a8367",
    imageClassName: "object-cover object-[50%_22%]",
    hasVerifiedProfile: true,
  },
  {
    slotNumber: "02",
    name: "Souvik Dey",
    role: "Technical Lead & Client Solutions Developer",
    focus:
      "Connecting client ideas with technology through solution planning, interactive demos, and web and application development.",
    image: "/images/team/souvik-dey.jpg",
    linkedinUrl: "https://www.linkedin.com/in/souvik-dey-400497366",
    imageClassName: "object-cover object-[58%_38%] scale-[1.35] origin-[58%_38%]",
    hasVerifiedProfile: true,
  },
  {
    slotNumber: "03",
    name: "Snehasis Chakraborty",
    role: "Software Developer & Business Development",
    focus:
      "Supporting software development and building strong client relationships through outreach and business development.",
    image: "/images/team/snehasis-chakraborty.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/snehasis-chakraborty-2b68823a6",
    imageClassName: "object-cover object-[45%_24%]",
    hasVerifiedProfile: true,
  },
  {
    slotNumber: "04",
    name: "Samrat Chatterjee",
    role: "Creative Director — Visual Design & Motion",
    focus:
      "Bringing ideas to life through graphic design, visual identity, video editing, and motion content.",
    image: "/images/team/samrat-chatterjee.jpg",
    linkedinUrl: "https://www.linkedin.com/in/samrat-chatterjee-2aa543368",
    imageClassName: "object-cover object-[58%_16%] scale-[1.18] origin-[58%_18%]",
    hasVerifiedProfile: true,
  },
];

export const VERIFIED_TEAM_MEMBERS = TEAM_MEMBERS.filter(
  (member) => member.hasVerifiedProfile && member.name.trim().length > 0
);

export const STUDIO_PRINCIPLES = [
  {
    number: "01",
    title: "We stay involved.",
    body: "We remain available to maintain, improve, and support what we build after launch.",
  },
  {
    number: "02",
    title: "Practical technology.",
    body: "We make digital tools understandable and useful for your business, without unnecessary complexity.",
  },
  {
    number: "03",
    title: "Room to grow.",
    body: "Start with what your business needs today and expand smoothly as you grow.",
  },
];

export const ABOUT_VALUES = STUDIO_PRINCIPLES.map((item) => ({
  label: item.title,
  body: item.body,
}));
