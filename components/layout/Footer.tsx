import Link from "next/link";
import { Camera, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { PastaRibbon } from "@/components/ui/PastaRibbon";

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

const socialLinks = [
  { href: siteConfig.instagram, label: "Instagram", icon: Camera },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-manteca-200">{title}</h2>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: "true" | undefined }>;
}) {
  const cls =
    "inline-flex items-center gap-2 text-sm text-manteca-100/75 transition-colors hover:text-white hover:underline decoration-1 underline-offset-4";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      {children}
    </Link>
  );
}

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <footer className="relative mt-auto overflow-hidden bg-cocoa-900 text-manteca-100" role="contentinfo">
      <div
        className="pointer-events-none absolute -right-16 -top-24 select-none font-serif text-[26rem] font-bold italic leading-none text-manteca-100/[0.04]"
        aria-hidden="true"
      >
        K
      </div>
      <div className="container-ketty relative grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <p className="font-serif text-3xl font-bold tracking-tight text-manteca-50">
            La Cocina <span className="italic text-brand-500">Ketty</span>
          </p>
          <PastaRibbon tone="dark" />
          <p className="max-w-xs text-sm leading-relaxed text-manteca-100/70">
            Pastas caseras hechas a mano, en el día y con los mejores ingredientes.
            El sabor de lo casero, directo a tu mesa.
          </p>
          <div className="flex flex-col gap-2.5 text-sm text-manteca-100/75">
            <span className="inline-flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              {siteConfig.address}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              {siteConfig.phone}
            </span>
            <span className="inline-flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
              <span className="flex flex-col gap-0.5">
                {siteConfig.hours.map((hour) => (
                  <span key={hour.days}>
                    {hour.days}: <span className="text-manteca-100/60">{hour.time}</span>
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>

        <FooterColumn title="Navegación">
          <ul className="flex flex-col gap-2.5">
            {navColumn.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Ayuda">
          <ul className="flex flex-col gap-2.5">
            {helpColumn.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Seguinos">
          <ul className="flex flex-col gap-2.5">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <FooterLink href={link.href} external icon={link.icon}>
                  {link.label}
                </FooterLink>
              </li>
            ))}
            <li>
              <FooterLink href={whatsappUrl} external icon={MessageCircle}>
                WhatsApp
              </FooterLink>
            </li>
          </ul>
          <p className="mt-8 text-xs text-manteca-100/45">
            Contenido de demostración: pendiente reemplazo por historia y
            testimonios reales.
          </p>
        </FooterColumn>
      </div>

      <div className="relative border-t border-manteca-100/10">
        <div className="container-ketty flex flex-col items-center justify-between gap-2 py-6 text-xs text-manteca-100/50 sm:flex-row">
          <p>© 2026 {siteConfig.legalName}. Todos los derechos reservados.</p>
          <p>Elaborado a mano en Argentina</p>
        </div>
      </div>
    </footer>
  );
}