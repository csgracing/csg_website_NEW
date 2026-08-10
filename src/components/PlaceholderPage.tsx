import Image from "next/image";

export function PlaceholderPage({
  title,
  minHeightClassName = "",
  backgroundImageSrc,
  backgroundPosition = "center",
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
}) {
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

      <h1 className="relative text-3xl font-semibold">{title}</h1>
    </div>
  );
}
