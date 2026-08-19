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
          "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors",
          checked
            ? "border-brand-600 bg-brand-600"
            : "border-cocoa-400/60 bg-white",
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
      <span className="text-sm text-cocoa-700">{label}</span>
    </label>
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
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-cocoa-400">
          Categoría
        </h3>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
          <button
            type="button"
            onClick={() => onCategoryChange("todas")}
            className={cn(
              "inline-flex w-fit justify-start rounded-full px-3 py-1.5 text-sm font-medium transition-colors lg:rounded-xl lg:px-3 lg:py-2",
              category === "todas"
                ? "bg-brand-600 text-white"
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
                "inline-flex w-fit justify-start rounded-full px-3 py-1.5 text-sm font-medium transition-colors lg:rounded-xl lg:px-3 lg:py-2",
                category === cat.id
                  ? "bg-brand-600 text-white"
                  : "text-cocoa-600 hover:bg-manteca-200 hover:text-brand-700",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-cocoa-400">
          Precio
        </h3>
        <div className="flex flex-col gap-1.5">
          {priceBuckets.map((bucket) => (
            <button
              key={bucket.id}
              type="button"
              onClick={() => onPriceChange(bucket.id)}
              className={cn(
                "inline-flex w-full justify-start rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                price === bucket.id
                  ? "bg-manteca-200 text-brand-700"
                  : "text-cocoa-600 hover:bg-manteca-100",
              )}
            >
              {bucket.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-cocoa-400">
          Disponibilidad
        </h3>
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
          className="inline-flex w-fit items-center gap-2 rounded-full border border-cocoa-400/50 px-4 py-2 text-sm font-medium text-cocoa-600 transition-colors hover:border-brand-600 hover:text-brand-700"
        >
          Limpiar filtros
        </button>
      ) : null}
    </div>
  );
}