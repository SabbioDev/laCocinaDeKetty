import { siteConfig } from "@/config/site";
import type { CheckoutData, OrderItem } from "@/types";
import { formatPrice } from "./format";
import { slugify } from "./utils";

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

export function calculateOrderSummary(
  items: OrderItem[],
  deliveryMethod: "retiro" | "envio",
): OrderSummary {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping =
    deliveryMethod === "retiro" ||
    subtotal >= siteConfig.shipping.freeOver ||
    subtotal === 0
      ? 0
      : siteConfig.shipping.fee;
  return { subtotal, shipping, total: subtotal + shipping };
}

function buildWhatsAppMessage(
  items: OrderItem[],
  data: CheckoutData,
  summary: OrderSummary,
): string {
  const lines: string[] = [];

  lines.push(`Hola ${siteConfig.name}, quiero realizar el siguiente pedido:`);
  lines.push("");

  for (const item of items) {
    lines.push(`${item.quantity}x ${item.name}`);
  }

  if (items.length > 0) lines.push("");
  lines.push(`Subtotal: ${formatPrice(summary.subtotal)}`);
  lines.push(`Envío: ${formatPrice(summary.shipping)}`);
  lines.push(`Total: ${formatPrice(summary.total)}`);

  lines.push("");
  lines.push(`Nombre: ${data.customer.firstName} ${data.customer.lastName}`);
  lines.push(`Teléfono: ${data.customer.phone}`);
  lines.push(`Email: ${data.customer.email}`);

  if (data.deliveryMethod === "envio" && data.address) {
    const { street, number, city, postalCode, province } = data.address;
    lines.push(
      `Dirección: ${street} ${number}, ${city} (${province}, CP ${postalCode})`,
    );
    lines.push("Entrega: Envío a domicilio");
  } else {
    lines.push(`Entrega: Retiro por el local (${siteConfig.address})`);
  }

  const paymentLabel =
    siteConfig.paymentMethods.find((m) => m.id === data.paymentMethod)?.label ??
    data.paymentMethod;

  lines.push(`Método de pago: ${paymentLabel}`);

  if (data.notes?.trim()) {
    lines.push("");
    lines.push(`Notas: ${data.notes.trim()}`);
  }

  return lines.join("\n");
}

/** Devuelve la URL de WhatsApp (wa.me) con el mensaje del pedido codificado. */
export function buildWhatsAppOrderUrl(
  items: OrderItem[],
  data: CheckoutData,
  summary: OrderSummary,
): string {
  const message = buildWhatsAppMessage(items, data, summary);
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Devuelve la URL de WhatsApp para consultas rápidas predefinidas. */
export function buildWhatsAppUrl(customMessage?: string): string {
  const message = customMessage ?? siteConfig.whatsapp.message;
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export { slugify };
export { calculateOrderSummary as computeOrderTotals };