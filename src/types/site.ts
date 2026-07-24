export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  university: string;
  nav: NavItem[];
}

export interface SocialLink {
  platform: "instagram" | "linkedin" | "youtube" | "tiktok" | "x";
  label: string;
  url: string;
}
