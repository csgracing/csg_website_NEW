export function SwirlDecoration({
  side,
  className = "",
}: {
  side: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 160"
      className={`pointer-events-none absolute w-10 text-brand opacity-25 sm:w-14 ${
        side === "left" ? "left-4 sm:left-8" : "right-4 sm:right-8 -scale-x-100"
      } ${className}`}
    >
      <path
        d="M12 150 C12 105 46 108 46 68 C46 38 22 24 14 40 C8 52 20 58 28 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
