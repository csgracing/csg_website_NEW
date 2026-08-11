// Header is `fixed`, so it doesn't reserve space in normal flow — anything
// centering itself "below the navbar" needs its actual rendered height, not
// y=0. Derived from Header.tsx: nav py-3 (12px top + 12px bottom) + the
// logo's h-9 (36px, the tallest item in the row) + the header's own
// border-b (1px) = 61px. Keep this in sync if Header's sizing changes.
export const HEADER_HEIGHT_PX = 61;
