import { categories } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/products/CategoryCard";
import { Reveal } from "@/components/ui/Reveal";

export function Categories() {
  return (
    <section className="bg-manteca-50 py-16 sm:py-24" aria-labelledby="categorias-titulo">
      <div className="container-ketty">
        <SectionHeading
          eyebrow="Nuestras pastas"
          title="Elegí tus favoritas"
          subtitle="Cada variedad se elabora a mano, en el día y con los mejores ingredientes."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}