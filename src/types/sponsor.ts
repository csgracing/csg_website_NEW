export type SponsorTier = "gold" | "silver" | "bronze";

export interface Sponsor {
  slug: string;
  name: string;
  tier: SponsorTier;
  logo?: string;
  aboutUrl?: string;
}
