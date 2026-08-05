import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getCarSeasonBySlug, getCarSeasons } from "@/lib/data";

// Whether `slug` is the newest season (getCarSeasons() is sorted
// newest-first) — that page always titles itself "Our Car" regardless of
// whether it's reached via /our-cars or its own dropdown entry.
function isLatestCarSeason(slug: string) {
  return getCarSeasons()[0]?.slug === slug;
}

export function generateStaticParams() {
  return getCarSeasons().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const season = getCarSeasonBySlug(slug);
  if (!season) return { title: "Our Cars" };

  return { title: isLatestCarSeason(slug) ? "Our Car" : season.title };
}

export default async function CarSeasonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const season = getCarSeasonBySlug(slug);

  if (!season) {
    notFound();
  }

  const title = isLatestCarSeason(slug) ? "Our Car" : season.title;

  return <PlaceholderPage title={title} />;
}
