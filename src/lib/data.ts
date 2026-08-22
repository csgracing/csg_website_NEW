import siteJson from "@/data/site.json";
import socialsJson from "@/data/socials.json";
import carsJson from "@/data/cars.json";
import teamsJson from "@/data/teams.json";
import statsJson from "@/data/stats.json";
import sponsorsJson from "@/data/sponsors.json";
import teamRosterJson from "@/data/team-roster.json";
import type { SiteConfig, SocialLink } from "@/types/site";
import type { SeasonEntry } from "@/types/season";
import type { Stat } from "@/types/stat";
import type { Sponsor, SponsorTier } from "@/types/sponsor";
import type { TeamRoster } from "@/types/team-roster";

export function getSiteConfig(): SiteConfig {
  return siteJson as SiteConfig;
}

export function getSocialLinks(): SocialLink[] {
  return socialsJson as SocialLink[];
}

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

const SPONSOR_TIER_ORDER: SponsorTier[] = ["gold", "silver", "bronze"];

export function getSponsorsByTier(): Record<SponsorTier, Sponsor[]> {
  const sponsors = sponsorsJson as Sponsor[];

  return Object.fromEntries(
    SPONSOR_TIER_ORDER.map((tier) => [tier, sponsors.filter((sponsor) => sponsor.tier === tier)]),
  ) as Record<SponsorTier, Sponsor[]>;
}

export function getTeamRosterBySlug(slug: string): TeamRoster | undefined {
  return (teamRosterJson as Record<string, TeamRoster>)[slug];
}
