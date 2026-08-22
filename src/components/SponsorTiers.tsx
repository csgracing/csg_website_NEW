import { getSponsorsByTier } from "@/lib/data";
import type { Sponsor, SponsorTier } from "@/types/sponsor";

const TIER_LABELS: Record<SponsorTier, string> = {
  gold: "Gold Sponsors",
  silver: "Silver Sponsors",
  bronze: "Bronze Sponsors",
};

const TIER_LOGO_BOX: Record<SponsorTier, string> = {
  gold: "h-24 w-48 sm:h-32 sm:w-64",
  silver: "h-16 w-32 sm:h-24 sm:w-44",
  bronze: "h-16 w-32 sm:h-24 sm:w-48",
};

const STAGGER = ["sm:translate-y-4", "sm:-translate-y-4"];

function SponsorLogo({
  sponsor,
  boxClassName,
  staggerClassName,
}: {
  sponsor: Sponsor;
  boxClassName: string;
  staggerClassName: string;
}) {
  const content = sponsor.logo ? (
    <img src={sponsor.logo} alt={sponsor.name} className="h-full w-full object-contain" />
  ) : (
    <span className="text-center text-sm font-semibold tracking-wide text-black/40 uppercase">{sponsor.name}</span>
  );

  const className = `flex items-center justify-center p-3 transition-opacity hover:opacity-70 ${boxClassName} ${staggerClassName}`;

  return sponsor.aboutUrl ? (
    <a href={sponsor.aboutUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export function SponsorTiers() {
  const sponsorsByTier = getSponsorsByTier();

  return (
    <section className="bg-white px-6 pt-16 pb-32 text-[#0d0d0d] sm:pt-20 sm:pb-40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-32">
        {(Object.keys(TIER_LABELS) as SponsorTier[]).map((tier) => {
          const sponsors = sponsorsByTier[tier];
          if (sponsors.length === 0) return null;

          return (
            <div key={tier} className="flex flex-col items-center">
              <p className="text-center text-sm font-bold tracking-wide text-brand uppercase">{TIER_LABELS[tier]}</p>

              <div className="mt-20 flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-12">
                {sponsors.map((sponsor, index) => (
                  <SponsorLogo
                    key={sponsor.slug}
                    sponsor={sponsor}
                    boxClassName={TIER_LOGO_BOX[tier]}
                    staggerClassName={STAGGER[index % 2]}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
