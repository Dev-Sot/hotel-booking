import { Habitacion } from "@/types";

/**
 * Datos de ejemplo. Se usan SOLO cuando Supabase no está configurado
 * (ver isSupabaseConfigured), para que la demo se pueda navegar sin
 * backend real. Coinciden con las filas de ejemplo en supabase/schema.sql
 * y con las imágenes ya incluidas en /public.
 */
export const HABITACIONES_SEED: Habitacion[] = [
  {
    id: "seed-suite-presidencial",
    titulo: "Suite Presidencial",
    descripcion:
      "Amplia suite con vista panorámica, cama king y salón privado. Incluye minibar y jacuzzi privado.",
    precio: 950,
    imagen: "/habitacion1.jpg",
    tipo: "suite",
    activa: true,
  },
  {
    id: "seed-suite-deluxe",
    titulo: "Suite Deluxe",
    descripcion:
      "Diseño contemporáneo, balcón y servicios premium. Ducha de lluvia y área de trabajo.",
    precio: 620,
    imagen: "/habitacion2.jpg",
    tipo: "suite",
    activa: true,
  },
  {
    id: "seed-doble-ejecutiva",
    titulo: "Doble Ejecutiva",
    descripcion:
      "Cómoda, funcional y perfecta para viajes de negocios. Escritorio completo e internet de alta velocidad.",
    precio: 420,
    imagen: "/habitacion3.jpg",
    tipo: "doble",
    activa: true,
  },
];
