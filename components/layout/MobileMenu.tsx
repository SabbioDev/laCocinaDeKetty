"use client";

import Link from "next/link";
import { ArrowRight, Camera, MessageCircle, Search } from "lucide-react";
import { useUiStore } from "@/store/ui";
import { Drawer } from "@/components/ui/Drawer";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/pastas", label: "Pastas" },
  { href: "/pastas?categoria=combos", label: "Combos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUiStore();
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <Drawer
      open={isMobileMenuOpen}
      onClose={closeMobileMenu}
      title="Menú"
      position="bottom"
    >
      <nav
        aria-label="Navegación móvil"
        className="flex flex-col gap-1 overflow-y-auto px-4 py-4"
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMobileMenu}
            className="group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-colors hover:bg-manteca-200"
          >
            <span className="flex items-center gap-3">
              <span className="font-serif text-sm italic text-brand-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-xl font-semibold text-cocoa-800">
                {link.label}
              </span>
            </span>
            <ArrowRight
              className="h-5 w-5 text-cocoa-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-600"
              aria-hidden="true"
            />
          </Link>
        ))}

        <button
          type="button"
          onClick={() => {
            closeMobileMenu();
            openSearch();
          }}
          className="mt-2 flex items-center gap-3 rounded-2xl border border-cocoa-400/25 bg-[#fdfaf2] px-4 py-3.5 text-left transition-colors hover:bg-manteca-200"
        >
          <Search className="h-5 w-5 text-brand-600" aria-hidden="true" />
          <span className="text-sm font-semibold text-cocoa-700">
            Buscar productos
          </span>
        </button>

        <div className="mt-4 flex items-center justify-between border-t border-cocoa-400/20 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="inline-flex items-center gap-2 text-sm font-medium text-cocoa-700 hover:text-brand-700"
          >
            <MessageCircle className="h-4 w-4 text-wa" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="inline-flex items-center gap-2 text-sm font-medium text-cocoa-700 hover:text-brand-700"
          >
            <Camera className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Instagram
          </a>
        </div>
      </nav>
    </Drawer>
  );
}