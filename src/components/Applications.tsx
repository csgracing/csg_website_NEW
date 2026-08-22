"use client";

import { useState } from "react";
import { SwirlDecoration } from "@/components/SwirlDecoration";

type Status = "idle" | "sending" | "sent" | "error";

export function Applications() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleApply() {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "application" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="applications"
      className="scroll-mt-[61px] relative overflow-hidden bg-white px-6 py-16 text-[#0d0d0d] sm:py-20"
    >
      <SwirlDecoration side="left" className="top-16 hidden lg:block" />
      <SwirlDecoration side="right" className="top-16 hidden lg:block" />
      <SwirlDecoration side="left" className="bottom-16 hidden lg:block" />
      <SwirlDecoration side="right" className="bottom-16 hidden lg:block" />
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-center text-sm font-bold tracking-wide text-brand uppercase">Recruitment</p>
        <h2 className="mt-2 text-center font-black tracking-tight uppercase">
          <span className="block text-3xl sm:text-5xl">Applications Are Now Open</span>
          <span className="mt-1 block text-lg text-black/60 sm:text-2xl">For The 2026/27 Season</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-black/60">
          Applications are first come, first served, so don&apos;t wait, apply today and take your
          first step onto the team.
        </p>

        <div className="mt-12 flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleApply}
              disabled={status === "sending" || status === "sent"}
              className="border border-brand px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-inherit"
            >
              {status === "sent" ? "Application Sent" : "Apply Now"}
            </button>
            {status === "sent" && <p className="text-sm text-black/60">Thanks! We&apos;ll be in touch.</p>}
            {status === "error" && (
              <p className="text-sm text-black/60">Something went wrong, please try again shortly.</p>
            )}
          </div>

          <div className="flex w-full max-w-xl flex-col items-center border border-dashed border-black/20 bg-black/5 p-8 text-center">
            <p className="text-lg font-bold uppercase">Don&apos;t know which department is best for your skills?</p>
            <p className="mt-3 text-sm text-black/60">
              Take a look at how the team is structured — what each department does and where you might
              fit in.
            </p>
            <a
              href="/documents/csg-racing-team-structure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 border border-brand px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-brand"
            >
              Click Here
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
