import Link from "next/link";
import { getSiteConfig } from "@/lib/data";

export function Header() {
  const site = getSiteConfig();

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Link href="/" className="font-semibold">
        {site.shortName}
      </Link>
      <nav className="flex gap-4">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
