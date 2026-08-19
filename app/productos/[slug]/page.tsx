import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { getCategoryName } from "@/data/categories";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";

interface ProductoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | La Cocina Ketty",
      description: "No encontramos el producto que buscás.",
    };
  }

  const imageUrl = `${siteConfig.url}${product.images[0]}`;

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/productos/${product.slug}` },
    openGraph: {
      title: `${product.name} | La Cocina Ketty`,
      description: product.shortDescription,
      images: [{ url: imageUrl, alt: product.name }],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | La Cocina Ketty`,
      description: product.shortDescription,
      images: [imageUrl],
    },
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);

  const infoItems = [
    {
      title: "Elaboración artesanal",
      description: "Cada pieza se hace a mano, en el día y en pequeñas tandas.",
    },
    {
      title: "Producto fresco",
      description: "Sin conservantes ni precocciones: llegás directo del fuego.",
    },
    {
      title: "Ingredientes seleccionados",
      description: "Harina 0000, huevos frescos y verduras de estación.",
    },
    {
      title: "Conservación y cocción",
      description: "Instrucciones claras en cada envase para el mejor resultado.",
    },
  ];

  return (
    <div className="bg-manteca-50">
      <div className="container-ketty py-8">
        <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-cocoa-500">
          <Link href="/" className="hover:text-brand-700">
            Inicio
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link href="/pastas" className="hover:text-brand-700">
            Pastas
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link
            href={`/pastas?categoria=${product.category}`}
            className="hover:text-brand-700"
          >
            {getCategoryName(product.category)}
          </Link>
        </nav>

        <ProductDetail product={product} />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoItems.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-cocoa-400/20 bg-white p-5"
            >
              <h2 className="font-serif text-base font-semibold text-cocoa-800">
                {item.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-cocoa-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-manteca-200/60 p-6 text-center">
          <p className="font-serif text-xl font-semibold text-cocoa-800">
            {product.name} · {product.weight}
          </p>
          <p className="mt-1 text-sm text-cocoa-500">
            {formatPrice(product.price)} por {product.servings}
          </p>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="bg-manteca-100 py-16" aria-labelledby="relacionados-titulo">
          <div className="container-ketty">
            <SectionHeading
              eyebrow="Para vos"
              title="También te puede gustar"
              className="mb-8"
            />
            <Reveal>
              <ProductGrid products={related} />
            </Reveal>
          </div>
        </section>
      ) : null}
    </div>
  );
}