import type { Metadata } from "next";
import { Suspense } from "react";
import { MotionConfig } from "motion/react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { siteConfig } from "@/config/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "La Cocina Ketty | Pastas Caseras Artesanales",
    template: "%s | La Cocina Ketty",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "pastas caseras",
    "pastas artesanales",
    "ravioles",
    "sorrentinos",
    "ñoquis",
    "tallarines",
    "lasagna",
    "comida casera",
    "Buenos Aires",
    "Argentina",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "La Cocina Ketty | Pastas Caseras Artesanales",
    description: siteConfig.description,
    images: [
      {
        url: "/images/logoKetty.png",
        width: 1024,
        height: 1024,
        alt: "La Cocina Ketty - Logo pastas caseras artesanales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Cocina Ketty | Pastas Caseras Artesanales",
    description: siteConfig.description,
    images: ["/images/logoKetty.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-manteca-50 text-cocoa-800">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar al contenido
        </a>
        <div
          aria-hidden="true"
          className="grain-overlay pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-soft-light"
        />
        <MotionConfig reducedMotion="user">
          <Suspense
            fallback={
              <div className="sticky top-0 z-40 px-4 pb-3 pt-3 sm:px-6 sm:pt-4">
                <div className="mx-auto h-14 max-w-7xl rounded-full border border-cocoa-400/20 bg-[#fdfaf2]/80 shadow-soft lg:max-w-none" />
              </div>
            }
          >
            <Header />
          </Suspense>
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchDialog />
          <MobileMenu />
          <FloatingWhatsApp />
        </MotionConfig>
      </body>
    </html>
  );
}