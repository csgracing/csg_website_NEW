import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUsPage() {
  return <PageHero title="Contact Us" />;
}
