import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid, type GallerySeason } from "@/components/GalleryGrid";
import { getTeamSeasons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
};

const TOTAL_PLACEHOLDER_PHOTOS = 50;

export default function GalleryPage() {
  const seasons = getTeamSeasons(); 
  const base = Math.floor(TOTAL_PLACEHOLDER_PHOTOS / seasons.length);
  const remainder = TOTAL_PLACEHOLDER_PHOTOS % seasons.length;

  const gallerySeasons: GallerySeason[] = seasons.map((season, index) => {
    const yearMatch = season.slug.match(/(\d{4}-\d{4})/);

    return {
      slug: season.slug,
      label: season.title,
      shortLabel: yearMatch ? yearMatch[1] : season.title,
      count: base + (index < remainder ? 1 : 0),
    };
  });

  return (
    <>
      <PageHero title="Gallery" />
      <GalleryGrid seasons={gallerySeasons} />
    </>
  );
}
