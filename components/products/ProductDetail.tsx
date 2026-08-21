"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { getCategoryName } from "@/data/categories";
import { useCart } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { AvailabilityDot } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.available) return;
    addItem(product, quantity);
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-manteca-200 shadow-soft ring-1 ring-cocoa-400/15">
          <Image
            key={activeImage}
            src={product.images[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge ? (
            <span className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
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
        </div>
        {product.images.length > 1 ? (
          <div className="flex gap-3" role="tablist" aria-label="Galería del producto">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                role="tab"
                aria-selected={index === activeImage}
                aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                onClick={() => setActiveImage(index)}
                className={cn(
                  "relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors focus-visible:outline-none",
                  index === activeImage
                    ? "border-brand-600"
                    : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-brand-700">
              {getCategoryName(product.category)}
            </span>
            <AvailabilityDot available={product.available} />
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-cocoa-800 sm:text-5xl">
            {product.name}
          </h1>
          <PastaRibbon />
          <p className="text-base leading-relaxed text-cocoa-600">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-6">
          <span className="txt-num font-serif text-5xl font-bold text-brand-700">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm font-medium text-cocoa-600">
            {product.weight} · {product.servings}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            disabled={!product.available}
            className="disabled:opacity-40"
          />
          <Button
            onClick={handleAdd}
            disabled={!product.available || added}
            size="lg"
            className={cn(
              "flex-1 sm:flex-none sm:min-w-64",
              added && "bg-sage-600 shadow-none hover:bg-sage-700",
            )}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" aria-hidden="true" />
                Agregado al carrito
              </>
            ) : (
              "Agregar al carrito"
            )}
          </Button>
        </div>

        <div className="rounded-[2rem] border border-cocoa-400/20 bg-manteca-100/70 p-6">
          <h2 className="font-serif text-lg font-bold text-cocoa-800">Ingredientes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-full border border-cocoa-400/25 bg-[#fdfaf2] px-3.5 py-1.5 text-xs font-medium text-cocoa-700"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cocoa-800">
              Conservación
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-cocoa-600">
              {product.conservation}
            </p>
          </div>
          <div className="rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cocoa-800">
              Modo de cocción
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-cocoa-600">
              {product.cooking}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}