import { faqs } from "@/data/site-content";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function FaqSection() {
  const items = faqs.slice(0, 6).map((faq, index) => ({ id: String(index), ...faq }));

  return (
    <section className="bg-manteca-50 py-20 sm:py-28">
      <div className="container-ketty">
        <SectionHeading
          eyebrow="Ayuda"
          title="Preguntas frecuentes"
          subtitle="Las dudas más comunes antes de concretar tu pedido."
          id="faq-titulo"
        />
        <div className="mx-auto max-w-3xl">
          <Accordion items={items} />
          <div className="mt-10 flex justify-center">
            <Button href="/preguntas-frecuentes" variant="outline">
              Ver todas las preguntas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}