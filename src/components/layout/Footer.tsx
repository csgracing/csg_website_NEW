import Image from "next/image";
import Link from "next/link";
import { getSiteConfig, getSocialLinks } from "@/lib/data";
import { MapEmbed } from "@/components/MapEmbed";
import { Icon } from "@/components/Icon";

export function Footer() {
  const site = getSiteConfig();
  const socials = getSocialLinks();

  const findSocial = (platform: string) => socials.find((social) => social.platform === platform);
  const linkedin = findSocial("linkedin");
  const tiktok = findSocial("tiktok");
  const instagram = findSocial("instagram");
  const facebook = findSocial("facebook");

  const foundingYear = 2024;
  const currentYear = new Date().getFullYear();

  const linkClass =
    "flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand";

  return (
    <footer className="border-t border-brand/40 bg-white px-6 pt-8 text-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          {/* Desktop: each side is scaled down and nudged outward for
              breathing room between the two halves. */}
          <div className="flex flex-col items-start md:-translate-x-4 md:-translate-y-[23.81px] md:scale-[0.94]">
            {/* CSG logo's vertical center is pinned to the gap between the
                red rules in the crest above, not the crest box's center —
                mt-[167.83px] is derived from the source PNGs' pixel
                measurements, not eyeballed. Recompute if either image or
                these sizes change. */}
            <div className="flex items-start gap-6">
              {/* Crops the whitespace-padded crest PNG to its visible
                  bounds; left offset re-centers it against the address
                  text below (also pixel-derived). */}
              <div className="relative left-[-30.22px] h-72 w-[184.5px]">
                <Image
                  src="/images/university-logo.png"
                  alt={site.university}
                  fill
                  style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                />
              </div>
              <Image
                src="/images/csg-racing-logo.png"
                alt={site.shortName}
                width={334}
                height={90}
                className="mt-[167.83px] h-12 w-auto"
              />
            </div>

            <p className="mt-4 text-2xl font-bold uppercase">{site.university}</p>

            <div className="mt-3 space-y-1 text-lg text-muted">
              <p>Northampton Square</p>
              <p>London, UK</p>
              <p>EC1V 0HB</p>
            </div>
          </div>

          <div className="md:translate-x-4 md:scale-[0.94]">
            <MapEmbed />
          </div>
        </div>

        {/* Quick Links + Follow Us as a content-sized flex row (not a 50/50
            grid) so both stay left-biased with a deliberate gap, instead of
            one being stranded at the far right edge. */}
        <div className="mt-6 flex flex-col gap-8 border-t-2 border-black/30 pt-16 md:flex-row md:items-start md:gap-24">
          <nav aria-label="Quick links" className="ml-10">
            <p className="text-lg tracking-widest text-muted underline">Quick Links</p>
            {/* w-fit stops the implicit grid columns from stretching to
                fill the row. */}
            <div className="mt-8 grid w-fit grid-flow-col grid-rows-4 gap-x-20 gap-y-3">
              {[
                { label: "Home", href: "/" },
                ...site.nav.map((item) => ({ label: item.shortLabel, href: item.href })),
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* No address/email here — those live in the map link above and
              Quick Links -> Contact Us — just the platforms we're on. */}
          <div className="ml-4">
            <p className="text-lg tracking-widest text-muted underline">Follow Us</p>
            <div className="mt-8 flex flex-col items-start gap-3">
              {linkedin && (
                <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Icon name="linkedin" className="h-4 w-4" />
                  LinkedIn
                </a>
              )}

              {tiktok && (
                <a href={tiktok.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Icon name="tiktok" className="h-4 w-4" />
                  TikTok
                </a>
              )}

              {instagram && (
                <a href={instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Icon name="instagram" className="h-4 w-4" />
                  Instagram
                </a>
              )}

              {facebook && (
                <a href={facebook.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Icon name="facebook" className="h-4 w-4" />
                  Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Own section: pb-4 controls the gap to the page's bottom edge;
            translate-x-6 nudges it off the shared right edge on purpose. */}
        <section className="mt-4 pb-4 md:translate-x-6">
          <p className="text-right text-xs text-muted">
            &copy; {foundingYear === currentYear ? foundingYear : `${foundingYear}–${currentYear}`}{" "}
            {site.shortName}. All rights reserved.{" "}
            <a
              href="https://www.citystgeorges.ac.uk/about/governance/policies/general-privacy-notice"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-brand"
            >
              Privacy Policy
            </a>
          </p>
        </section>
      </div>
    </footer>
  );
}
