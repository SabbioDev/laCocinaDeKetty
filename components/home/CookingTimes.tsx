import { CookingPot, Flame, Timer } from "lucide-react";
import { cookingTimes, cookingGuide } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Timer, Flame, CookingPot, Timer, Flame, CookingPot];

export function CookingTimes() {
  return (
    <section className="bg-[#fffdf6] py-20 sm:py-28">
      <div className="container-ketty">
        <SectionHeading
          eyebrow={cookingGuide.eyebrow}
          title={cookingGuide.title}
          subtitle={cookingGuide.subtitle}
          id="tiempos-titulo"
        />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cookingTimes.map((item, index) => {
            const Icon = icons[index % icons.length] ?? Timer;
            return (
              <Reveal key={item.id} delay={index * 0.06}>
                <li className="flex h-full flex-col gap-4 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-700">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-sm font-bold text-white">
                      {item.minutes}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <h3 className="font-serif text-lg font-bold leading-snug text-cocoa-800">
                      {item.product}
                    </h3>
                    <p className="text-sm leading-relaxed text-cocoa-600">{item.tip}</p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
