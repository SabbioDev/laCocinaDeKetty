import { z } from "zod";

const phoneRegex = /^[+]?[\d\s()-]{8,20}$/;

export const customerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre")
    .max(60, "El nombre es demasiado largo"),
  lastName: z
    .string()
    .trim()
    .min(2, "Ingresá tu apellido")
    .max(60, "El apellido es demasiado largo"),
  phone: z
    .string()
    .trim()
    .min(8, "Ingresá un teléfono válido")
    .regex(phoneRegex, "Ingresá un teléfono válido"),
  email: z.string().trim().email("Ingresá un email válido"),
});

export const addressSchema = z.object({
  street: z.string().trim().min(3, "Ingresá la calle").max(120),
  number: z.string().trim().min(1, "Ingresá el número"),
  city: z.string().trim().min(2, "Ingresá la ciudad").max(80),
  postalCode: z.string().trim().min(3, "Ingresá el código postal").max(12),
  province: z.string().trim().min(2, "Ingresá la provincia").max(60),
});

export const checkoutSchema = customerSchema
  .extend({
    deliveryMethod: z.enum(["retiro", "envio"], "Elegí un método de entrega"),
    address: addressSchema.optional(),
    paymentMethod: z.enum(
      ["transferencia", "mercadopago", "efectivo"],
      "Elegí un método de pago",
    ),
    notes: z.string().trim().max(500, "La nota es demasiado larga").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "envio") {
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["address"],
          message: "Completá tu dirección",
        });
        return;
      }
      const result = addressSchema.safeParse(data.address);
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["address", ...issue.path],
            message: issue.message,
          });
        }
      }
    }
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre"),
  email: z.string().trim().email("Ingresá un email válido"),
  message: z.string().trim().min(10, "Escribí tu consulta"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;