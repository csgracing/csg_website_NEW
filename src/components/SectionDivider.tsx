// Plain divider bar between sections — same shell as the homepage's
// LogoMarquee (height, background, border weight) but with no scrolling
// logos and no animation, just an empty rectangle. Defaults to black with
// red borders; callers can swap the palette (e.g. the team pages use red
// with black borders — the same bar, colors inverted).
export function SectionDivider({
  heightClassName = "h-3",
  backgroundClassName = "bg-background",
  borderClassName = "border-t-2 border-t-brand/40 border-b-[3px] border-b-brand",
}: {
  heightClassName?: string;
  backgroundClassName?: string;
  borderClassName?: string;
}) {
  return (
    <div aria-hidden="true" className={`w-full ${backgroundClassName} ${heightClassName} ${borderClassName}`} />
  );
}
