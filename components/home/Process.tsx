import { CookingPot, Egg, Hand, Truck } from "lucide-react";
import { processSteps } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Egg, Hand, CookingPot, Truck];

export function Process() {
  return (
    <section className="relative overflow-hidden bg-cocoa-900 py-20 text-manteca-100 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48rem 26rem at 110% 0%, rgb(194 74 48 / 0.14), transparent 60%), radial-gradient(40rem 24rem at -6% 100%, rgb(217 164 65 / 0.08), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="container-ketty relative">
        <SectionHeading
          tone="dark"
          eyebrow="Así elaboramos"
          title="De nuestra cocina a tu mesa"
          subtitle="Cuatro pasos simples que repetimos todos los días para que llegues al sabor de lo casero."
          id="proceso-titulo"
        />
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = icons[index] ?? Egg;
            return (
              <Reveal key={step.title} delay={index * 0.08}>
                <li className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[2rem] border border-manteca-100/10 bg-white/[0.05] p-7 transition-colors duration-300 hover:bg-white/[0.09]">
                  <span
                    className="absolute -right-1 top-3 font-serif text-6xl font-bold italic leading-none text-gold/25 transition-colors duration-300 group-hover:text-gold/40"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-brand-600/15 text-brand-400">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-xl font-bold text-manteca-50">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-manteca-100/70">
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