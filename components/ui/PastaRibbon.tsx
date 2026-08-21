import { cn } from "@/lib/utils";

interface PastaRibbonProps {
  className?: string;
  /** "light" para fondo claro (papel), "dark" para fondo espresso */
  tone?: "light" | "dark";
}

/**
 * Cinta de masa fresca: la firma visual de La Cocina Ketty.
 * Se usa como acento bajo títulos y etiquetas, evocando una
 * lámina de fettuccine recién cortada.
 */
export function PastaRibbon({ className, tone = "light" }: PastaRibbonProps) {
  const dark = tone === "dark";
  return (
    <svg
      viewBox="0 0 128 22"
      role="presentation"
      aria-hidden="true"
      className={cn("h-4 w-24 shrink-0", className)}
    >
      <path
        d="M2 13c7-7 15 6 22-1s14-8 21-1 14 8 21 1 15-8 22-1 15 8 22 1 14-8 21-1"
        fill="none"
        stroke={dark ? "#8b2d1b" : "#e0b877"}
        strokeWidth="5"
        strokeLinecap="round"
        opacity={dark ? 0.7 : 0.9}
      />
      <path
        d="M2 16c8-8 16 7 24 0s16-9 24-1 16 9 24 1 16-9 24-1 17 9 24 1 8-7 14-1"
        fill="none"
        stroke={dark ? "#c24a30" : "#a83a24"}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M4 13c6-5 13 5 19 0s13-6 19 0 13 6 19 0 13-6 19 0 13 6 19 0 12-5 17 0"
        fill="none"
        stroke={dark ? "#d9a441" : "#c24a30"}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}