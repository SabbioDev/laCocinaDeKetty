import type { Metadata } from "next";
import { MessageCircle, Store, Truck } from "lucide-react";
import { faqs } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvé tus dudas sobre envíos, conservación de las pastas, medios de pago y cómo hacer tu pedido en La Cocina Ketty.",
};

export default function PreguntasFrecuentesPage() {
  const items = faqs.map((faq, index) => ({ id: String(index), ...faq }));

  return (
    <>
      <PageHero
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        subtitle="Las dudas más comunes sobre pedidos, envíos y conservación de nuestras pastas."
      />

      <section className="bg-manteca-50 py-16 sm:py-24">
        <div className="container-ketty mx-auto max-w-3xl">
          <Accordion items={items} />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-soft">
              <Truck className="h-8 w-8 text-brand-600" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-cocoa-800">
                ¿Dudas con tu envío?
              </h2>
              <p className="text-sm leading-relaxed text-cocoa-500">
                {siteConfig.deliveryZone}. Consultanos por tu barrio.
              </p>
              <Button href="/checkout" variant="outline" size="sm" className="w-fit">
                Armar pedido
              </Button>
            </div>
            <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-soft">
              <MessageCircle className="h-8 w-8 text-brand-600" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-cocoa-800">
                ¿Otra consulta?
              </h2>
              <p className="text-sm leading-relaxed text-cocoa-500">
                Escribinos por WhatsApp y te respondemos a la brevedad.
              </p>
              <Button
                href={buildWhatsAppUrl()}
                variant="outline"
                size="sm"
                className="w-fit"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Escribinos
              </Button>
            </div>
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-sm text-cocoa-500">
            <Store className="h-4 w-4" aria-hidden="true" />
            Local: {siteConfig.address}
          </p>
        </div>
      </section>
    </>
  );
}