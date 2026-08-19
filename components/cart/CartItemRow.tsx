"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { cn } from "@/lib/utils";

export function CartItemRow({ productId }: { productId: string }) {
  const item = useCart((state) =>
    state.items.find((i) => i.productId === productId),
  );
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);

  if (!item) return null;

  return (
    <div className="flex gap-4">
      <Link
        href={`/productos/${item.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/productos/${item.slug}`}
            className="font-serif text-sm font-semibold text-cocoa-800 hover:text-brand-700"
          >
            {item.name}
          </Link>
          <button
            type="button"
            aria-label={`Eliminar ${item.name} del carrito`}
            onClick={() => removeItem(item.productId)}
            className="rounded-full p-1.5 text-cocoa-400 transition-colors hover:bg-manteca-200 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="text-xs text-cocoa-400">
          {formatPrice(item.price)} / unidad
        </p>
        <div className="mt-2 flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(value) => updateQuantity(item.productId, value)}
            className="scale-90 origin-left"
          />
          <span className={cn("text-sm font-bold", !item.available && "text-cocoa-400")}>
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}