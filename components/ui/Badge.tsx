import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "manteca";

const variants: Record<BadgeVariant, string> = {
  brand: "bg-brand-600 text-white",
  manteca: "bg-manteca-200 text-brand-700",
};

export function Badge({
  children,
  variant = "brand",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function AvailabilityDot({ available }: { available: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          available ? "bg-emerald-600" : "bg-cocoa-400",
        )}
        aria-hidden="true"
      />
      <span className={available ? "text-emerald-700" : "text-cocoa-500"}>
        {available ? "Disponible" : "Sin stock"}
      </span>
    </span>
  );
}