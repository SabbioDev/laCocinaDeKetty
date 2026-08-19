import { cn } from "@/lib/utils";

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
        "bg-[linear-gradient(to_bottom,var(--color-manteca-200),var(--color-manteca-50))] border-b border-cocoa-400/15",
        className,
      )}
    >
      <div className="container-ketty flex flex-col items-center gap-4 py-16 text-center sm:py-20">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-balance font-serif text-4xl font-bold text-cocoa-800 sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-2xl text-base leading-relaxed text-cocoa-500">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}