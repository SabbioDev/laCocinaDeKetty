import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="bg-manteca-100 py-16 sm:py-24" aria-labelledby="testimonios-titulo">
      <div className="container-ketty">
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen nuestros clientes"
          subtitle="Contenido de demostración: reemplazalo pronto por testimonios reales."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.06}>
              <figure className="relative flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft">
                <Quote className="h-8 w-8 text-manteca-300" aria-hidden="true" />
                <blockquote className="flex-1 text-sm leading-relaxed text-cocoa-600">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="flex flex-col gap-1">
                  <div className="flex gap-0.5" aria-label={`${testimonial.rating} de 5 estrellas`}>
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-cocoa-800">{testimonial.author}</span>
                  <span className="text-xs text-cocoa-400">{testimonial.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}