export interface Experience {
  year?: string;
  first?: boolean;
  last?: boolean;
  org: string;
  logo: string;
  website: string;
  title: string;
  timeframe: string;
  location: string;
  description: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  timeframe: string;
  liveLink?: string;
  codeLink: string;
  protectString?: string;
}
