# La Cocina Ketty

Sitio de e-commerce para la venta de pastas caseras artesanales, con checkout
por WhatsApp. Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS v4 y
Zustand.

## Stack

- **Framework:** Next.js 16.3 (App Router, Server Components)
- **UI:** Tailwind CSS v4, lucide-react, Motion, clsx + tailwind-merge
- **Estado:** Zustand (carrito persistido en `localStorage`)
- **Formularios:** react-hook-form + zod + @hookform/resolvers
- **Checkout:** el pedido se envía armado a WhatsApp (`wa.me`)

## Puesta en marcha

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores (WhatsApp, email,
redes, dirección, zona de reparto, URL del sitio).

> El número de WhatsApp por defecto (`5491100000000`) es un placeholder. Antes
> de publicar, configurá el número real en `NEXT_PUBLIC_WHATSAPP_NUMBER`.
> El checkout abre `wa.me` en una pestaña nueva; no hay pasarela de pago real
> en esta versión.

## Scripts

```bash
npm run dev        # desarrollo
npm run build      # build de producción
npm run start      # servidor de producción
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write
```

## Estructura

```
app/                 # rutas (pastas, productos/[slug], carrito, checkout,
                     # nosotros, contacto, preguntas-frecuentes) + sitemap/robots
components/
  ui/                # primitivas (Button, Input, Accordion, Drawer, Modal…)
  layout/            # Header, Footer, drawers, búsqueda
  products/          # catálogo, filtros, tarjetas, detalle
  cart/              # carrito (drawer y página)
  checkout/          # formulario de checkout
  contact/           # formulario de contacto
  home/              # secciones de la home
data/                # productos, categorías y contenido editable
store/               # stores de Zustand (cart, ui)
config/site.ts       # config central (datos de contacto, envío, pagos)
lib/                 # utilidades, validaciones, WhatsApp, formateo
```

## Contenido editable

- **Productos, precios, imágenes:** `data/products.ts`
- **Categorías, imágenes:** `data/categories.ts`
- **Testimonios, historia, FAQs, procesos:** `data/site-content.ts`
- **Datos de contacto, horarios, envío, pagos:** `config/site.ts`

> ⚠️ Los testimonios y la historia de marca son **contenido de demostración**:
> reemplazarlos por contenido real antes de publicar. Las imágenes de productos
> son placeholders de Pexels.

## Notas

- Envío: `$3.000` fijo, gratis desde `$60.000` (configurable en `config/site.ts`).
- Todas las imágenes usan `next/image` con `remotePatterns` para
  `images.pexels.com`.
- Fuentes tipográficas (Playfair Display + Inter) se cargan con `next/font`
  (requieren red en el build).