// Plain black divider bar between sections — same shell as the homepage's
// LogoMarquee (height, background, border weight) but with no scrolling
// logos and no animation, just an empty rectangle.
export function SectionDivider({
  heightClassName = "h-3",
  borderClassName = "border-t border-t-brand/40 border-b-[3px] border-b-brand",
}: {
  heightClassName?: string;
  borderClassName?: string;
}) {
  return <div aria-hidden="true" className={`w-full bg-background ${heightClassName} ${borderClassName}`} />;
}
