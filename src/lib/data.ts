import siteJson from "@/data/site.json";
import socialsJson from "@/data/socials.json";
import type { SiteConfig, SocialLink } from "@/types/site";

export function getSiteConfig(): SiteConfig {
  return siteJson;
}

export function getSocialLinks(): SocialLink[] {
  return socialsJson as SocialLink[];
}
