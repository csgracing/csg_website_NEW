import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CarShowcase } from "@/components/CarShowcase";
import { CarNameOrigin } from "@/components/CarNameOrigin";
import { CarSpecs } from "@/components/CarSpecs";
import { CarCompetitionRecap } from "@/components/CarCompetitionRecap";
import { getCarSeasonBySlug, getCarSeasons } from "@/lib/data";

// Car titles are "NAME, YYYY-YYYY Season" — the showcase heading only wants
// the name itself.
function carNameFrom(title: string) {
  return title.split(",")[0].trim();
}

// Whether `slug` is the newest season (getCarSeasons() is sorted
// newest-first) — that page titles itself "Our Car" by default, regardless
// of whether it's reached via /our-cars or its own dropdown entry, unless
// the season sets its own pageTitle override.
function isLatestCarSeason(slug: string) {
  return getCarSeasons()[0]?.slug === slug;
}

// on-page heading only — the nav dropdown always uses `title` directly.
function pageTitleFor(slug: string, season: { title: string; pageTitle?: string }) {
  return season.pageTitle ?? (isLatestCarSeason(slug) ? "Our Car" : season.title);
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

  return { title: pageTitleFor(slug, season) };
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

  const title = pageTitleFor(slug, season);

  return (
    <>
      <PageHero title={title} />
      <CarShowcase carName={carNameFrom(season.title)} />
      <CarNameOrigin />
      <CarSpecs />
      <CarCompetitionRecap />
    </>
  );
}
