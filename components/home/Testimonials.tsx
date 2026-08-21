import { Star } from "lucide-react";
import { testimonials } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="bg-manteca-100 py-20 sm:py-28">
      <div className="container-ketty">
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen nuestros clientes"
          subtitle="Contenido de demostración: reemplazalo pronto por testimonios reales."
          id="testimonios-titulo"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.06}>
              <figure className="relative flex h-full flex-col gap-4 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-7 shadow-sm transition-shadow duration-300 hover:shadow-card">
                <span className="font-serif text-6xl leading-none text-brand-600/20" aria-hidden="true">
                  “
                </span>
                <blockquote className="flex-1 font-serif text-base italic leading-relaxed text-cocoa-700">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="flex flex-col gap-1.5 border-t border-cocoa-400/20 pt-4">
                  <div className="flex gap-1" aria-label={`${testimonial.rating} de 5 estrellas`}>
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-gold text-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-cocoa-800">{testimonial.author}</span>
                  <span className="text-xs text-cocoa-600">{testimonial.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}