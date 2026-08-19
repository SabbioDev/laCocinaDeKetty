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
import { Badge, AvailabilityDot } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-manteca-200 shadow-soft">
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
            <Badge className="absolute left-5 top-5">{product.badge}</Badge>
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
                  "relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
                  index === activeImage
                    ? "border-brand-600"
                    : "border-transparent hover:border-manteca-300",
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

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-cocoa-400">
              {getCategoryName(product.category)}
            </span>
            <AvailabilityDot available={product.available} />
          </div>
          <h1 className="font-serif text-3xl font-bold leading-tight text-cocoa-800 sm:text-4xl">
            {product.name}
          </h1>
          <p className="text-base leading-relaxed text-cocoa-500">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-serif text-4xl font-bold text-brand-700">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-cocoa-500">
              {product.weight} · {product.servings}
            </span>
          </div>
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
            className={cn("flex-1 sm:flex-none sm:min-w-64", added && "bg-emerald-600 hover:bg-emerald-600")}
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

        <div className="rounded-2xl border border-cocoa-400/20 bg-manteca-100/70 p-5">
          <h2 className="font-serif text-lg font-semibold text-cocoa-800">
            Ingredientes
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-cocoa-600"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-cocoa-400/20 bg-white p-4">
            <h3 className="text-sm font-semibold text-cocoa-800">Conservación</h3>
            <p className="mt-1 text-sm leading-relaxed text-cocoa-500">
              {product.conservation}
            </p>
          </div>
          <div className="rounded-2xl border border-cocoa-400/20 bg-white p-4">
            <h3 className="text-sm font-semibold text-cocoa-800">Modo de cocción</h3>
            <p className="mt-1 text-sm leading-relaxed text-cocoa-500">
              {product.cooking}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}