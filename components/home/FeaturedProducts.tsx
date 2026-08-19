import { getFeaturedProducts } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="bg-manteca-100 py-16 sm:py-24" aria-labelledby="favoritos-titulo">
      <div className="container-ketty">
        <SectionHeading
          eyebrow="Los favoritos"
          title="Los favoritos de la casa"
          subtitle="Las pastas que más eligen nuestros clientes, listas para tu mesa."
        />
        <Reveal>
          <ProductGrid products={products} />
        </Reveal>
        <div className="mt-12 flex justify-center">
          <Button href="/pastas" size="lg" variant="primary">
            Ver todas las pastas
          </Button>
        </div>
      </div>
    </section>
  );
}