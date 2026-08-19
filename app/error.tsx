"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-ketty py-16 sm:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center gap-5 rounded-3xl border border-cocoa-400/20 bg-white p-10 text-center shadow-soft">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600/10 text-brand-600">
          <TriangleAlert className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="font-serif text-3xl font-bold text-cocoa-800">
          Algo salió mal
        </h1>
        <p className="text-sm leading-relaxed text-cocoa-500">
          Ocurrió un error inesperado al cargar esta página. Probá de nuevo o
          volvé a empezar.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={retry}>
            Intentar de nuevo
          </Button>
          <Button href="/" variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}