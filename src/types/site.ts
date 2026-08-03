export interface NavItem {
  label: string;
  shortLabel: string;
  href: string;
  dropdown?: "cars" | "teams";
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  university: string;
  nav: NavItem[];
}

export interface SocialLink {
  platform: "instagram" | "tiktok" | "linkedin" | "email";
  label: string;
  url: string;
}
