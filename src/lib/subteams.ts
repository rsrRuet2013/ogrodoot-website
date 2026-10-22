export const SUB_TEAMS = [
  "Software & Autonomous",
  "Electrical & Communication",
  "Mechanical & Design",
  "Science & Research",
  "Media & Design",
] as const;

export type SubTeam = (typeof SUB_TEAMS)[number];

export const isSubTeam = (value: string): value is SubTeam =>
  (SUB_TEAMS as readonly string[]).includes(value);

export interface TeamMeta {
  slug: string;
  name: string;
  subTeam: SubTeam;
  code: string;
  tagline: string;
  description: string;
  image: string;
  aliases: readonly string[];
}

export const TEAMS_META: readonly TeamMeta[] = [
  {
    slug: "software",
    name: "Software & Autonomous",
    subTeam: "Software & Autonomous",
    code: "DIV-01",
    tagline: "Autonomous ROS2 Navigation & Vision",
    description: "Developing autonomous ROS2 navigation stacks, stereo visual SLAM, path planning, real-time perception algorithms, and mission telemetry HUDs.",
    image: "/photots/rover.png",
    aliases: ["software", "software-autonomous", "software-and-autonomous"],
  },
  {
    slug: "electrical",
    name: "Electrical & Communication",
    subTeam: "Electrical & Communication",
    code: "DIV-02",
    tagline: "Power Distribution & RF Telemetry",
    description: "Architecting custom BMS power management PCBs, high-torque brushless motor controllers, embedded MCU networks, and long-range RF telemetry links.",
    image: "/photots/mars_rover.jpg",
    aliases: ["electrical", "electrical-communication", "electrical-and-communication", "communication"],
  },
  {
    slug: "science",
    name: "Science & Research",
    subTeam: "Science & Research",
    code: "DIV-03",
    tagline: "Astrobiology & Spectral Soil Analysis",
    description: "Designing onboard scientific payloads, automated soil sampling mechanisms, spectrometer sensors, and biochemical assays for Martian life detection.",
    image: "/photots/team.jpg",
    aliases: ["science", "science-research", "science-and-research"],
  },
  {
    slug: "mechanical",
    name: "Mechanical & Design",
    subTeam: "Mechanical & Design",
    code: "DIV-04",
    tagline: "Rocker-Bogie Chassis & 6-DOF Arm",
    description: "Engineering lightweight aluminum rocker-bogie mobility chassis, differential rocker bars, environmental enclosures, and high-precision 6-DOF robotic arms.",
    image: "/photots/rover.png",
    aliases: ["mechanical", "mechanical-design", "mechanical-and-design"],
  },
  {
    slug: "business-media",
    name: "Business & Media",
    subTeam: "Media & Design",
    code: "DIV-05",
    tagline: "Corporate Sponsorship & Media Outreach",
    description: "Directing strategic industry sponsorships, digital media production, brand identity, international campaign logistics, and press relations.",
    image: "/photots/Team_Ogrodoot_Cover.png",
    aliases: ["business-media", "media", "media-design", "media-and-design", "business"],
  },
] as const;

export function getTeamBySlug(slug: string): TeamMeta | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return TEAMS_META.find(
    (t) => t.slug === normalized || t.aliases.includes(normalized)
  );
}

export function getTeamBySubTeam(subTeam: string): TeamMeta | undefined {
  return TEAMS_META.find((t) => t.subTeam === subTeam);
}

