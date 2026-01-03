import { z } from 'zod';

const TEMPORARY_EMAIL_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'temp-mail.org', '10minutemail.com',
  'throwaway.email', 'maildrop.cc', 'sharklasers.com', 'getnada.com',
  'mailbox.in.ua', 'eblanomail.com'
];

const MALICIOUS_URL_PATTERNS = [
  /https?:\/\//gi,
  /www\./gi,
  /\.com|\.net|\.org|\.io|\.co|\.es/gi,
  /javascript:/gi,
  /data:/gi,
  /vbscript:/gi,
  /onclick|onerror|onload/gi
];

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;
const HTML_ENTITY_PATTERN = /&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/i;

export const contactFormSchema = z.object({
  nombre: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/,
      "El nombre solo puede contener letras, espacios y guiones"
    )
    .refine(
      val => !HTML_TAG_PATTERN.test(val),
      "El nombre no puede contener código HTML"
    )
    .transform(val => val.trim()),

  email: z.string()
    .email("Por favor, introduce un correo electrónico válido")
    .max(255, "El correo electrónico es demasiado largo")
    .refine(
      val => {
        const domain = val.split('@')[1]?.toLowerCase();
        return !TEMPORARY_EMAIL_DOMAINS.includes(domain);
      },
      "No se permiten correos electrónicos temporales"
    )
    .refine(
      val => {
        const domain = val.split('@')[1];
        return domain && domain.includes('.');
      },
      "El dominio del correo electrónico no es válido"
    )
    .transform(val => val.toLowerCase().trim()),

  telefono: z.string()
    .optional()
    .refine(
      val => !val || /^\d{9}$/.test(val.replace(/\s/g, '')),
      "El teléfono debe tener exactamente 9 dígitos"
    )
    .transform(val => val ? val.replace(/\s/g, '') : val),

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
      val => !HTML_TAG_PATTERN.test(val),
      "El mensaje no puede contener código HTML"
    )
    .refine(
      val => !HTML_ENTITY_PATTERN.test(val),
      "El mensaje contiene caracteres no permitidos"
    )
    .refine(
      val => !MALICIOUS_URL_PATTERNS.some(pattern => pattern.test(val)),
      "El mensaje no puede contener enlaces. Por favor, describe tu proyecto sin incluir URLs."
    )
    .refine(
      val => !/(\{|\}|\[|\]|<|>|`|\$\{)/g.test(val),
      "El mensaje contiene caracteres especiales no permitidos"
    )
    .transform(val => val.trim())
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}

export function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/gi, '')
    .replace(/javascript:|data:|vbscript:/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}
