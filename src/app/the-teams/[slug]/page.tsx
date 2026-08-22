import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { TeamRoster } from "@/components/TeamRoster";
import { getTeamSeasonBySlug, getTeamSeasons } from "@/lib/data";

function isLatestTeamSeason(slug: string) {
  return getTeamSeasons()[0]?.slug === slug;
}

function pageTitleFor(slug: string, season: { title: string; pageTitle?: string }) {
  return season.pageTitle ?? (isLatestTeamSeason(slug) ? "Our Team" : season.title);
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

  return { title: pageTitleFor(slug, season) };
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

  const title = pageTitleFor(slug, season);

  return (
    <>
      <PlaceholderPage
        title={title}
        minHeightClassName="min-h-[60vh]"
        backgroundImageSrc={season.backgroundImage}
        backgroundPosition={season.backgroundPosition}
        showDivider
        dividerBorderClassName="border-t-2 border-t-background/40 border-b-[3px] border-b-brand"
      />
      <TeamRoster slug={slug} />
    </>
  );
}
