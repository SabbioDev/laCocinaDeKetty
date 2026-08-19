import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-cocoa-400/40 bg-manteca-100/60 px-6 py-16 text-center">
      {Icon ? (
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-manteca-200 text-brand-600">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </span>
      ) : null}
      <div className="flex flex-col gap-1">
        <h3 className="font-serif text-2xl font-semibold text-cocoa-800">{title}</h3>
        {description ? (
          <p className="max-w-md text-sm leading-relaxed text-cocoa-500">{description}</p>
        ) : null}
      </div>
      {actionLabel && actionHref ? (
        <Button href={actionHref} variant="primary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}