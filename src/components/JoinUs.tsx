import Link from "next/link";

export function JoinUs() {
  return (
    <section className="flex min-h-[320px] flex-col items-center justify-center bg-white px-6 py-16 text-center text-[#0d0d0d]">
      <h2 className="text-3xl font-black tracking-tight uppercase sm:text-5xl">Want to join us?</h2>
      <p className="mt-4 text-black/60">Applications are now open for the 2026/27 season.</p>

      <Link
        href="/contact-us#applications"
        className="mt-8 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand hover:text-white"
      >
        Apply Now
      </Link>
    </section>
  );
}
