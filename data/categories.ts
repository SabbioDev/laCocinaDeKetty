import type { Category } from "@/types";

export function pexelsImage(id: number, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const categories: Category[] = [
  {
    id: "ravioles",
    name: "Ravioles",
    shortDescription: "Clásicos rellenos caseros, hechos a mano día a día.",
    slug: "/pastas?categoria=ravioles",
    image: pexelsImage(36999963),
  },
  {
    id: "sorrentinos",
    name: "Sorrentinos",
    shortDescription: "Grandes, generosos y siempre bien rellenos.",
    slug: "/pastas?categoria=sorrentinos",
    image: pexelsImage(33396606),
  },
  {
    id: "tallarines",
    name: "Tallarines",
    shortDescription: "Frescos, finos y cortados a mano todos los días.",
    slug: "/pastas?categoria=tallarines",
    image: pexelsImage(9807689),
  },
  {
    id: "noquis",
    name: "Ñoquis",
    shortDescription: "Suaves, esponjosos y listos para acompañar tu mesa.",
    slug: "/pastas?categoria=noquis",
    image: pexelsImage(9807605),
  },
  {
    id: "lasagnas",
    name: "Lasagnas",
    shortDescription: "Capas de pasta, salsa y mucho amor casero.",
    slug: "/pastas?categoria=lasagnas",
    image: pexelsImage(5949895),
  },
  {
    id: "pastas-rellenas",
    name: "Pastas rellenas",
    shortDescription: "Especialidades de la casa para ocasiones especiales.",
    slug: "/pastas?categoria=pastas-rellenas",
    image: pexelsImage(17663511),
  },
  {
    id: "combos",
    name: "Combos",
    shortDescription: "Selecciones pensadas para compartir en familia.",
    slug: "/pastas?categoria=combos",
    image: pexelsImage(31637792),
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getCategoryName(id: string): string {
  return getCategoryById(id)?.name ?? id;
}