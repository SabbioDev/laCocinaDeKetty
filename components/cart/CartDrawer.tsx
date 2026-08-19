"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart, selectCartSubtotal } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUiStore();
  const items = useCart((state) => state.items);
  const subtotal = useCart(selectCartSubtotal);
  const missingForFreeShipping = siteConfig.shipping.freeOver - subtotal;

  return (
    <Drawer open={isCartOpen} onClose={closeCart} title="Tu pedido">
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-manteca-200 text-brand-600">
            <ShoppingBag className="h-8 w-8" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-serif text-xl font-semibold text-cocoa-800">
              Tu carrito está vacío
            </h3>
            <p className="mt-1 text-sm text-cocoa-500">
              Agregá alguna de nuestras pastas caseras para empezar.
            </p>
          </div>
          <Button href="/pastas" onClick={closeCart}>
            Ver nuestras pastas
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.productId}>
                  <CartItemRow productId={item.productId} />
                </li>
              ))}
            </ul>

            {missingForFreeShipping > 0 ? (
              <p className="rounded-xl bg-manteca-200/70 px-4 py-3 text-xs text-cocoa-600">
                Te faltan{" "}
                <strong className="text-brand-700">
                  {formatPrice(missingForFreeShipping)}
                </strong>{" "}
                para envío gratis.
              </p>
            ) : (
              <p className="rounded-xl bg-manteca-200/70 px-4 py-3 text-xs font-medium text-emerald-700">
                ¡Tenés envío gratis!
              </p>
            )}
          </div>

          <div className="border-t border-cocoa-400/20 bg-manteca-100 px-5 py-4">
            <div className="mx-auto mb-4 flex max-w-md items-center justify-between">
              <span className="text-sm text-cocoa-600">Subtotal</span>
              <span className="font-serif text-lg font-bold text-cocoa-800">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Button href="/checkout" onClick={closeCart} className="w-full text-center">
                Finalizar pedido
              </Button>
              <Button
                href="/carrito"
                variant="outline"
                onClick={closeCart}
                className="w-full text-center"
              >
                Ver carrito completo
              </Button>
            </div>
            <Link
              href="/pastas"
              onClick={closeCart}
              className="mt-3 block text-center text-xs font-medium text-cocoa-500 underline-offset-4 hover:text-brand-700 hover:underline"
            >
              Seguir comprando
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}