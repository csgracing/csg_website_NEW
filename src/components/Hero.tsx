import Image from "next/image";
import Link from "next/link";
import { getSiteConfig } from "@/lib/data";

export function Hero() {
  const site = getSiteConfig();

  return (
    <section className="relative isolate flex h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at top left, rgba(148,56,10,0.22), transparent 45%),
            radial-gradient(circle at bottom right, rgba(148,56,10,0.22), transparent 45%),
            linear-gradient(to bottom right, black, rgba(148,56,10,0.3) 50%, black)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 40px, rgba(196,20,20,0.5) 40px, rgba(196,20,20,0.5) 42px)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center px-6 pt-24 text-center">
        <h1 className="text-3xl font-black tracking-tight uppercase sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-4 w-full text-sm text-white/70 sm:text-lg sm:whitespace-nowrap">
          City St George&apos;s, University of London&apos;s Official Formula Student Racing Team
        </p>
        <div className="mt-12 flex gap-4">
          <Link
            href="/contact-us#get-in-touch"
            className="border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand"
          >
            Get In Touch
          </Link>
        </div>

      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[45vh] items-center justify-center overflow-hidden select-none sm:h-[58vh]">
        <svg
          className="h-auto w-full"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <text
            x="500"
            y="240"
            textAnchor="middle"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            transform="translate(-16, 0)"
            className="font-black italic"
            fontSize="280"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          >
            CSG
          </text>
        </svg>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-0 flex h-[45vh] max-h-full items-end justify-center sm:h-[58vh] lg:h-[72vh]">
        <div
          className="relative h-auto w-[92vw] max-w-full sm:h-[58vh] sm:w-auto sm:max-h-full lg:h-[72vh]"
          style={{ aspectRatio: "2.176" }}
        >
          <Image
            src="/images/hero-car-Photoroom.png"
            alt="CSG Racing's Formula Student car"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 65vw"
            style={{ objectFit: "cover", objectPosition: "52.5% 60%" }}
            className="drop-shadow-[0_35px_45px_rgba(0,0,0,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}
