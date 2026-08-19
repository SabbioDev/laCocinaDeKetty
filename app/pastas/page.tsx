import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CatalogClient, type SortOption } from "@/components/products/CatalogClient";
import { ProductGridSkeleton } from "@/components/products/ProductGrid";
import { getCategoryById } from "@/data/categories";
import { siteConfig } from "@/config/site";

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
      <div className="border-b border-cocoa-400/20 bg-manteca-100">
        <div className="container-ketty py-10">
          <nav aria-label="Ruta de navegación" className="mb-2 text-sm text-cocoa-500">
            <Link href="/" className="hover:text-brand-700">
              Inicio
            </Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span className="text-cocoa-700">Pastas</span>
            {categoryName ? (
              <>
                <span aria-hidden="true" className="mx-2">/</span>
                <span className="text-cocoa-700">{categoryName}</span>
              </>
            ) : null}
          </nav>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 sm:text-4xl">
            {categoryName ? categoryName : "Nuestras pastas"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-cocoa-500">
            Todas nuestras pastas se elaboran en el día, a mano y con ingredientes
            frescos. Elegí las tuyas y te las llevamos a casa. {siteConfig.name}
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