import Image from "next/image";

type TimelineEntry =
  | { type: "car"; season: string; name: string; image?: string; latest?: boolean }
  | { type: "marker"; label: string; icon: "hiatus" | "rebrand" | "today" };

const TIMELINE: TimelineEntry[] = [
  { type: "car", season: "2009", name: "CR09", image: "/images/history/cr09.jpg" },
  { type: "car", season: "2010", name: "CR10", image: "/images/history/cr10.jpg" },
  { type: "car", season: "2011", name: "Class 2A Entry", image: "/images/history/cr11.jpg" },
  { type: "car", season: "2012", name: "CR12", image: "/images/history/cr12.jpg" },
  { type: "car", season: "2013", name: "CR13", image: "/images/history/cr13.jpg" },
  { type: "car", season: "2015", name: "CR15", image: "/images/history/cr15.jpg" },
  { type: "car", season: "2016", name: "CR16", image: "/images/history/cr16.jpg" },
  { type: "car", season: "2017", name: "CR17", image: "/images/history/cr17.png" },
  { type: "car", season: "2018", name: "CR18", image: "/images/history/cr18.jpg" },
  { type: "marker", label: "7-Year Hiatus", icon: "hiatus" },
  { type: "marker", label: "Rebrand", icon: "rebrand" },
  { type: "car", season: "2024/25", name: "Concept" },
  { type: "car", season: "2025/26", name: "GRETA (CSG25)", image: "/images/history/greta.jpg", latest: true },
  { type: "marker", label: "Today", icon: "today" },
];

const CARD_ALIGN = {
  left: "items-center text-center md:items-end md:text-right",
  right: "items-center text-center md:items-start md:text-left",
} as const;

function TimelineCard({ entry, align }: { entry: Extract<TimelineEntry, { type: "car" }>; align: "left" | "right" }) {
  return (
    <div className={`flex w-full max-w-xs flex-col ${CARD_ALIGN[align]}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {entry.image ? (
          <Image src={entry.image} alt={`${entry.name} (${entry.season})`} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-dashed border-white/20 bg-white/5 text-sm text-white/40 uppercase">
            Image placeholder
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-bold tracking-wide text-brand uppercase">{entry.season}</p>
      <p className="text-lg font-black uppercase">{entry.name}</p>
      {entry.latest && <p className="mt-1 text-xs font-black tracking-widest text-brand">LATEST</p>}
    </div>
  );
}

function MarkerIcon({ icon }: { icon: "hiatus" | "rebrand" | "today" }) {
  if (icon === "hiatus") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-brand">
        <path d="M8 5v14M16 5v14" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-brand">
      <path d="M12 4v14" strokeLinecap="round" />
      <path d="M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimelineMarker({ label, icon }: { label: string; icon: "hiatus" | "rebrand" | "today" }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand bg-background">
        <MarkerIcon icon={icon} />
      </div>
      <p className="mt-3 bg-background px-2 text-sm font-black tracking-widest text-brand uppercase">
        {label}
      </p>
    </div>
  );
}

export function AboutTimeline() {
  return (
    <section className="bg-background px-6 py-16 text-white sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex justify-end">
          <p className="text-sm font-bold tracking-wide text-brand uppercase">Scroll Through Our History</p>
        </div>

        <div className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-6 w-1.5 bg-brand md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-20">
            {TIMELINE.map((entry, index) =>
              entry.type === "marker" ? (
                <div key={index} className="relative grid grid-cols-[48px_1fr] items-center md:grid-cols-[1fr_48px_1fr]">
                  <div className="hidden md:block" />
                  <div className="flex justify-center">
                    <TimelineMarker label={entry.label} icon={entry.icon} />
                  </div>
                  <div className="hidden md:block" />
                </div>
              ) : (
                <div key={index} className="relative grid grid-cols-[48px_1fr] items-center gap-6 md:grid-cols-[1fr_48px_1fr]">
                  <div className="hidden md:flex md:justify-end">
                    {index % 2 === 0 && <TimelineCard entry={entry} align="left" />}
                  </div>
                  <div className="flex justify-center">
                    <div className="h-4 w-4 rounded-full border-4 border-background bg-brand" />
                  </div>
                  <div className={index % 2 !== 0 ? "flex justify-start" : "flex justify-start md:hidden"}>
                    <TimelineCard entry={entry} align="right" />
                  </div>
                </div>
              ),
            )}

            <div className="relative grid grid-cols-[48px_1fr] pt-6 md:grid-cols-[1fr_48px_1fr]">
              <div className="hidden md:block" />
              <div className="flex justify-center">
                <svg viewBox="0 0 24 24" className="h-10 w-10 fill-brand">
                  <polygon points="3,3 21,3 12,21" />
                </svg>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
