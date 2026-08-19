import Link from "next/link";
import { Camera, MapPin, MessageCircle, Phone, ThumbsUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navColumn = [
  { href: "/", label: "Inicio" },
  { href: "/pastas", label: "Pastas" },
  { href: "/pastas?categoria=combos", label: "Combos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const helpColumn = [
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Envíos" },
  { href: "/contacto", label: "Métodos de pago" },
];

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <footer className="mt-auto bg-cocoa-800 text-manteca-100" role="contentinfo">
      <div className="container-ketty grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <p className="font-serif text-2xl font-bold">
            La Cocina <span className="text-manteca-200">Ketty</span>
          </p>
          <p className="text-sm text-manteca-100/70">Pastas caseras hechas con amor.</p>
          <div className="flex flex-col gap-2 text-sm text-manteca-100/70">
            <span className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-manteca-200" aria-hidden="true" />
              {siteConfig.address}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-manteca-200" aria-hidden="true" />
              {siteConfig.phone}
            </span>
          </div>
        </div>

        <nav aria-label="Navegación del footer">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-manteca-200">
            Navegación
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {navColumn.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-manteca-100/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Ayuda">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-manteca-200">
            Ayuda
          </h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {helpColumn.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-manteca-100/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-manteca-200">
            Seguinos
          </h2>
          <div className="flex flex-col gap-2.5 text-sm">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-manteca-100/80 transition-colors hover:text-white"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              Instagram
            </a>
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-manteca-100/80 transition-colors hover:text-white"
            >
              <ThumbsUp className="h-4 w-4" aria-hidden="true" />
              Facebook
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-manteca-100/80 transition-colors hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
          <p className="mt-6 text-xs text-manteca-100/50">
            Los testimonios y la historia de marca son contenido de demostración.
          </p>
        </div>
      </div>

      <div className="border-t border-manteca-100/10">
        <div className="container-ketty flex flex-col items-center justify-between gap-2 py-6 text-xs text-manteca-100/50 sm:flex-row">
          <p>© 2026 {siteConfig.legalName}. Todos los derechos reservados.</p>
          <p>Hecho en Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}