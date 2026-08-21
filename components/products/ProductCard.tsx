"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { getCategoryName } from "@/data/categories";
import { useCart } from "@/store/cart";
import { AvailabilityDot } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.available) return;
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link
        href={`/productos/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-manteca-200"
        aria-label={product.name}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-cocoa-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
            {product.badge}
          </span>
        ) : null}
        {!product.available ? (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-cocoa-700 px-4 py-1.5 text-sm font-semibold text-white">
              Sin stock
            </span>
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-brand-700">
            {getCategoryName(product.category)}
          </span>
          <AvailabilityDot available={product.available} />
        </div>
        <h3 className="font-serif text-xl font-bold leading-snug text-cocoa-800">
          <Link
            href={`/productos/${product.slug}`}
            className="transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-cocoa-600">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-cocoa-400/15 pt-4">
          <div className="flex flex-col">
            <span className="txt-num text-xl font-bold text-brand-700">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs font-medium text-cocoa-600">{product.weight}</span>
          </div>
          <button
            type="button"
            disabled={!product.available || added}
            onClick={handleAdd}
            aria-label={added ? "Agregado al carrito" : `Agregar ${product.name} al carrito`}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_10px_20px_-10px_rgb(168_58_36/0.7)] transition-all duration-300 focus-visible:outline-none disabled:opacity-40",
              added
                ? "scale-110 bg-sage-600 shadow-none"
                : "bg-brand-600 hover:bg-brand-700 active:scale-90",
            )}
          >
            {added ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <span
        role="status"
        className={cn(
          "pointer-events-none absolute bottom-28 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-cocoa-900 px-3.5 py-1.5 text-xs font-semibold text-manteca-50 shadow-lift opacity-0 transition-opacity duration-300",
          added && "opacity-100",
        )}
      >
        <Check className="h-3.5 w-3.5 text-sage-600" aria-hidden="true" />
        ¡Agregado al carrito!
      </span>
    </article>
  );
}