import Image from "next/image";
import { getSiteConfig, getSocialLinks } from "@/lib/data";
import { MapEmbed } from "@/components/MapEmbed";
import { Icon } from "@/components/Icon";

export function Footer() {
  const site = getSiteConfig();
  const socials = getSocialLinks();

  const findSocial = (platform: string) => socials.find((social) => social.platform === platform);
  const linkedin = findSocial("linkedin");
  const email = findSocial("email");
  const instagram = findSocial("instagram");
  const facebook = findSocial("facebook");

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  const linkClass =
    "flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand";

  return (
    <footer className="border-t border-brand/40 bg-white px-6 py-20 text-[#0d0d0d]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="flex flex-col items-start">
            <div className="flex items-end gap-6">
              {/* University logo PNG has a lot of built-in whitespace around
                  the crest; crop to the crest's actual bounds so its edges
                  line up with the text below instead of the padded canvas. */}
              <div className="relative h-48 w-[123px]">
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
                className="h-12 w-auto -translate-y-2"
              />
            </div>

            <p className="mt-6 text-2xl font-bold uppercase">{site.university}</p>

            <div className="mt-4 space-y-1 text-lg text-muted">
              <p>Northampton Square</p>
              <p>London, UK</p>
              <p>EC1V 0HB</p>
            </div>
          </div>

          <MapEmbed />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t-2 border-black/30 pt-4">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Icon name="building" className="h-4 w-4" />
            {site.university}
          </a>

          {linkedin && (
            <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Icon name="linkedin" className="h-4 w-4" />
              LinkedIn
            </a>
          )}

          {email && (
            <a href={email.url} className={linkClass}>
              <Icon name="email" className="h-4 w-4" />
              {email.url.replace("mailto:", "")}
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
    </footer>
  );
}
