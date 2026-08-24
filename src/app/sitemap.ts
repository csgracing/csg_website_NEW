import type { MetadataRoute } from "next";
import { getCarSeasons, getTeamSeasons } from "@/lib/data";

const BASE_URL = "https://csg.racing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about-us",
    "/our-cars",
    "/the-teams",
    "/gallery",
    "/our-sponsors",
    "/contact-us",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const carRoutes = getCarSeasons().map((season) => ({
    url: `${BASE_URL}/our-cars/${season.slug}`,
  }));

  const teamRoutes = getTeamSeasons().map((season) => ({
    url: `${BASE_URL}/the-teams/${season.slug}`,
  }));

  return [...staticRoutes, ...carRoutes, ...teamRoutes];
}
