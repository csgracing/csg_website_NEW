import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getTeamSeasonBySlug, getTeamSeasons } from "@/lib/data";

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

  return { title: season?.title ?? "The Team" };
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

  return <PlaceholderPage title={season.title} />;
}
