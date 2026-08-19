import { CookingPot, Egg, Hand, Truck } from "lucide-react";
import { processSteps } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Egg, Hand, CookingPot, Truck];

export function Process() {
  return (
    <section className="bg-manteca-100 py-16 sm:py-24" aria-labelledby="proceso-titulo">
      <div className="container-ketty">
        <SectionHeading
          eyebrow="Así elaboramos"
          title="De nuestra cocina a tu mesa"
          subtitle="Cuatro pasos simples que repetimos todos los días para que llegues al sabor de lo casero."
        />
        <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = icons[index] ?? Egg;
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
                  <h3 className="font-serif text-xl font-semibold text-cocoa-800">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-cocoa-500">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}