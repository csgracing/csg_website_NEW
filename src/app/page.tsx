import { Hero } from "@/components/Hero";
import { WereBack } from "@/components/WereBack";
import { Stats } from "@/components/Stats";
import { AboutPreview } from "@/components/AboutPreview";
import { LogoMarquee } from "@/components/LogoMarquee";
import { JoinUs } from "@/components/JoinUs";
import { SponsorUs } from "@/components/SponsorUs";

// Shared sizing for every strip between sections — only the border (which
// side gets the thick brand-red edge, facing whichever section is black)
// changes per placement.
const MINI_MARQUEE = {
  heightClassName: "h-6",
  logoHeightClassName: "h-3",
  gapClassName: "gap-16",
  // See the comment on LogoMarquee's default repeatCount — these logos are
  // smaller, so a "set" needs more repeats to stay wider than any screen.
  repeatCount: 30,
  durationSeconds: 220,
} as const;

const borderThickTop = "border-t-4 border-t-brand border-b border-b-brand/40";
const borderThickBottom = "border-t border-t-brand/40 border-b-4 border-b-brand";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee {...MINI_MARQUEE} borderClassName={borderThickTop} />
      <AboutPreview />
      <LogoMarquee {...MINI_MARQUEE} borderClassName={borderThickBottom} />
      <WereBack />
      <Stats />
      <LogoMarquee {...MINI_MARQUEE} borderClassName={borderThickTop} />
      <JoinUs />
      <LogoMarquee {...MINI_MARQUEE} borderClassName={borderThickBottom} />
      <SponsorUs />
      <LogoMarquee {...MINI_MARQUEE} borderClassName={borderThickTop} />
    </>
  );
}
