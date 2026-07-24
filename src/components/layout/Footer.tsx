import Link from "next/link";
import { getSiteConfig, getSocialLinks } from "@/lib/data";

export function Footer() {
  const site = getSiteConfig();
  const socials = getSocialLinks();

  return (
    <footer className="flex items-center justify-between px-6 py-4">
      <p>
        &copy; {new Date().getFullYear()} {site.name}
      </p>
      <nav className="flex gap-4">
        {socials.map((social) => (
          <Link key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer">
            {social.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
