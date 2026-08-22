export interface TeamMember {
  name: string;
  role: string;
  course?: string;
  image?: string;
}

export interface TeamGroup {
  name: string;
  members: TeamMember[];
}

export interface TeamDepartment {
  name: string;
  members?: TeamMember[];
  groups?: TeamGroup[];
  indentGroups?: boolean;
}

export interface TeamRoster {
  theme: "dark" | "light";
  tagline?: string;
  leadership: TeamGroup[];
  departments: TeamDepartment[];
}
