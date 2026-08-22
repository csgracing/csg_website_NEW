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
