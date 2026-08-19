import Image from "next/image";
import { Egg, Hand, CookingPot, Truck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { brandStory, processSteps, benefits } from "@/data/site-content";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé la historia de La Cocina Ketty: pastas caseras artesanales hechas en el día, con ingredientes frescos y una receta de familia.",
};

const processIcons = [Egg, Hand, CookingPot, Truck];
const benefitIcons = [CheckCircle2];

const highlights = [
  "Elaboradas en el día",
  "Sin conservantes",
  "Ingredientes frescos",
  "Receta de familia",
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow={brandStory.eyebrow}
        title={brandStory.title}
        subtitle={brandStory.intro}
      />

      <section className="bg-manteca-50 py-16 sm:py-24">
        <div className="container-ketty grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-cocoa-600">
              <p>{brandStory.paragraphs[0]}</p>
              <p>{brandStory.paragraphs[1]}</p>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-manteca-100 px-4 py-3 text-sm font-medium text-cocoa-700"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button href="/pastas">
                Ver nuestras pastas
              </Button>
              <Button href={buildWhatsAppUrl()} variant="outline">
                Escribinos
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <Image
                src={brandStory.imageKitchen}
                alt="Cocina artesanal de La Cocina Ketty"
                width={600}
                height={800}
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={brandStory.imageIngredients}
                  alt="Ingredientes frescos usados para elaborar las pastas"
                  width={600}
                  height={600}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="rounded-3xl bg-brand-600 p-6 text-white shadow-soft">
                <span className="font-serif text-3xl font-bold">+10 años</span>
                <span className="mt-1 block text-sm text-white/80">
                  amasando con amor, de domingo en domingo.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-manteca-100 py-16 sm:py-24">
        <div className="container-ketty">
          <SectionHeading
            eyebrow="Así elaboramos"
            title="De nuestra cocina a tu mesa"
            subtitle="Repetimos estos pasos todos los días para que nuestras pastas lleguen frescas a tu mesa."
          />
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index] ?? Egg;
              return (
                <Reveal key={step.title} delay={index * 0.08}>
                  <li className="relative flex h-full flex-col gap-4 rounded-3xl border border-cocoa-400/20 bg-white p-6">
                    <span
                      className="absolute right-5 top-4 font-serif text-5xl font-bold text-manteca-300"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-manteca-200 p-3 text-brand-700">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-cocoa-800">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-cocoa-500">{step.description}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-manteca-50 py-16 sm:py-24">
        <div className="container-ketty">
          <SectionHeading
            eyebrow="Nuestro compromiso"
            title="Lo que nos hace La Cocina Ketty"
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[0] ?? CheckCircle2;
              return (
                <Reveal key={benefit.title} delay={index * 0.06}>
                  <li className="flex h-full flex-col gap-3 rounded-3xl bg-white p-6 shadow-soft">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-cocoa-800">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-cocoa-500">{benefit.description}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-cocoa-800 py-16 text-center text-manteca-100">
        <div className="container-ketty mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="text-balance font-serif text-3xl font-bold sm:text-4xl">
            ¿Probanos?
          </h2>
          <p className="text-manteca-100/70">
            Hacé tu pedido por WhatsApp o visitanos en {siteConfig.address}.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/pastas" variant="white">
              Ver nuestras pastas
            </Button>
            <Button
              href={buildWhatsAppUrl()}
              variant="ghost"
              className="border border-manteca-100/40 text-manteca-100 hover:bg-manteca-100/10 hover:text-white"
            >
              Escribinos
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}