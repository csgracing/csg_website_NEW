import Link from "next/link";

export function SponsorUs() {
  return (
    <section className="flex min-h-[320px] flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <h2 className="text-3xl font-black tracking-tight uppercase sm:text-5xl">Want to sponsor us?</h2>
      <p className="mt-4 text-white/70">Get in touch and let&apos;s talk about partnering up.</p>

      <Link
        href="/contact-us"
        className="mt-8 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand"
      >
        Get In Touch
      </Link>
    </section>
  );
}
