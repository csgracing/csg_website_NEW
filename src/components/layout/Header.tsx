"use client";

import Link from "next/link";
import { useState } from "react";
import { getCarSeasons, getSiteConfig, getSocialLinks, getTeamSeasons } from "@/lib/data";
import type { SeasonEntry } from "@/types/season";

const site = getSiteConfig();
const socials = getSocialLinks();

const dropdownEntries: Record<"cars" | "teams", SeasonEntry[]> = {
  cars: getCarSeasons(),
  teams: getTeamSeasons(),
};

const navLinkClass = "rounded px-1 py-0.5 hover:bg-black/5 dark:hover:bg-white/10";

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<"cars" | "teams" | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b bg-white dark:bg-black">
      <nav className="flex items-center justify-between gap-6 px-6 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="shrink-0" aria-label={`${site.shortName} home`}>
            {/* Placeholder logo — swap for the team logo image */}
            <span className="flex h-10 w-10 items-center justify-center border text-[10px] font-semibold uppercase">
              Logo
            </span>
          </Link>

          <ul className="flex flex-wrap items-center gap-4 text-sm">
            {site.nav.map((item) => {
              const entries = item.dropdown ? dropdownEntries[item.dropdown] : null;

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.dropdown)}
                  onMouseLeave={() => item.dropdown && setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={navLinkClass}
                    aria-expanded={item.dropdown ? openDropdown === item.dropdown : undefined}
                  >
                    {item.shortLabel}
                  </Link>

                  {entries && openDropdown === item.dropdown && (
                    <ul className="absolute left-0 top-full z-50 min-w-max border bg-white dark:bg-black">
                      {entries.map((entry) => (
                        <li key={entry.slug}>
                          <Link
                            href={`${item.href}/${entry.slug}`}
                            className="block whitespace-nowrap px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
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
        </div>

        <div className="grid shrink-0 grid-cols-2 grid-rows-2 gap-1">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target={social.platform === "email" ? undefined : "_blank"}
              rel={social.platform === "email" ? undefined : "noopener noreferrer"}
              aria-label={social.label}
              className="flex h-6 w-6 items-center justify-center border text-[10px] uppercase hover:bg-black/5 dark:hover:bg-white/10"
            >
              {social.label[0]}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
