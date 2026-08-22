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
  repeatCount = 20,
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
