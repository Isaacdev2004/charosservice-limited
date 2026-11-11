// Fill these with confirmed company information only. Sections stay hidden
// (or show a neutral note) while a list is empty — nothing here is invented.
export type TeamMember = { name: string; role: string; bio: string; photoUrl?: string };
export type Qualification = { title: string; detail?: string };
export type Fact = { label: string; value: string };

export const TEAM: TeamMember[] = [];
export const QUALIFICATIONS: Qualification[] = [];
export const COMPANY_FACTS: Fact[] = [];
