import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Sponsors",
};

export default function OurSponsorsPage() {
  return <PageHero title="Our Sponsors" />;
}
