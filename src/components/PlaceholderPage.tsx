import Image from "next/image";
import { SectionDivider } from "@/components/SectionDivider";
import { HEADER_HEIGHT_PX } from "@/lib/layout";

export function PlaceholderPage({
  title,
  minHeightClassName = "",
  backgroundImageSrc,
  backgroundPosition = "center",
  blurredBlackBackground = false,
  blurFilm = false,
  showDivider = false,
  dividerBackgroundClassName,
  dividerBorderClassName,
}: {
  title: string;
  minHeightClassName?: string;
  backgroundImageSrc?: string;
  backgroundPosition?: string;
  blurredBlackBackground?: boolean;
  blurFilm?: boolean;
  showDivider?: boolean;
  dividerBackgroundClassName?: string;
  dividerBorderClassName?: string;
}) {
  const showPhoto = Boolean(backgroundImageSrc);
  const showBlurredBlack = !showPhoto && blurredBlackBackground;
  const showBlurFilm = !showPhoto && !showBlurredBlack && blurFilm;

  return (
    <div className="relative isolate flex flex-1 flex-col">
      <div
        className={`relative isolate flex-1 overflow-hidden ${minHeightClassName}`}
      >
        {backgroundImageSrc && (
          <>
            <Image
              src={backgroundImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: backgroundPosition }}
              className="absolute inset-0 -z-20"
            />
            <div className="absolute inset-0 -z-10 bg-black/5 backdrop-blur-sm" />
          </>
        )}

        {showBlurredBlack && (
          <>
            <div
              className="absolute inset-0 -z-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at top left, rgba(148,56,10,0.22), transparent 45%),
                  radial-gradient(circle at bottom right, rgba(148,56,10,0.22), transparent 45%),
                  linear-gradient(to bottom right, black, rgba(148,56,10,0.3) 50%, black)
                `,
              }}
            />
            <div
              className="absolute inset-0 -z-20 opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(115deg, transparent, transparent 40px, rgba(196,20,20,0.5) 40px, rgba(196,20,20,0.5) 42px)",
                maskImage: "linear-gradient(to bottom, black, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
              }}
            />
            <div className="absolute inset-0 -z-10 bg-black/25 backdrop-blur-sm" />
          </>
        )}

        {showBlurFilm && (
          <>
            <div
              className="absolute inset-0 -z-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at top left, rgba(255,255,255,0.07), transparent 50%),
                  radial-gradient(circle at bottom right, rgba(255,255,255,0.05), transparent 50%)
                `,
              }}
            />
            <div className="absolute inset-0 -z-10 backdrop-blur-sm" />
          </>
        )}
      </div>

      {showDivider && (
        <SectionDivider
          backgroundClassName={dividerBackgroundClassName}
          borderClassName={dividerBorderClassName}
        />
      )}

      <h1
        className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center px-6 text-center text-4xl font-semibold tracking-tight uppercase sm:text-5xl"
        style={{ top: HEADER_HEIGHT_PX }}
      >
        {title}
      </h1>
    </div>
  );
}
