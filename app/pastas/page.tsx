import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CatalogClient, type SortOption } from "@/components/products/CatalogClient";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";
import { getCategoryById } from "@/data/categories";

export const metadata: Metadata = {
  title: "Pastas caseras",
  description:
    "Comprá pastas caseras artesanales online: ravioles, sorrentinos, ñoquis, tallarines, lasagnas y combos. Elaboradas en el día en Argentina.",
};

interface PastasPageProps {
  searchParams: Promise<{ categoria?: string; q?: string; orden?: string }>;
}

function isSortOption(value: string | undefined): value is SortOption {
  return (
    value === "recomendados" ||
    value === "precio-asc" ||
    value === "precio-desc" ||
    value === "mas-vendidos"
  );
}

export default async function PastasPage({ searchParams }: PastasPageProps) {
  const params = await searchParams;
  const category = getCategoryById(params.categoria ?? "") ? params.categoria! : "todas";
  const query = params.q ?? "";
  const sort = isSortOption(params.orden) ? params.orden : "recomendados";

  const categoryName = category === "todas" ? null : getCategoryById(category)?.name;

  return (
    <div className="bg-manteca-50">
      <div className="paper-dots border-b border-cocoa-400/15 bg-manteca-50">
        <div className="container-ketty py-10 sm:py-12">
          <nav aria-label="Ruta de navegación" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-cocoa-600">
            <Link href="/" className="transition-colors hover:text-brand-700">
              Inicio
            </Link>
            <span aria-hidden="true" className="text-cocoa-400">/</span>
            <span className="font-medium text-cocoa-800">Pastas</span>
            {categoryName ? (
              <>
                <span aria-hidden="true" className="text-cocoa-400">/</span>
                <span className="font-serif italic text-brand-700">{categoryName}</span>
              </>
            ) : null}
          </nav>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-cocoa-800 sm:text-5xl">
            {categoryName ? categoryName : "Nuestras pastas"}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-cocoa-600">
            Todas nuestras pastas se elaboran en el día, a mano y con ingredientes
            frescos. Elegí las tuyas y te las llevamos a casa.
          </p>
        </div>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <CatalogClient
          initialCategory={category}
          initialQuery={query}
          initialSort={sort}
        />
      </Suspense>
    </div>
  );
}