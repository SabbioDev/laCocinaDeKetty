"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Landmark,
  MessageCircle,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import { useCart, selectCartSubtotal } from "@/store/cart";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/validations";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { buildWhatsAppOrderUrl, calculateOrderSummary } from "@/lib/whatsapp";
import type { CheckoutData } from "@/types";

const provinces = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const paymentIcons = {
  transferencia: Landmark,
  mercadopago: CreditCard,
  efectivo: Banknote,
};

export function CheckoutForm() {
  const items = useCart((state) => state.items);
  const subtotal = useCart(selectCartSubtotal);
  const clearCart = useCart((state) => state.clear);

  const [orderUrl, setOrderUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryMethod: "envio",
      paymentMethod: "transferencia",
      address: { street: "", number: "", city: "", postalCode: "", province: provinces[0] },
      notes: "",
    },
  });

  const deliveryMethod = useWatch({ control, name: "deliveryMethod" });

  const orderItems = items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
  const summary = calculateOrderSummary(orderItems, deliveryMethod);

  if (orderUrl) {
    return (
      <div className="container-ketty mx-auto max-w-2xl py-16 sm:py-24">
        <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-10 text-center shadow-card">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100 text-sage-700">
            <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
          </span>
          <h1 className="font-serif text-3xl font-bold text-cocoa-800">
            ¡Pedido listo!
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-cocoa-600">
            Abrimos WhatsApp con tu pedido armado. Solo confirmá el envío con
            nuestro equipo y ¡listo! Si no se abrió, tocá el botón de abajo.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button href={orderUrl} target="_blank" rel="noopener noreferrer" className="bg-wa hover:bg-wa-dark">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Abrir WhatsApp
            </Button>
            <Button href="/pastas" variant="outline">
              Seguir comprando
            </Button>
          </div>
          <p className="text-xs text-cocoa-600">
            En esta versión no se cobra ningún pago real. El pago se coordina por WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-ketty py-16 sm:py-24">
        <EmptyState
          icon={ShoppingBag}
          title="No tenés productos en el carrito"
          description="Agregá tus pastas favoritas antes de continuar con el checkout."
          actionLabel="Ver nuestras pastas"
          actionHref="/pastas"
        />
      </div>
    );
  }

  const onSubmit = (values: CheckoutFormValues) => {
    const data: CheckoutData = {
      customer: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
      },
      deliveryMethod: values.deliveryMethod,
      address: values.deliveryMethod === "envio" ? values.address : undefined,
      paymentMethod: values.paymentMethod,
      notes: values.notes ?? "",
    };
    const url = buildWhatsAppOrderUrl(orderItems, data, summary);
    window.open(url, "_blank", "noopener,noreferrer");
    setOrderUrl(url);
    clearCart();
  };

  return (
    <div className="bg-manteca-50">
      <div className="container-ketty grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_400px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-8"
        >
          <fieldset className="flex flex-col gap-5">
            <legend className="font-serif text-2xl font-bold text-cocoa-800">
              Datos del cliente
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Nombre"
                placeholder="Ej: Matías"
                autoComplete="given-name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                label="Apellido"
                placeholder="Ej: Gómez"
                autoComplete="family-name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Teléfono"
                type="tel"
                placeholder="Ej: 11 1234 5678"
                autoComplete="tel"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                label="Email"
                type="email"
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-5">
            <legend className="font-serif text-2xl font-bold text-cocoa-800">
              Entrega
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  value="retiro"
                  className="peer sr-only"
                  {...register("deliveryMethod")}
                />
                <span className="flex h-full items-center gap-3 rounded-2xl border border-cocoa-400/40 bg-white p-4 transition-all peer-checked:border-brand-600 peer-checked:ring-2 peer-checked:ring-brand-600/20 focus-within:ring-2 focus-within:ring-brand-600">
                  <Store className="h-6 w-6 shrink-0 text-cocoa-500 peer-checked:text-brand-600" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-cocoa-800">Retiro por el local</span>
                    <span className="block text-xs text-cocoa-500">{siteConfig.address}</span>
                  </span>
                </span>
              </label>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  value="envio"
                  className="peer sr-only"
                  {...register("deliveryMethod")}
                />
                <span className="flex h-full items-center gap-3 rounded-2xl border border-cocoa-400/40 bg-white p-4 transition-all peer-checked:border-brand-600 peer-checked:ring-2 peer-checked:ring-brand-600/20 focus-within:ring-2 focus-within:ring-brand-600">
                  <Truck className="h-6 w-6 shrink-0 text-cocoa-500" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-cocoa-800">Envío a domicilio</span>
                    <span className="block text-xs text-cocoa-500">
                      {summary.shipping > 0
                        ? `Costo: ${formatPrice(summary.shipping)}`
                        : "Gratis para tu pedido"}
                    </span>
                  </span>
                </span>
              </label>
            </div>
            {errors.deliveryMethod ? (
              <p role="alert" className="text-xs font-medium text-brand-600">
                {errors.deliveryMethod.message}
              </p>
            ) : null}

            {deliveryMethod === "envio" ? (
              <div className="flex flex-col gap-4 rounded-2xl bg-manteca-100/70 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Input
                      label="Calle"
                      placeholder="Ej: Av. Rivadavia"
                      autoComplete="address-line1"
                      error={errors.address?.street?.message}
                      {...register("address.street")}
                    />
                  </div>
                  <Input
                    label="Número"
                    placeholder="1234"
                    autoComplete="street-address"
                    error={errors.address?.number?.message}
                    {...register("address.number")}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Input
                    label="Ciudad"
                    placeholder="Ej: CABA"
                    autoComplete="address-level2"
                    error={errors.address?.city?.message}
                    {...register("address.city")}
                  />
                  <Input
                    label="Código postal"
                    placeholder="Ej: 1425"
                    autoComplete="postal-code"
                    error={errors.address?.postalCode?.message}
                    {...register("address.postalCode")}
                  />
                  <Select
                    label="Provincia"
                    error={errors.address?.province?.message}
                    {...register("address.province")}
                  >
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            ) : null}
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="font-serif text-2xl font-bold text-cocoa-800">
              Método de pago
            </legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {siteConfig.paymentMethods.map((method) => {
                const Icon = paymentIcons[method.id as keyof typeof paymentIcons];
                return (
                  <label key={method.id} className="relative cursor-pointer">
                    <input
                      type="radio"
                      value={method.id}
                      className="peer sr-only"
                      {...register("paymentMethod")}
                    />
                    <span className="flex h-full flex-col gap-2 rounded-2xl border border-cocoa-400/40 bg-white p-4 transition-all peer-checked:border-brand-600 peer-checked:ring-2 peer-checked:ring-brand-600/20 focus-within:ring-2 focus-within:ring-brand-600">
                      <Icon className="h-6 w-6 text-cocoa-500" aria-hidden="true" />
                      <span className="font-semibold text-cocoa-800">{method.label}</span>
                      <span className="text-xs leading-relaxed text-cocoa-500">{method.hint}</span>
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.paymentMethod ? (
              <p role="alert" className="text-xs font-medium text-brand-600">
                {errors.paymentMethod.message}
              </p>
            ) : null}
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="font-serif text-2xl font-bold text-cocoa-800">
              Nota (opcional)
            </legend>
            <Textarea
              rows={3}
              placeholder="Contanos algo sobre tu pedido…"
              error={errors.notes?.message}
              {...register("notes")}
            />
          </fieldset>
        </form>

        <aside className="h-fit rounded-[2rem] border border-cocoa-400/20 bg-[#fdfaf2] p-7 shadow-sm lg:sticky lg:top-28">
          <h2 className="font-serif text-2xl font-bold text-cocoa-800">
            Resumen del pedido
          </h2>
          <ul className="mt-5 flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-manteca-200">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium text-cocoa-800">{item.name}</span>
                  <span className="txt-num text-xs text-cocoa-600">
                    {item.quantity} × {formatPrice(item.price)}
                  </span>
                </span>
                <span className="txt-num shrink-0 text-sm font-semibold text-cocoa-800">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-col gap-3 border-t border-cocoa-400/20 pt-5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-cocoa-600">Subtotal</dt>
              <dd className="txt-num font-semibold text-cocoa-800">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-cocoa-600">Envío</dt>
              <dd className="txt-num font-medium text-cocoa-600">
                {summary.shipping > 0 ? formatPrice(summary.shipping) : "Gratis"}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-cocoa-400/20 pt-3">
              <dt className="font-semibold text-cocoa-800">Total</dt>
              <dd className="txt-num font-serif text-2xl font-bold text-brand-700">
                {formatPrice(summary.total)}
              </dd>
            </div>
          </dl>

          <p className="mt-4 rounded-2xl bg-manteca-200/70 px-4 py-3 text-xs leading-relaxed text-cocoa-600">
            Al finalizar se abre WhatsApp con tu pedido armado para coordinar la
            entrega. No se realiza un pago real en esta versión.
          </p>

          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            size="lg"
            className="mt-5 w-full text-center"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Finalizar pedido por WhatsApp
          </Button>
          <Link
            href="/carrito"
            className="mt-3 block text-center text-xs font-medium text-cocoa-600 underline-offset-4 hover:text-brand-700 hover:underline"
          >
            Volver al carrito
          </Link>
        </aside>
      </div>
    </div>
  );
}