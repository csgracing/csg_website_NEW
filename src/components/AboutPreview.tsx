import Image from "next/image";
import Link from "next/link";
import { getTeamSeasons } from "@/lib/data";

export function AboutPreview() {
  const latestTeamSlug = getTeamSeasons()[0]?.slug;

  return (
    <section className="flex min-h-[90vh] flex-col justify-center bg-white px-6 py-16 text-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-bold tracking-wide text-brand uppercase">Silverstone 2026</p>

        <div className="mt-8 grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative aspect-[5/4] w-full overflow-hidden">
            <Image
              src="/images/teams/fsuk-class-1-2025-2026.jpg"
              alt="The CSG Racing team, 2025-2026 season"
              fill
              style={{ objectFit: "cover", objectPosition: "center 35%" }}
            />
          </div>

          <div>
            <h2 className="text-4xl font-black tracking-tight uppercase sm:text-5xl">
              One Pack. One Pace.
            </h2>
            <p className="mt-7 text-xl leading-relaxed text-black/60">
              In 2026, we took our university&apos;s first-ever EV to the track at Silverstone, the
              first car we&apos;ve fielded since 2018. Behind it is a dedicated team spanning every
              discipline, not just engineering, bringing together people of every background and
              skill set working toward one shared goal. This is just the start; we&apos;re only
              getting faster from here, and we&apos;re bringing our mascot along for the ride.
            </p>

            {latestTeamSlug && (
              <Link
                href={`/the-teams/${latestTeamSlug}`}
                className="mt-9 inline-block border border-brand px-7 py-3.5 text-base font-semibold tracking-wide uppercase transition-colors hover:bg-brand hover:text-white"
              >
                Meet The Team
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
