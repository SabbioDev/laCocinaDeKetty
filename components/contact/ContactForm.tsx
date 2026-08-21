"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export function ContactForm() {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  if (sentUrl) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[2rem] bg-sage-100 p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-600/10 text-sage-700">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h3 className="font-serif text-xl font-semibold text-cocoa-800">
          ¡Consulta enviada!
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-cocoa-600">
          Abrimos WhatsApp con tu mensaje listo para enviar. Si no se abrió,
          tocá el botón de abajo.
        </p>
        <Button
          href={sentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-wa hover:bg-wa-dark"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Abrir WhatsApp
        </Button>
        <button
          type="button"
          onClick={() => {
            setSentUrl(null);
            reset();
          }}
          className="text-xs font-medium text-cocoa-600 underline-offset-4 hover:text-brand-700 hover:underline"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  const onSubmit = (values: ContactFormValues) => {
    const message = [
      `Hola ${siteConfig.name}, mi nombre es ${values.name}.`,
      `Email: ${values.email}`,
      "",
      values.message,
    ].join("\n");
    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Nombre"
          placeholder="Tu nombre"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <Textarea
        label="Mensaje"
        rows={5}
        placeholder="Contanos tu consulta…"
        error={errors.message?.message}
        {...register("message")}
      />
      <div className="flex flex-col gap-2">
        <Button type="submit" size="lg" className="w-fit">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Enviar por WhatsApp
        </Button>
        <p className="text-xs text-cocoa-600">
          Al enviar se abre WhatsApp con tu mensaje. No es necesario que
          escribas nada más.
        </p>
      </div>
    </form>
  );
}