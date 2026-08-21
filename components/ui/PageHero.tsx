import { cn } from "@/lib/utils";
import { PastaRibbon } from "./PastaRibbon";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHero({ eyebrow, title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-cocoa-400/15 bg-[var(--color-manteca-50)] paper-dots",
        className,
      )}
    >
      <div className="container-ketty flex flex-col items-center gap-5 py-16 text-center sm:py-20">
        {eyebrow ? (
          <span className="flex items-center gap-2.5">
            <span className="text-brand-600">✦</span>
            <span className="eyebrow text-brand-700">{eyebrow}</span>
            <PastaRibbon className="h-3 w-16" />
          </span>
        ) : null}
        <h1 className="text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-cocoa-800 sm:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-2xl text-base leading-relaxed text-cocoa-600 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}