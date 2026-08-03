import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getCarSeasonBySlug, getCarSeasons } from "@/lib/data";

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

  return { title: season?.title ?? "Our Cars" };
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

  return <PlaceholderPage title={season.title} />;
}
