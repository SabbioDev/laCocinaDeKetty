import { Egg, Heart, Truck, Utensils, Wheat } from "lucide-react";
import { benefits, whyUsIntro } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Wheat, Utensils, Heart, Truck, Egg];

export function Benefits() {
  return (
    <section className="bg-manteca-50 py-16 sm:py-24" aria-labelledby="beneficios-titulo">
      <div className="container-ketty">
        <SectionHeading title={whyUsIntro.title} subtitle={whyUsIntro.subtitle} />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit, index) => {
            const Icon = icons[index] ?? Heart;
            return (
              <Reveal key={benefit.title} delay={index * 0.06}>
                <li className="flex h-full flex-col items-center gap-3 rounded-3xl bg-white p-6 text-center shadow-soft">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600/10 text-brand-700">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-base font-semibold text-cocoa-800">
                    {benefit.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-cocoa-500">
                    {benefit.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}