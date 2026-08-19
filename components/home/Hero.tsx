"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/data/site-content";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-manteca-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ead7b0 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="container-ketty relative grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 lg:grid-cols-2 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex max-w-xl flex-col items-start gap-6"
        >
          <Badge variant="manteca">{heroContent.eyebrow}</Badge>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.1] text-cocoa-800 sm:text-5xl lg:text-6xl">
            {heroContent.title}
          </h1>
          <p className="text-lg leading-relaxed text-cocoa-500">
            {heroContent.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/pastas" size="lg">
              {heroContent.primaryCta}
            </Button>
            <Button href="/nosotros" variant="outline" size="lg">
              {heroContent.secondaryCta}
            </Button>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cocoa-600">
            <li className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden="true" />
              Elaboradas en el día
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden="true" />
              Ingredientes frescos
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-600" aria-hidden="true" />
              Envío a domicilio
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
            <Image
              src={heroContent.image}
              alt={heroContent.imageAlt}
              width={1600}
              height={1067}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-800/20 to-transparent" aria-hidden="true" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-cocoa-400/20 bg-white px-5 py-3 shadow-card sm:left-auto sm:bottom-8 sm:-right-4 sm:translate-x-0"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-serif text-lg font-bold text-white">
              K
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-cocoa-800">
                Receta de familia
              </span>
              <span className="text-xs text-cocoa-400">
                Tradición desde la primera tanda
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}