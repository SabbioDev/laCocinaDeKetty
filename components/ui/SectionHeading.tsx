import { cn } from "@/lib/utils";
import { PastaRibbon } from "./PastaRibbon";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="flex items-center gap-2.5">
          <span className="text-brand-600">✦</span>
          <span className={cn("eyebrow", dark ? "text-manteca-200" : "text-brand-700")}>
            {eyebrow}
          </span>
          <PastaRibbon tone={dark ? "dark" : "light"} className="h-3 w-16" />
        </span>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl",
          dark ? "text-manteca-50" : "text-cocoa-800",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            dark ? "text-manteca-100/80" : "text-cocoa-600",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}