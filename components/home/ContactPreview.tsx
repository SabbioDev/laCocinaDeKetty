import { Camera, Clock, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactPreview() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section
      className="relative overflow-hidden bg-cocoa-800 py-16 text-manteca-100 sm:py-20"
      aria-labelledby="contacto-titulo"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="Contacto"
              title="Hablá con nosotros"
              subtitle="Escribinos por WhatsApp, seguinos en Instagram o pasate por el local. Respondemos rápido."
              className="mb-0 [&_h2]:text-manteca-100 [&_p]:text-manteca-100/70 [&_span]:text-manteca-200"
            />
            <div className="flex flex-col gap-4 text-sm">
              <p className="inline-flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-manteca-200" aria-hidden="true" />
                <span>
                  <strong className="block font-medium text-white">Dirección</strong>
                  {siteConfig.address}
                </span>
              </p>
              <p className="inline-flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-manteca-200" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <strong className="font-medium text-white">Horarios</strong>
                  {siteConfig.hours.map((hour) => (
                    <span key={hour.days} className="text-manteca-100/70">
                      {hour.days}: {hour.time}
                    </span>
                  ))}
                </span>
              </p>
              <p className="inline-flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-manteca-200" aria-hidden="true" />
                <span>
                  <strong className="block font-medium text-white">WhatsApp</strong>
                  {siteConfig.phone}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-3xl bg-manteca-100/10 p-8 backdrop-blur-sm lg:items-start">
            <p className="font-serif text-xl font-semibold text-white">
              ¿Listo para pedir tus pastas?
            </p>
            <p className="text-sm text-manteca-100/70">
              Armá tu carrito y confirmá tu pedido en unos minutos, o escribinos
              directamente.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/pastas" variant="white">
                Ver nuestras pastas
              </Button>
              <Button
                href={whatsappUrl}
                variant="ghost"
                className="border border-manteca-100/40 text-manteca-100 hover:bg-manteca-100/10 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Escribinos
              </Button>
            </div>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-manteca-100/70 transition-colors hover:text-white"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Seguinos en Instagram
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}