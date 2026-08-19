"use client";

import { TriangleAlert } from "lucide-react";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#EAD7B0",
          color: "#3B2B20",
        }}
      >
        <div
          style={{
            maxWidth: 420,
            padding: "2.5rem",
            borderRadius: 24,
            background: "#fff",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "#C0392B1A",
            }}
          >
            <TriangleAlert color="#C0392B" size={26} aria-hidden="true" />
          </div>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem" }}>
            Algo salió mal
          </h1>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b5b4e" }}>
            Ocurrió un error inesperado. Intentá de nuevo o volvé a cargar la
            página.
          </p>
          <button
            type="button"
            onClick={retry}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: 999,
              border: "none",
              background: "#A62626",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  );
}