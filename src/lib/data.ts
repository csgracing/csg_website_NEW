import siteJson from "@/data/site.json";
import socialsJson from "@/data/socials.json";
import carsJson from "@/data/cars.json";
import teamsJson from "@/data/teams.json";
import statsJson from "@/data/stats.json";
import type { SiteConfig, SocialLink } from "@/types/site";
import type { SeasonEntry } from "@/types/season";
import type { Stat } from "@/types/stat";

export function getSiteConfig(): SiteConfig {
  return siteJson as SiteConfig;
}

export function getSocialLinks(): SocialLink[] {
  return socialsJson as SocialLink[];
}

// Slugs and titles both end in a "YYYY-YYYY" season, e.g. "fsuk-class-1-2025-2026".
// Sort newest season first so dropdowns and listings show the most recent work up top.
function byMostRecentSeason(entries: SeasonEntry[]): SeasonEntry[] {
  const startYear = (entry: SeasonEntry) => {
    const match = entry.slug.match(/(\d{4})-\d{4}/);
    return match ? Number(match[1]) : 0;
  };

  return [...entries].sort((a, b) => startYear(b) - startYear(a));
}

export function getCarSeasons(): SeasonEntry[] {
  return byMostRecentSeason(carsJson);
}

export function getCarSeasonBySlug(slug: string): SeasonEntry | undefined {
  return carsJson.find((entry) => entry.slug === slug);
}

export function getTeamSeasons(): SeasonEntry[] {
  return byMostRecentSeason(teamsJson);
}

export function getTeamSeasonBySlug(slug: string): SeasonEntry | undefined {
  return teamsJson.find((entry) => entry.slug === slug);
}

export function getStats(): Stat[] {
  return statsJson;
}
