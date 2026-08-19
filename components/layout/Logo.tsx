import Link from "next/link";
import { Wheat } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="La Cocina Ketty - Inicio"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-300 group-hover:rotate-[-12deg]">
        <Wheat className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-bold text-cocoa-800 sm:text-xl">
          La Cocina <span className="text-brand-600">Ketty</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-cocoa-400">
          Pastas caseras
        </span>
      </span>
    </Link>
  );
}