"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { useUiStore } from "@/store/ui";
import { Modal } from "@/components/ui/Modal";
import { searchProducts } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { formatPrice } from "@/lib/format";

const suggestions = ["Ravioles", "Ñoquis", "Sorrentinos", "Lasagnas"];

export function SearchDialog() {
  const { isSearchOpen, closeSearch } = useUiStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timeout);
    }
  }, [isSearchOpen]);

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  const results = useMemo(() => searchProducts(query), [query]);
  const showResults = query.trim().length >= 2;
  const noResults = showResults && results.length === 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    closeSearch();
    router.push(`/pastas?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Modal open={isSearchOpen} onClose={handleClose} title="Buscar productos">
      <form onSubmit={handleSubmit} className="border-b border-cocoa-400/20 px-6 py-4">
        <div className="flex items-center gap-3 rounded-full border border-cocoa-400/30 bg-[#fdfaf2] px-4 py-2.5">
          <Search className="h-5 w-5 shrink-0 text-cocoa-600" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscá ravioles, ñoquis, sorrentinos…"
            aria-label="Buscar productos"
            className="w-full bg-transparent text-base text-cocoa-800 placeholder:text-cocoa-600/60 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="rounded-full px-2 py-1 text-xs font-semibold text-cocoa-600 hover:text-brand-600"
            >
              Limpiar
            </button>
          ) : null}
        </div>
      </form>

      <div className="max-h-[60vh] overflow-y-auto">
        {!showResults ? (
          <div className="flex flex-col gap-3 px-6 py-5">
            <p className="eyebrow text-cocoa-600">Sugerencias</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="rounded-full border border-cocoa-400/40 bg-[#fdfaf2] px-4 py-2 text-sm font-medium text-cocoa-700 transition-colors hover:border-brand-600 hover:text-brand-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : noResults ? (
          <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
            <SearchX className="h-8 w-8 text-cocoa-400" aria-hidden="true" />
            <p className="font-serif text-xl font-semibold text-cocoa-800">
              No encontramos pastas con ese nombre.
            </p>
            <p className="text-sm text-cocoa-600">
              Probá buscando ravioles, ñoquis o sorrentinos.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/productos/${product.slug}`}
                  onClick={handleClose}
                  className="flex items-center gap-4 px-6 py-3 transition-colors hover:bg-manteca-100 focus-visible:bg-manteca-100 focus-visible:outline-none"
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-manteca-200">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium text-cocoa-800">
                      {product.name}
                    </span>
                    <span className="text-xs text-cocoa-600">
                      {getCategoryName(product.category)}
                    </span>
                  </span>
                  <span className="shrink-0 txt-num font-semibold text-brand-700">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showResults && !noResults ? (
        <div className="border-t border-cocoa-400/20 px-6 py-3">
          <Link
            href={`/pastas?q=${encodeURIComponent(query)}`}
            onClick={handleClose}
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Ver todos los resultados →
          </Link>
        </div>
      ) : null}
    </Modal>
  );
}