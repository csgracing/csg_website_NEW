import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getTeamSeasonBySlug, getTeamSeasons } from "@/lib/data";

// Whether `slug` is the newest season (getTeamSeasons() is sorted
// newest-first) — that page always titles itself "Our Team" regardless of
// whether it's reached via /the-teams or its own dropdown entry.
function isLatestTeamSeason(slug: string) {
  return getTeamSeasons()[0]?.slug === slug;
}

export function generateStaticParams() {
  return getTeamSeasons().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const season = getTeamSeasonBySlug(slug);
  if (!season) return { title: "The Team" };

  return { title: isLatestTeamSeason(slug) ? "Our Team" : season.title };
}

export default async function TeamSeasonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const season = getTeamSeasonBySlug(slug);

  if (!season) {
    notFound();
  }

  const title = isLatestTeamSeason(slug) ? "Our Team" : season.title;

  return <PlaceholderPage title={title} />;
}
