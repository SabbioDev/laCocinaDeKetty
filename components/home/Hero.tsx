"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/data/site-content";
import { PastaRibbon } from "@/components/ui/PastaRibbon";

const trustItems = ["Elaboradas en el día", "Ingredientes frescos", "Envío a domicilio"];

export function Hero() {
  const [titleLead, titleAccent] = heroContent.title.split(", ");

  return (
    <section className="relative overflow-hidden bg-manteca-50 paper-dots">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(58rem 30rem at 78% -12%, rgb(201 74 48 / 0.12), transparent 62%), radial-gradient(44rem 28rem at -8% 108%, rgb(217 164 65 / 0.14), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-ketty relative grid min-h-[calc(100vh-5.5rem)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-xl flex-col items-start gap-7"
        >
          <span className="flex items-center gap-2.5">
            <span className="text-brand-600">✦</span>
            <span className="eyebrow text-brand-700">{heroContent.eyebrow}</span>
            <PastaRibbon className="h-3 w-16" />
          </span>

          <h1 className="text-balance font-serif text-5xl font-bold leading-[1.02] tracking-tight text-cocoa-800 sm:text-6xl lg:text-[4.5rem]">
            {titleLead}
            {titleAccent ? (
              <>
                ,<br />
                <em className="font-serif italic text-brand-700">{titleAccent}</em>
              </>
            ) : null}
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-cocoa-600">
            {heroContent.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Button href="/pastas" size="lg">
              {heroContent.primaryCta}
            </Button>
            <Button href="/nosotros" variant="outline" size="lg">
              {heroContent.secondaryCta}
            </Button>
          </div>

          <ul className="mt-3 flex w-full flex-wrap items-center gap-x-8 gap-y-3 border-t border-cocoa-400/30 pt-6 text-sm font-medium text-cocoa-700">
            {trustItems.map((item, index) => (
              <li key={item} className="flex items-center gap-2">
                <span className="font-serif text-sm italic text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[3rem] shadow-lift ring-1 ring-cocoa-400/20">
            <Image
              src={heroContent.image}
              alt={heroContent.imageAlt}
              width={1600}
              height={1067}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-cocoa-900/35 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -top-5 right-4 flex items-center gap-3 rounded-2xl border border-cocoa-400/20 bg-[#fdfaf2]/90 px-4 py-3 shadow-card backdrop-blur-md sm:-right-5 sm:top-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-500/30 bg-gradient-to-br from-brand-500 to-brand-700 font-serif text-xl font-bold italic text-[#fbf4e6]">
              K
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-cocoa-800">Receta de familia</span>
              <span className="text-xs text-cocoa-600">Tradición desde la primera tanda</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full border border-cocoa-400/20 bg-[#fdfaf2]/90 px-5 py-2.5 shadow-card backdrop-blur-md sm:left-8"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-sage-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-cocoa-800">Envío gratis desde $60.000</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}