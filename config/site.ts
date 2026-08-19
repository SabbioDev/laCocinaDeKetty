/**
 * Configuración central de La Cocina Ketty.
 *
 * Toda la información de la empresa puede modificarse desde este archivo.
 * Los valores sensibles (WhatsApp, email, redes) se leen de variables de
 * entorno, con valores por defecto pensados para desarrollo local.
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
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
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
  tagline: "Pastas caseras hechas con amor.",
  description:
    "Pastas caseras artesanales hechas en Argentina. Ravioles, sorrentinos, ñoquis, tallarines y mucho más.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lacocinaketty.com.ar",
  locale: "es_AR",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491100000000",
    message:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
      "¡Hola La Cocina Ketty! Quiero hacer un pedido.",
  },
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hola@lacocinaketty.com.ar",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+54 11 1234 5678",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/lacocinaketty",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/lacocinaketty",
  address: process.env.NEXT_PUBLIC_ADDRESS ?? "Av. Siempre Viva 1234, Buenos Aires",
  deliveryZone:
    process.env.NEXT_PUBLIC_DELIVERY_ZONE ??
    "CABA y zona norte de Buenos Aires (consultá por tu barrio)",
  hours: [
    { days: "Lunes a viernes", time: "9:00 a 19:00" },
    { days: "Sábados", time: "9:00 a 14:00" },
    { days: "Domingos", time: "Cerrado" },
  ],
  paymentMethods: [
    { id: "transferencia", label: "Transferencia bancaria", hint: "Te enviamos los datos y abonás desde tu home banking." },
    { id: "mercadopago", label: "Mercado Pago", hint: "Link de pago para abonar de forma segura." },
    { id: "efectivo", label: "Efectivo", hint: "Pagás al recibir el pedido o al retirarlo por el local." },
  ],
  shipping: {
    fee: 3000,
    freeOver: 60000,
  },
};

export type PaymentMethodConfig = (typeof siteConfig.paymentMethods)[number];