"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PackageSearch, Search, SlidersHorizontal } from "lucide-react";
import { products as allProducts } from "@/data/products";
import { ProductGrid } from "./ProductGrid";
import { FiltersPanel, type PriceBucket } from "./FiltersPanel";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState } from "@/components/ui/EmptyState";

export type SortOption =
  | "recomendados"
  | "precio-asc"
  | "precio-desc"
  | "mas-vendidos";

const sortOptions: Array<{ id: SortOption; label: string }> = [
  { id: "recomendados", label: "Recomendados" },
  { id: "precio-asc", label: "Precio menor a mayor" },
  { id: "precio-desc", label: "Precio mayor a menor" },
  { id: "mas-vendidos", label: "Más vendidos" },
];

function priceMatches(price: number, bucket: PriceBucket): boolean {
  switch (bucket) {
    case "todos":
      return true;
    case "hasta-5000":
      return price <= 5000;
    case "5000-8000":
      return price > 5000 && price <= 8000;
    case "8000-12000":
      return price > 8000 && price <= 12000;
    case "mas-12000":
      return price > 12000;
  }
}

function sortProducts(products: typeof allProducts, sort: SortOption) {
  const list = [...products];
  switch (sort) {
    case "precio-asc":
      return list.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return list.sort((a, b) => b.price - a.price);
    case "mas-vendidos":
      return list.sort((a, b) => b.soldCount - a.soldCount);
    case "recomendados":
    default:
      return list.sort(
        (a, b) =>
          Number(b.featured ?? false) - Number(a.featured ?? false) ||
          b.soldCount - a.soldCount,
      );
  }
}

export function CatalogClient({
  initialCategory,
  initialQuery,
  initialSort,
}: {
  initialCategory: string;
  initialQuery: string;
  initialSort: SortOption;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [price, setPrice] = useState<PriceBucket>("todos");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [pendingInitial, setPendingInitial] = useState<readonly [string, string, SortOption]>([
    initialCategory,
    initialQuery,
    initialSort,
  ]);
  if (
    pendingInitial[0] !== initialCategory ||
    pendingInitial[1] !== initialQuery ||
    pendingInitial[2] !== initialSort
  ) {
    setPendingInitial([initialCategory, initialQuery, initialSort]);
    setCategory(initialCategory);
    setQuery(initialQuery);
    setSort(initialSort);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "todas") {
      params.set("categoria", category);
    } else {
      params.delete("categoria");
    }
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    if (sort !== "recomendados") {
      params.set("orden", sort);
    } else {
      params.delete("orden");
    }
    const next = params.toString();
    router.replace(next ? `/pastas?${next}` : "/pastas", { scroll: false });
  }, [category, query, sort, router, searchParams]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = allProducts.filter((product) => {
      if (category !== "todas" && product.category !== category) return false;
      if (onlyAvailable && !product.available) return false;
      if (!priceMatches(product.price, price)) return false;
      if (normalized) {
        const haystack = [
          product.name,
          product.shortDescription,
          product.description,
          product.category,
          product.ingredients.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(normalized)) return false;
      }
      return true;
    });
    return sortProducts(result, sort);
  }, [category, query, price, onlyAvailable, sort]);

  const hasActiveFilters =
    category !== "todas" || price !== "todos" || onlyAvailable || query.trim() !== "";

  const clearFilters = () => {
    setCategory("todas");
    setPrice("todos");
    setOnlyAvailable(false);
    setQuery("");
  };

  return (
    <div className="container-ketty grid grid-cols-1 gap-10 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2]/80 p-6 shadow-sm backdrop-blur-sm">
          <FiltersPanel
            category={category}
            onCategoryChange={setCategory}
            price={price}
            onPriceChange={setPrice}
            onlyAvailable={onlyAvailable}
            onAvailabilityChange={setOnlyAvailable}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative"
          >
            <Search
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-cocoa-600"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscá por nombre, categoría o ingrediente…"
              aria-label="Buscar productos"
              className="w-full rounded-2xl border border-cocoa-400/40 bg-[#fdfaf2] py-3 pl-12 pr-4 text-sm text-cocoa-800 shadow-sm placeholder:text-cocoa-600/60 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </form>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-cocoa-600">
              <strong className="txt-num text-cocoa-800">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "producto" : "productos"}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-cocoa-400/50 bg-[#fdfaf2] px-4 py-2 text-sm font-medium text-cocoa-700 transition-colors hover:border-brand-600 hover:text-brand-700 focus-visible:outline-none lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filtros
              </button>
              <label className="sr-only" htmlFor="orden">
                Ordenar productos
              </label>
              <select
                id="orden"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-cocoa-400/50 bg-[#fdfaf2] px-4 py-2 text-sm font-medium text-cocoa-700 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No encontramos pastas con ese nombre."
            description="Probá buscando ravioles, ñoquis o sorrentinos, o limpiá los filtros para ver todo el catálogo."
            actionLabel="Ver todo el catálogo"
            actionHref="/pastas"
          />
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filtros"
        position="bottom"
      >
        <div className="overflow-y-auto px-5 py-5">
          <FiltersPanel
            category={category}
            onCategoryChange={setCategory}
            price={price}
            onPriceChange={setPrice}
            onlyAvailable={onlyAvailable}
            onAvailabilityChange={setOnlyAvailable}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
        <div className="border-t border-cocoa-400/20 px-5 py-4">
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="w-full rounded-full bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Ver {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </button>
        </div>
      </Drawer>
    </div>
  );
}