import siteJson from "@/data/site.json";
import socialsJson from "@/data/socials.json";
import carsJson from "@/data/cars.json";
import teamsJson from "@/data/teams.json";
import type { SiteConfig, SocialLink } from "@/types/site";
import type { SeasonEntry } from "@/types/season";

export function getSiteConfig(): SiteConfig {
  return siteJson as SiteConfig;
}

export function getSocialLinks(): SocialLink[] {
  return socialsJson as SocialLink[];
}

export function getCarSeasons(): SeasonEntry[] {
  return carsJson;
}

export function getCarSeasonBySlug(slug: string): SeasonEntry | undefined {
  return carsJson.find((entry) => entry.slug === slug);
}

export function getTeamSeasons(): SeasonEntry[] {
  return teamsJson;
}

export function getTeamSeasonBySlug(slug: string): SeasonEntry | undefined {
  return teamsJson.find((entry) => entry.slug === slug);
}
