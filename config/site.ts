/**
 * Configuración central de La Cocina Ketty.
 *
 * Toda la información de la empresa (contacto, horarios, zona de reparto,
 * métodos de pago y envío) se modifica desde este archivo.
 */

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  whatsapp: {
    number: string;
    message: string;
  };
  phone: string;
  instagram: string;
  address: string;
  deliveryZone: string;
  hours: Array<{ days: string; time: string }>;
  paymentMethods: Array<{ id: string; label: string; hint: string }>;
  shipping: {
    fee: number;
    freeOver: number;
  };
}

export const siteConfig: SiteConfig = {
  name: "La Cocina Ketty",
  legalName: "La Cocina Ketty",
  tagline: "Pastas caseras artesanales.",
  description:
    "Pastas caseras artesanales hechas en Argentina. Ravioles, sorrentinos, ñoquis, tallarines y más.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://la-cocina-de-ketty.vercel.app",
  locale: "es_AR",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "542477317387",
    message:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
      "¡Hola La Cocina Ketty! Quiero hacer un pedido.",
  },
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+54 2477 317387",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://www.instagram.com/ketty.cocina",
  address: "Pergamino, Buenos Aires",
  deliveryZone:
    process.env.NEXT_PUBLIC_DELIVERY_ZONE ??
    "Repartimos en Pergamino. Los pedidos se toman con un mínimo de 24 hs de anticipación.",
  hours: [
    { days: "Martes a domingo", time: "9:00 a 19:00" },
    { days: "Lunes", time: "Cerrado" },
  ],
  shipping: {
    fee: 3000,
    freeOver: 60000,
  },
  paymentMethods: [
    {
      id: "transferencia",
      label: "Transferencia bancaria",
      hint: "CBU 0140483203658351357297 · Alias MICA.ROCHA · Titular: Micaela Rocha",
    },
    {
      id: "efectivo",
      label: "Efectivo",
      hint: "Pagás al recibir tu pedido.",
    },
  ],
};
