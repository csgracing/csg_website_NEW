import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Applications } from "@/components/Applications";
import { GetInTouch } from "@/components/GetInTouch";
import { SectionDivider } from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUsPage() {
  return (
    <>
      <PageHero title="Contact Us" />
      <Applications />
      <SectionDivider backgroundClassName="bg-white" borderClassName="border-t border-black/10 border-b-2 border-b-brand" heightClassName="h-2" />
      <GetInTouch />
    </>
  );
}
