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
    <footer className="border-t-[3px] border-brand/40 bg-white px-6 pt-6 text-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
          <div className="flex flex-col items-start md:-translate-x-4 md:-translate-y-[17.86px] md:scale-[0.94]">
            <div className="flex items-start gap-5">
              <div className="relative left-[-22.67px] h-[216px] w-[138px]">
                <Image
                  src="/images/university-logo.png"
                  alt={site.university}
                  fill
                  sizes="138px"
                  style={{ objectFit: "cover", objectPosition: "50% 50%" }}
                />
              </div>
              <Image
                src="/images/csg-racing-logo.png"
                alt={site.shortName}
                width={334}
                height={90}
                className="mt-[125.87px] h-9 w-auto"
              />
            </div>

            <p className="mt-3 text-lg font-bold uppercase">{site.university}</p>

            <div className="mt-2 space-y-0.5 text-sm text-muted">
              <p>Northampton Square</p>
              <p>London, UK</p>
              <p>EC1V 0HB</p>
            </div>
          </div>

          <div className="md:translate-x-4 md:scale-[0.94]">
            <MapEmbed />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-6 border-t-2 border-black/30 pt-10 md:flex-row md:items-start md:gap-16">
          <nav aria-label="Quick links" className="ml-6">
            <p className="text-base tracking-widest text-muted underline">Quick Links</p>
            <div className="mt-5 grid w-fit grid-flow-col grid-rows-4 gap-x-12 gap-y-2">
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

          <div className="ml-2">
            <p className="text-base tracking-widest text-muted underline">Follow Us</p>
            <div className="mt-5 flex flex-col items-start gap-2">
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
