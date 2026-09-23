/**
 * URL pública del sitio. Prioriza NEXT_PUBLIC_APP_URL; en Vercel cae al
 * dominio de producción que la plataforma inyecta automáticamente.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
