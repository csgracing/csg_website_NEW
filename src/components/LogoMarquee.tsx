import Image from "next/image";

type LogoMarqueeProps = {
  borderClassName?: string;
  heightClassName?: string;
  logoHeightClassName?: string;
  gapClassName?: string;
  repeatCount?: number;
  durationSeconds?: number;
};

export function LogoMarquee({
  borderClassName = "border-y-2 border-brand/40",
  heightClassName = "h-14",
  logoHeightClassName = "h-7",
  gapClassName = "gap-28",
  // One "set" (repeatCount logos) has to be at least as wide as the widest
  // screen we'll render on, or the -50% loop shows a blank gap partway
  // through as it waits for the second set to catch up. 20 is safely wide
  // enough even on ultra-wide monitors at this logo/gap size.
  repeatCount = 20,
  // Wider content needs a longer duration to keep the same slow crawl —
  // this default matches the default size/repeatCount above.
  durationSeconds = 290,
}: LogoMarqueeProps) {
  const logos = Array.from({ length: repeatCount * 2 });

  return (
    <div
      aria-hidden="true"
      className={`flex ${heightClassName} items-center overflow-hidden bg-background ${borderClassName}`}
    >
      <div
        className={`animate-marquee flex w-max shrink-0 items-center ${gapClassName}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {logos.map((_, i) => (
          <Image
            key={i}
            src="/images/csg-racing-logo.png"
            alt=""
            width={334}
            height={90}
            className={`${logoHeightClassName} w-auto shrink-0 ${i % 2 === 0 ? "brightness-0 invert" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
