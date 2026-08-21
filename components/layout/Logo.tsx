import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="La Cocina Ketty - Inicio"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[#fbf4e6] shadow-[0_10px_20px_-10px_rgb(168_58_36/0.8)] transition-transform duration-500 group-hover:-rotate-6">
        <span className="font-serif text-xl font-bold leading-none">K</span>
        <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[#fbf4e6] bg-gold" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-bold tracking-tight text-cocoa-800">
          La Cocina <span className="italic text-brand-600">Ketty</span>
        </span>
        <span className="eyebrow mt-1 text-cocoa-600">Pastas caseras</span>
      </span>
    </Link>
  );
}