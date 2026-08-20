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
