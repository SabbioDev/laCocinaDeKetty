import { Soup } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-ketty py-16 sm:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-cocoa-400/20 bg-white p-10 text-center shadow-soft">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-manteca-200 text-brand-600">
          <Soup className="h-8 w-8" aria-hidden="true" />
        </span>
        <p className="font-serif text-5xl font-bold text-brand-700">404</p>
        <h1 className="font-serif text-3xl font-bold text-cocoa-800">
          Esta página no existe
        </h1>
        <p className="text-sm leading-relaxed text-cocoa-500">
          Parece que este plato no está en nuestro menú. Volvé al inicio o
          recorré nuestras pastas.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/pastas">Ver nuestras pastas</Button>
          <Button href="/" variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}