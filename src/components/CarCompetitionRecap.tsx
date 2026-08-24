import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export function CarCompetitionRecap() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center bg-white px-6 py-16 text-[#0d0d0d] sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-bold tracking-wide text-brand uppercase">How The Competition Went</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight uppercase sm:text-4xl">
              Our First Weekend Back
            </h2>
            <p className="mt-6 max-w-2xl text-base text-black/60">
              Our first competition back after seven years away was a blur. Between late nights
              rehearsing our business plan presentation, tracking down scrutineers for advice and
              last-minute answers, and scoping out how the rest of the paddock did things, the
              schedule barely let up. We weren&apos;t able to get into the dynamic events this
              time round, but what we picked up on the ground was invaluable. We&apos;re taking
              everything we learned into next year, and we believe we&apos;ve got what it takes
              to come back even stronger.
            </p>

            <Link
              href="/gallery"
              className="mt-8 inline-flex items-center gap-2 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase text-brand transition-colors hover:bg-brand hover:text-white"
            >
              <Icon name="photo" className="h-4 w-4" />
              See More From The Comp In The Gallery
            </Link>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/cars/garage-placard-v2.jpg"
              alt="Our garage placard at Silverstone, garage 19, City, University of London / CSG Racing"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
