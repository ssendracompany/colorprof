import { z } from 'zod';

export const contactFormSchema = z.object({
  nombre: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
      "El nombre solo puede contener letras, espacios y guiones"
    )
    .transform(val => val.trim()),

  email: z.string()
    .email("Por favor, introduce un correo electrónico válido")
    .max(255, "El correo electrónico es demasiado largo")
    .transform(val => val.toLowerCase().trim()),

  telefono: z.string()
    .optional()
    .refine(
      val => !val || /^(\+34|0034)?[\s.-]?[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}$/.test(val),
      "Por favor, introduce un número de teléfono español válido (ej: +34 600 123 456)"
    ),

  servicio: z.enum([
    'Pintura Interior',
    'Pintura Exterior',
    'Decoración',
    'Otro'
  ], {
    errorMap: () => ({ message: "Por favor, selecciona un tipo de servicio" })
  }),

  mensaje: z.string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres")
    .refine(
      val => !/<[^>]*>/g.test(val),
      "El mensaje no puede contener código HTML"
    )
    .transform(val => val.trim())
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}
