"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useCart, selectCartSubtotal } from "@/store/cart";
import { CartItemRow } from "./CartItemRow";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";

export function CartView() {
  const items = useCart((state) => state.items);
  const subtotal = useCart(selectCartSubtotal);
  const clear = useCart((state) => state.clear);
  const missingForFreeShipping = siteConfig.shipping.freeOver - subtotal;

  if (items.length === 0) {
    return (
      <div className="container-ketty py-16 sm:py-24">
        <EmptyState
          icon={ShoppingBag}
          title="Tu carrito está vacío"
          description="Parece que todavía no elegiste tus pastas. Recorré nuestro catálogo y armá tu pedido."
          actionLabel="Ver nuestras pastas"
          actionHref="/pastas"
        />
      </div>
    );
  }

  return (
    <div className="container-ketty grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-cocoa-800 sm:text-4xl">
            Tu pedido
          </h1>
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-full border border-cocoa-400/40 px-4 py-2 text-sm font-medium text-cocoa-500 transition-colors hover:border-brand-600 hover:text-brand-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Vaciar carrito
          </button>
        </div>

        <ul className="divide-y divide-cocoa-400/15 rounded-3xl border border-cocoa-400/20 bg-white px-5">
          {items.map((item) => (
            <li key={item.productId} className="py-5">
              <CartItemRow productId={item.productId} />
            </li>
          ))}
        </ul>

        <Link
          href="/pastas"
          className="w-fit text-sm font-medium text-brand-700 underline-offset-4 hover:underline"
        >
          ← Seguir comprando
        </Link>
      </div>

      <aside className="h-fit rounded-3xl border border-cocoa-400/20 bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-serif text-xl font-semibold text-cocoa-800">Resumen</h2>
        <dl className="mt-5 flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-cocoa-500">Subtotal</dt>
            <dd className="font-semibold text-cocoa-800">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-cocoa-500">Envío</dt>
            <dd className="font-medium text-cocoa-600">
              {missingForFreeShipping > 0 ? (
                <span className="inline-flex flex-col items-end">
                  <span>Se calcula en el checkout</span>
                  <span className="text-xs text-cocoa-400">
                    Gratis desde {formatPrice(siteConfig.shipping.freeOver)}
                  </span>
                </span>
              ) : (
                <span className="text-emerald-700">Gratis</span>
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-cocoa-400/20 pt-3">
            <dt className="font-semibold text-cocoa-800">Total</dt>
            <dd className="font-serif text-2xl font-bold text-brand-700">
              {formatPrice(subtotal)}
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-2.5">
          <Button href="/checkout" className="w-full text-center">
            Finalizar pedido
          </Button>
          <Button href="/pastas" variant="outline" className="w-full text-center">
            Agregar más pastas
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-cocoa-400">
          Al confirmar, tu pedido se envía por WhatsApp para coordinar envío o retiro.
        </p>
      </aside>
    </div>
  );
}