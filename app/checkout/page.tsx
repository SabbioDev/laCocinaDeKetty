import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Completá tus datos y confirmá tu pedido de pastas caseras por WhatsApp.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}