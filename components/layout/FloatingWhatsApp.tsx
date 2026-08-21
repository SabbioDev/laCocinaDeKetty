import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp con La Cocina Ketty"
      className="fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2.5 rounded-full bg-wa py-2 pl-3.5 pr-4 text-white shadow-[0_16px_30px_-12px_rgb(30_168_91/0.7)] transition-all duration-300 hover:scale-[1.03] hover:bg-wa-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wa focus-visible:ring-offset-2"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold">WhatsApp</span>
    </a>
  );
}