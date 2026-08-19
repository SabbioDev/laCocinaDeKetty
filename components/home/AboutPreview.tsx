import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
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
    <section className="overflow-hidden bg-manteca-50 py-16 sm:py-24" aria-labelledby="nosotros-titulo">
      <div className="container-ketty grid items-center gap-10 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] shadow-soft lg:max-w-none">
            <Image
              src={brandStory.imageKitchen}
              alt="Cocina artesanal de La Cocina Ketty"
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-card sm:left-6 sm:translate-x-0">
            <span className="font-serif text-2xl font-bold text-brand-700">+10 años</span>
            <span className="block text-xs text-cocoa-500">amasando con amor</span>
          </div>
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Nosotros"
            title="Hecho como en casa"
            subtitle={brandStory.intro}
            className="mb-0"
          />
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-cocoa-500">
            <p>{brandStory.paragraphs[0]}</p>
            <p>{brandStory.paragraphs[1]}</p>
          </div>
          <ul className="flex flex-col gap-2.5">
            {highlights.map((highlight) => (
              <li key={highlight} className="inline-flex items-center gap-2.5 text-sm font-medium text-cocoa-700">
                <CheckCircle2 className="h-5 w-5 text-brand-600" aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
          <Link
            href="/nosotros"
            className="inline-flex w-fit items-center gap-2 font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Conocé nuestra historia
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}