import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  return (
    <Link
      href={category.slug}
      className="group relative block overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-cocoa-400/15 transition-shadow duration-500 hover:shadow-lift focus-visible:outline-none"
      aria-label={`Ver ${category.name}`}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-cocoa-900/90 via-cocoa-900/25 to-transparent transition-opacity duration-500 group-hover:from-cocoa-900/95"
          aria-hidden="true"
        />
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-cocoa-900/35 px-3 py-1 font-serif text-sm italic text-manteca-100 backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
          <h3 className="font-serif text-3xl font-bold tracking-tight text-white">
            {category.name}
          </h3>
          <p className="max-w-[16rem] text-sm leading-snug text-manteca-100/80">
            {category.shortDescription}
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-manteca-200 transition-colors group-hover:text-white">
            Ver pastas
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}