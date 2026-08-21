import { Camera, Clock, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PastaRibbon } from "@/components/ui/PastaRibbon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactPreview() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section className="relative overflow-hidden bg-cocoa-900 py-20 text-manteca-100 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46rem 26rem at 0% 0%, rgb(194 74 48 / 0.12), transparent 58%), radial-gradient(40rem 24rem at 105% 100%, rgb(217 164 65 / 0.1), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <Container>
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-8">
            <SectionHeading
              tone="dark"
              align="left"
              eyebrow="Contacto"
              title="Hablá con nosotros"
              subtitle="Escribinos por WhatsApp, seguinos en Instagram o pasate por el local. Respondemos rápido."
              id="contacto-titulo"
              className="mb-0"
            />
            <div className="grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600/15 text-brand-400">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm">
                  <strong className="block font-serif text-base text-manteca-50">Dirección</strong>
                  <span className="text-manteca-100/70">{siteConfig.address}</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600/15 text-brand-400">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="flex flex-col gap-1 text-sm">
                  <strong className="font-serif text-base text-manteca-50">Horarios</strong>
                  {siteConfig.hours.map((hour) => (
                    <span key={hour.days} className="text-manteca-100/70">
                      {hour.days}: {hour.time}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600/15 text-brand-400">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-sm">
                  <strong className="block font-serif text-base text-manteca-50">WhatsApp</strong>
                  <span className="text-manteca-100/70">{siteConfig.phone}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-[2.5rem] border border-manteca-100/15 bg-white/[0.06] p-9 backdrop-blur-sm">
            <PastaRibbon tone="dark" />
            <p className="font-serif text-2xl font-bold leading-snug text-manteca-50">
              ¿Listo para pedir
              <br />
              tus pastas?
            </p>
            <p className="text-sm leading-relaxed text-manteca-100/70">
              Armá tu carrito y confirmá tu pedido en unos minutos, o escribinos
              directamente por WhatsApp.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/pastas" variant="white">
                Ver nuestras pastas
              </Button>
              <Button
                href={whatsappUrl}
                variant="dark"
                className="bg-wa text-white shadow-[0_14px_28px_-14px_rgb(30_168_91/0.8)] hover:bg-wa-dark"
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