import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUsPage() {
  return <PageHero title="About Us" />;
}
