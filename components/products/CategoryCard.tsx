import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={category.slug}
      className="group relative block overflow-hidden rounded-3xl shadow-soft"
      aria-label={`Ver ${category.name}`}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-800/85 via-cocoa-800/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
          <h3 className="font-serif text-2xl font-bold text-white">{category.name}</h3>
          <p className="text-sm leading-snug text-manteca-100/85">
            {category.shortDescription}
          </p>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-manteca-200 transition-colors group-hover:text-white">
            Ver más
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}