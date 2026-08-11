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
  // Lets callers grow this section beyond its natural flex-1 height
  // (roughly one viewport under the fixed navbar) without affecting every
  // other page that shares this component.
  minHeightClassName?: string;
  // Optional photo behind the title, dimmed and softened by a blurred dark
  // film so the text stays readable — no grain/noise texture on top.
  backgroundImageSrc?: string;
  // CSS object-position for the photo — lets a wide/short crop favour
  // faces over dead space (e.g. "center 25%" biases up toward heads).
  backgroundPosition?: string;
  // When there's no photo, gives the black section the same frosted-glass
  // film as the photo pages instead of flat black — a faint red glow +
  // stripe texture (borrowed from the homepage Hero) for backdrop-blur to
  // actually soften, so it reads as "blurred black" rather than a no-op.
  blurredBlackBackground?: boolean;
  // Plain version of the above: just the backdrop-blur film on flat black,
  // no red glow/stripe texture underneath.
  blurFilm?: boolean;
  // Whether a SectionDivider strip renders immediately below the
  // background box, as part of the same visual block. The title centers
  // against the *combined* height (background + divider) when this is on,
  // not just the background box's own shorter height — see the wrapper
  // structure below.
  showDivider?: boolean;
  // Optional color overrides passed straight through to SectionDivider
  // (e.g. the team pages invert the palette — red background, black
  // borders). Omit to use SectionDivider's own black/red defaults.
  dividerBackgroundClassName?: string;
  dividerBorderClassName?: string;
}) {
  const showPhoto = Boolean(backgroundImageSrc);
  const showBlurredBlack = !showPhoto && blurredBlackBackground;
  const showBlurFilm = !showPhoto && !showBlurredBlack && blurFilm;

  return (
    // Outer wrapper spans the background box AND (when present) the divider
    // strip below it — the title overlay is absolutely positioned against
    // this whole wrapper (inset-0), so it centers on the true visible top
    // (navbar's bottom edge) to true visible bottom (the divider's red
    // border, or the background box's own edge when there's no divider),
    // rather than being centered inside just the background box.
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
            {/* Neutral, unbranded glow — just enough variation for the blur
                below to actually soften instead of blurring flat black. */}
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
