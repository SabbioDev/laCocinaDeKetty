import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="La Cocina Ketty - Inicio"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fbf4e6] shadow-[0_12px_24px_-12px_rgb(168_58_36/0.55)] ring-1 ring-gold/60 transition-transform duration-500 group-hover:-rotate-6">
        <Image
          src="/images/logoKetty.png"
          alt="La Cocina Ketty"
          width={48}
          height={48}
          sizes="48px"
          className="h-full w-full object-cover"
        />
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