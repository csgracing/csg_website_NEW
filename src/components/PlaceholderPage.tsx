import Image from "next/image";

export function PlaceholderPage({
  title,
  minHeightClassName = "",
  backgroundImageSrc,
  backgroundPosition = "center",
  blurredBlackBackground = false,
  blurFilm = false,
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
}) {
  const showPhoto = Boolean(backgroundImageSrc);
  const showBlurredBlack = !showPhoto && blurredBlackBackground;
  const showBlurFilm = !showPhoto && !showBlurredBlack && blurFilm;

  return (
    <div
      className={`relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-24 text-center ${minHeightClassName}`}
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

      <h1 className="relative text-4xl font-semibold tracking-tight uppercase sm:text-5xl">{title}</h1>
    </div>
  );
}
