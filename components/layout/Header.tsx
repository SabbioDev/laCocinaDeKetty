"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui";
import { useCart, selectCartCount } from "@/store/cart";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/pastas", label: "Pastas" },
  { href: "/pastas?categoria=combos", label: "Combos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "Ayuda" },
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

const iconButtonClasses =
  "rounded-full p-2.5 text-cocoa-700 transition-colors hover:bg-manteca-200 hover:text-brand-700 focus-visible:outline-none";

export function Header() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const { openCart, openSearch, openMobileMenu } = useUiStore();
  const count = useCart(selectCartCount);

  return (
    <header className="sticky top-0 z-40 pt-3 sm:pt-4">
      <div className="container-ketty">
        <div className="flex h-14 items-center justify-between gap-2 rounded-full border border-cocoa-400/20 bg-[#fdfaf2]/85 px-3 shadow-soft backdrop-blur-xl lg:h-[4.25rem] sm:px-4">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Abrir menú"
              onClick={openMobileMenu}
              className={cn(iconButtonClasses, "lg:hidden")}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <Logo className="-ml-1 lg:hidden" />
            <Logo className="hidden lg:inline-flex" />
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
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none",
                    active
                      ? "bg-brand-600 text-white shadow-[0_10px_20px_-10px_rgb(168_58_36/0.8)]"
                      : "text-cocoa-700 hover:bg-manteca-200 hover:text-brand-700",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/nosotros"
              aria-label="Conocé nuestra historia"
              className={cn(iconButtonClasses, "hidden sm:inline-flex")}
            >
              <span className="font-serif text-lg font-bold leading-none">K</span>
            </Link>
            <button
              type="button"
              aria-label="Buscar productos"
              onClick={openSearch}
              className={iconButtonClasses}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={`Abrir carrito${count > 0 ? `, ${count} productos` : ""}`}
              onClick={openCart}
              className="relative rounded-full p-2.5 text-cocoa-700 transition-colors hover:bg-manteca-200 hover:text-brand-700 focus-visible:outline-none"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 txt-num text-[11px] font-bold text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}