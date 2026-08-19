"use client";

import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { useUiStore } from "@/store/ui";
import { Drawer } from "@/components/ui/Drawer";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/pastas", label: "Pastas" },
  { href: "/pastas?categoria=combos", label: "Combos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUiStore();
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
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMobileMenu}
            className={cn(
              "rounded-2xl px-4 py-3 font-serif text-lg font-semibold text-cocoa-800 transition-colors hover:bg-manteca-200 hover:text-brand-700",
            )}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-4 flex items-center justify-between border-t border-cocoa-400/20 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="inline-flex items-center gap-2 text-sm font-medium text-cocoa-600 hover:text-brand-700"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="inline-flex items-center gap-2 text-sm font-medium text-cocoa-600 hover:text-brand-700"
          >
            <Camera className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Instagram
          </a>
        </div>
      </nav>
    </Drawer>
  );
}