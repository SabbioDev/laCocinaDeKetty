import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { brandStory } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlights = [
  "Elaboradas en el día",
  "Sin conservantes",
  "Receta de familia",
];

// El texto de esta sección es contenido de demostración editable.
export function AboutPreview() {
  return (
    <section className="overflow-hidden bg-manteca-50 py-20 sm:py-28">
      <div className="container-ketty grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[3rem] shadow-lift ring-1 ring-cocoa-400/20">
              <Image
                src={brandStory.imageKitchen}
                alt="Cocina artesanal de La Cocina Ketty"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 right-4 flex items-center gap-3 rounded-2xl border border-cocoa-400/20 bg-[#fdfaf2] px-6 py-4 shadow-card sm:right-10">
              <span className="font-serif text-3xl font-bold italic text-brand-700">
                +10 años
              </span>
              <span className="text-xs leading-tight text-cocoa-600">
                amasando
                <br />
                con amor
              </span>
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col gap-7 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Nosotros"
            title="Hecho como en casa"
            subtitle={brandStory.intro}
            id="nosotros-titulo"
            className="mb-0"
          />
          <div className="flex max-w-xl flex-col gap-4 text-base leading-relaxed text-cocoa-600">
            <p>{brandStory.paragraphs[0]}</p>
            <p>{brandStory.paragraphs[1]}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="inline-flex items-center gap-3 text-sm font-semibold text-cocoa-700"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-100 text-sage-700">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>
          <Link
            href="/nosotros"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Conocé nuestra historia
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-600/40 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}