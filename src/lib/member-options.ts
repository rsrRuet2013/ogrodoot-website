export const MEMBER_TYPES = ["Current Student", "Alumni"] as const;
export const POSITIONS = ["Member", "Sub-team Lead", "Team Lead"] as const;

export type MemberType = (typeof MEMBER_TYPES)[number];
export type Position = (typeof POSITIONS)[number];

export const isMemberType = (value: string): value is MemberType =>
  (MEMBER_TYPES as readonly string[]).includes(value);

export const isPosition = (value: string): value is Position =>
  (POSITIONS as readonly string[]).includes(value);
