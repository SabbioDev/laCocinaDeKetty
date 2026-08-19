"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { getCategoryName } from "@/data/categories";
import { useCart } from "@/store/cart";
import { Badge, AvailabilityDot } from "@/components/ui/Badge";
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
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-cocoa-400/20 bg-white transition-shadow duration-300 hover:shadow-card">
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
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.badge ? (
          <Badge className="absolute left-4 top-4">{product.badge}</Badge>
        ) : null}
        {!product.available ? (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-cocoa-700 px-4 py-1.5 text-sm font-semibold text-white">
              Sin stock
            </span>
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-cocoa-400">
            {getCategoryName(product.category)}
          </span>
          <AvailabilityDot available={product.available} />
        </div>
        <h3 className="font-serif text-lg font-semibold leading-snug text-cocoa-800">
          <Link
            href={`/productos/${product.slug}`}
            className="transition-colors hover:text-brand-700"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-cocoa-500">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-brand-700">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-cocoa-400">{product.weight}</span>
          </div>
          <button
            type="button"
            disabled={!product.available || added}
            onClick={handleAdd}
            aria-label={added ? "Agregado al carrito" : `Agregar ${product.name} al carrito`}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-40",
              added
                ? "bg-emerald-600 text-white"
                : "bg-brand-600 text-white hover:bg-brand-700 active:scale-90",
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
          "pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-cocoa-800 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-300",
          added && "opacity-100",
        )}
      >
        ¡Agregado al carrito!
      </span>
    </article>
  );
}