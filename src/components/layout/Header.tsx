"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCarSeasons, getSiteConfig, getSocialLinks, getTeamSeasons } from "@/lib/data";
import { Icon } from "@/components/Icon";
import type { SeasonEntry } from "@/types/season";

const site = getSiteConfig();
// Facebook lives in the footer's link row only, not the corner icon grid.
const socials = getSocialLinks().filter((social) => social.platform !== "facebook");

const dropdownEntries: Record<"cars" | "teams", SeasonEntry[]> = {
  cars: getCarSeasons(),
  teams: getTeamSeasons(),
};

const navLinkClass = "py-0.5 transition-[padding,color] duration-300 hover:px-3 hover:text-brand";

// Never hide while still this close to the top of the page.
const TOP_THRESHOLD_PX = 120;

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`grid shrink-0 grid-cols-2 grid-rows-2 gap-x-3 gap-y-1.5 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target={social.platform === "email" ? undefined : "_blank"}
          rel={social.platform === "email" ? undefined : "noopener noreferrer"}
          aria-label={social.label}
          className="flex items-center justify-center text-white transition-colors hover:text-brand"
        >
          <Icon name={social.platform} className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<"cars" | "teams" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const scrolledUp = y < lastScrollY.current;
      const scrolledDown = y > lastScrollY.current;
      lastScrollY.current = y;

      if (y <= TOP_THRESHOLD_PX) {
        setNavHidden(false);
      } else if (scrolledUp) {
        setNavHidden(false);
      } else if (scrolledDown) {
        setNavHidden(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavHidden = navHidden && !mobileOpen && !openDropdown;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-brand/40 bg-gradient-to-b from-black/80 via-black/60 to-black/0 backdrop-blur-sm transition-transform duration-300 ${
        isNavHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="flex items-center justify-between gap-6 px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.shortName} home`}>
            <Image
              src="/images/csg-racing-logo.png"
              alt={site.shortName}
              width={334}
              height={90}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <ul className="hidden flex-wrap items-center gap-3 text-sm font-bold tracking-wide uppercase md:flex">
            {site.nav.map((item) => {
              const entries = item.dropdown ? dropdownEntries[item.dropdown] : null;
              const isOpen = Boolean(item.dropdown && openDropdown === item.dropdown);

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.dropdown)}
                  onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                  onFocus={() => item.dropdown && setOpenDropdown(item.dropdown)}
                  onBlur={(e) => {
                    if (item.dropdown && !e.currentTarget.contains(e.relatedTarget)) {
                      setOpenDropdown(null);
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={`${navLinkClass} ${isOpen ? "px-3 text-brand" : "px-1"}`}
                    aria-expanded={item.dropdown ? isOpen : undefined}
                  >
                    {item.shortLabel}
                  </Link>

                  {entries && openDropdown === item.dropdown && (
                    <div className="absolute left-0 top-full z-50 pt-3">
                      <ul className="table min-w-max border-collapse border border-white/10 bg-black/90 backdrop-blur-md">
                        {entries.map((entry) => {
                          const [label, ...rest] = entry.title.split(":");
                          const season = rest.join(":").trim();

                          return (
                            <li
                              key={entry.slug}
                              className="group table-row transition-colors hover:bg-brand/20"
                            >
                              <Link href={`${item.href}/${entry.slug}`} className="contents">
                                <span className="table-cell whitespace-nowrap py-2 pl-4 text-right normal-case transition-colors group-hover:text-brand">
                                  {season ? `${label}:` : label}
                                </span>
                                <span className="table-cell whitespace-nowrap py-2 pr-4 pl-1 normal-case transition-colors group-hover:text-brand">
                                  {season}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <SocialIcons className="hidden md:grid" />

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 items-center justify-center text-white md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            {mobileOpen ? (
              <>
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1 text-sm font-bold tracking-wide uppercase">
            {site.nav.map((item) => {
              const entries = item.dropdown ? dropdownEntries[item.dropdown] : null;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 transition-colors hover:text-brand"
                  >
                    {item.shortLabel}
                  </Link>

                  {entries && (
                    <ul className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {entries.map((entry) => (
                        <li key={entry.slug}>
                          <Link
                            href={`${item.href}/${entry.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 text-xs normal-case text-white/70 transition-colors hover:text-brand"
                          >
                            {entry.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <SocialIcons className="mt-4" />
        </div>
      )}
    </header>
  );
}
