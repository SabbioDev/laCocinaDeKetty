import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá y confirmá tu pedido de pastas caseras en La Cocina Ketty.",
};

export default function CarritoPage() {
  return <CartView />;
}