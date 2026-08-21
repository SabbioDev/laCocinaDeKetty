import { Egg, Heart, Truck, Utensils, Wheat } from "lucide-react";
import { benefits, whyUsIntro } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Wheat, Utensils, Heart, Truck, Egg];

export function Benefits() {
  return (
    <section className="bg-manteca-50 py-20 sm:py-28">
      <div className="container-ketty">
        <SectionHeading title={whyUsIntro.title} subtitle={whyUsIntro.subtitle} id="beneficios-titulo" />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {benefits.map((benefit, index) => {
            const Icon = icons[index] ?? Heart;
            return (
              <Reveal key={benefit.title} delay={index * 0.06}>
                <li className="group flex h-full flex-col items-center gap-4 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-lg font-bold text-cocoa-800">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cocoa-600">
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