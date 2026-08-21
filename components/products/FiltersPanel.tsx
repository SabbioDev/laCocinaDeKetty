"use client";

import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

export type PriceBucket =
  | "todos"
  | "hasta-5000"
  | "5000-8000"
  | "8000-12000"
  | "mas-12000";

export const priceBuckets: Array<{ id: PriceBucket; label: string }> = [
  { id: "todos", label: "Todos los precios" },
  { id: "hasta-5000", label: "Hasta $5.000" },
  { id: "5000-8000", label: "$5.000 a $8.000" },
  { id: "8000-12000", label: "$8.000 a $12.000" },
  { id: "mas-12000", label: "Más de $12.000" },
];

interface FiltersPanelProps {
  category: string;
  onCategoryChange: (category: string) => void;
  price: PriceBucket;
  onPriceChange: (price: PriceBucket) => void;
  onlyAvailable: boolean;
  onAvailabilityChange: (available: boolean) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function FilterCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-lg border-2 transition-colors",
          checked
            ? "border-brand-600 bg-brand-600"
            : "border-cocoa-400/60 bg-[#fdfaf2]",
        )}
        aria-hidden="true"
      >
        {checked ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-white stroke-2">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" />
          </svg>
        ) : null}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm font-medium text-cocoa-700">{label}</span>
    </label>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="eyebrow mb-3.5 flex items-center gap-2 text-cocoa-600">
      <span className="h-px w-4 bg-brand-600/50" aria-hidden="true" />
      {children}
    </h3>
  );
}

export function FiltersPanel({
  category,
  onCategoryChange,
  price,
  onPriceChange,
  onlyAvailable,
  onAvailabilityChange,
  onClear,
  hasActiveFilters,
}: FiltersPanelProps) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <GroupTitle>Categoría</GroupTitle>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
          <button
            type="button"
            onClick={() => onCategoryChange("todas")}
            className={cn(
              "inline-flex w-fit justify-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none lg:rounded-2xl",
              category === "todas"
                ? "bg-brand-600 text-white shadow-[0_10px_18px_-10px_rgb(168_58_36/0.7)]"
                : "text-cocoa-600 hover:bg-manteca-200 hover:text-brand-700",
            )}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "inline-flex w-fit justify-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none lg:rounded-2xl",
                category === cat.id
                  ? "bg-brand-600 text-white shadow-[0_10px_18px_-10px_rgb(168_58_36/0.7)]"
                  : "text-cocoa-600 hover:bg-manteca-200 hover:text-brand-700",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <GroupTitle>Precio</GroupTitle>
        <div className="flex flex-col gap-1.5">
          {priceBuckets.map((bucket) => (
            <button
              key={bucket.id}
              type="button"
              onClick={() => onPriceChange(bucket.id)}
              className={cn(
                "inline-flex w-full justify-start rounded-2xl border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none",
                price === bucket.id
                  ? "border-brand-600/40 bg-brand-600/10 text-brand-700"
                  : "border-transparent text-cocoa-600 hover:bg-manteca-200",
              )}
            >
              {bucket.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <GroupTitle>Disponibilidad</GroupTitle>
        <FilterCheckbox
          checked={onlyAvailable}
          onChange={onAvailabilityChange}
          label="Solo disponibles"
        />
      </div>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-cocoa-400/50 px-4 py-2 text-sm font-medium text-cocoa-600 transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:outline-none"
        >
          Limpiar filtros
        </button>
      ) : null}
    </div>
  );
}