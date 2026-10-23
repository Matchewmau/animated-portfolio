export interface ProofStat {
  value: string;
  label: string;
}

export type ProjectSlug = "hairmixer-ai" | "pconnect" | "tj-fitness";

export interface Project {
  slug: ProjectSlug;
  title: string;
  tagline: string;
  year: string;
  role: string;
  stack: string[];
  metrics: string[];
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  gallery: string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  headline: string;
  subhead: string;
  proof: ProofStat[];
}
