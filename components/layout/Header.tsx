"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui";
import { useCart, selectCartCount } from "@/store/cart";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/pastas", label: "Pastas" },
  { href: "/pastas?categoria=combos", label: "Combos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

function isActive(pathname: string, search: string, linkHref: string): boolean {
  const [path, query] = linkHref.split("?");
  if (pathname === path) {
    if (!query) return true;
    const param = new URLSearchParams(query);
    const searchParams = new URLSearchParams(search);
    return Array.from(param.entries()).every(
      ([key, value]) => searchParams.get(key) === value,
    );
  }
  return path !== "/" && pathname.startsWith(path) && path === "/pastas";
}

export function Header() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const { openCart, openSearch, openMobileMenu } = useUiStore();
  const count = useCart(selectCartCount);

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa-400/20 bg-manteca-100/90 backdrop-blur-md">
      <div className="container-ketty flex h-16 items-center justify-between gap-3 lg:h-20">
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={openMobileMenu}
            className="rounded-full p-2 text-cocoa-700 transition-colors hover:bg-manteca-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="hidden lg:block">
          <Logo />
        </div>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, search, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
                  active
                    ? "bg-manteca-200 text-brand-700"
                    : "text-cocoa-600 hover:text-brand-700",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Buscar productos"
            onClick={openSearch}
            className="hidden rounded-full p-2 text-cocoa-700 transition-colors hover:bg-manteca-200 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:inline-flex"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <Link
            href="/contacto"
            aria-label="Contacto"
            className="hidden rounded-full p-2 text-cocoa-700 transition-colors hover:bg-manteca-200 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:inline-flex"
          >
            <User className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-label={`Abrir carrito${count > 0 ? `, ${count} productos` : ""}`}
            onClick={openCart}
            className="relative rounded-full p-2 text-cocoa-700 transition-colors hover:bg-manteca-200 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {count > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}