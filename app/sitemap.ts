import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${url}/pastas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${url}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${url}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${url}/preguntas-frecuentes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${url}/carrito`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${url}/checkout`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${url}${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${url}/productos/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}