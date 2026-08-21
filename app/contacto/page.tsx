import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Camera, ThumbsUp, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactate con La Cocina Ketty por WhatsApp, email o visitando el local. Respondemos rápido y coordinamos tu pedido.",
};

const linkCardClasses =
  "group flex items-start gap-4 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600 hover:shadow-card";

export default function ContactoPage() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablá con nosotros"
        subtitle="Escribinos por WhatsApp, siempre respondemos rápido. También podés venir a saludarnos al local."
      />

      <section className="bg-manteca-50 py-16 sm:py-24">
        <div className="container-ketty grid grid-cols-1 gap-10 lg:grid-cols-[400px_1fr]">
          <div className="flex flex-col gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkCardClasses}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-wa/10 text-wa">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-cocoa-800">WhatsApp</span>
                <span className="block text-sm text-cocoa-600">{siteConfig.phone}</span>
                <span className="mt-1 block text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Escribinos →
                </span>
              </span>
            </a>

            <a href={`mailto:${siteConfig.email}`} className={linkCardClasses}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
                <Mail className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-cocoa-800">Email</span>
                <span className="block text-sm text-cocoa-600">{siteConfig.email}</span>
              </span>
            </a>

            <div className={linkCardClasses}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-manteca-200 text-brand-700">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <span className="block font-semibold text-cocoa-800">Dirección</span>
                <span className="block text-sm text-cocoa-600">{siteConfig.address}</span>
                <span className="mt-1 flex items-center gap-1.5 text-xs text-cocoa-600">
                  <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                  {siteConfig.deliveryZone}
                </span>
              </div>
            </div>

            <div className={linkCardClasses}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-manteca-200 text-brand-700">
                <Clock className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <span className="block font-semibold text-cocoa-800">Horarios</span>
                <span className="mt-1 flex flex-col gap-0.5 text-sm text-cocoa-600">
                  {siteConfig.hours.map((hour) => (
                    <span key={hour.days}>
                      {hour.days}: {hour.time}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cocoa-400/30 bg-[#fdfaf2] p-4 text-sm font-medium text-cocoa-700 transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                <Camera className="h-5 w-5" aria-hidden="true" /> Instagram
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cocoa-400/30 bg-[#fdfaf2] p-4 text-sm font-medium text-cocoa-700 transition-colors hover:border-brand-600 hover:text-brand-700"
              >
                <ThumbsUp className="h-5 w-5" aria-hidden="true" /> Facebook
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-6 shadow-card sm:p-9">
            <h2 className="font-serif text-3xl font-bold text-cocoa-800 sm:text-4xl">
              Enviá tu consulta
            </h2>
            <p className="mt-2 text-sm text-cocoa-600">
              Completá el formulario y tu consulta llega directo a nuestro
              WhatsApp.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}