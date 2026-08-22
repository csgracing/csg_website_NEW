import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AboutIntro } from "@/components/AboutIntro";
import { AboutHistory } from "@/components/AboutHistory";
import { AboutTimeline } from "@/components/AboutTimeline";
import { JoinHistory } from "@/components/JoinHistory";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutUsPage() {
  return (
    <>
      <PageHero title="About Us" />
      <AboutIntro />
      <AboutHistory />
      <AboutTimeline />
      <JoinHistory />
    </>
  );
}
