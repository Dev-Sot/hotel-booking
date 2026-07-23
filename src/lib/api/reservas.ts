import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Reserva } from "@/types";

const supabase = createClient();

/**
 * ¿Hay alguna reserva activa que se solape con este rango de fechas para
 * esta habitación? Se usa antes de crear una reserva para dar un mensaje
 * claro; la garantía real contra condiciones de carrera es la restricción
 * `reservas_no_solape` en supabase/schema.sql (EXCLUDE a nivel de base de
 * datos), esto solo evita el viaje redondo cuando ya sabemos que fallará.
 */
export async function checkDisponibilidad(habitacionId: string, fechaInicio: string, fechaFin: string) {
  if (!isSupabaseConfigured) return { success: true, disponible: true };
  try {
    const { data, error } = await supabase
      .from("reservas")
      .select("id")
      .eq("habitacionId", habitacionId)
      .neq("estado", "cancelada")
      .lt("fechaInicio", fechaFin)
      .gt("fechaFin", fechaInicio)
      .limit(1);
    if (error) throw error;
    return { success: true, disponible: (data?.length ?? 0) === 0 };
  } catch (error) {
    return { success: false, error: (error as Error).message, disponible: false };
  }
}

/**
 * Crear nueva reserva
 */
export async function createReserva(reserva: Omit<Reserva, "id" | "createdAt">) {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase no está configurado todavía: no se puede persistir la reserva." };
  }

  if (reserva.habitacionId) {
    const disponibilidad = await checkDisponibilidad(reserva.habitacionId, reserva.fechaInicio, reserva.fechaFin);
    if (!disponibilidad.disponible) {
      return { success: false, error: "Esa habitación ya está reservada en esas fechas." };
    }
  }

  try {
    const { data, error } = await supabase
      .from("reservas")
      .insert([reserva])
      .select();
    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (error) {
    // Si el pre-chequeo no detectó el solape (condición de carrera), la
    // restricción EXCLUDE de la base de datos rechaza el insert igual.
    if ((error as { code?: string }).code === "23P01") {
      return { success: false, error: "Esa habitación ya está reservada en esas fechas." };
    }
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Obtener todas las reservas de un usuario, con los datos de su habitación
 * (nombre/precio/imagen) unidos vía la relación reservas.habitacionId.
 * Sin Supabase configurado devuelve una lista vacía marcada como `demo`
 * en vez de inventar reservas — la página debe explicarlo, no fingirlo.
 */
export async function getReservasByUser(usuarioId: string) {
  if (!isSupabaseConfigured) {
    return { success: true, data: [] as Reserva[], demo: true as const };
  }
  try {
    const { data, error } = await supabase
      .from("reservas")
      .select("*, habitacion:habitaciones(titulo, precio, imagen)")
      .eq("usuarioId", usuarioId)
      .order("createdAt", { ascending: false });
    if (error) throw error;
    return { success: true, data: (data as Reserva[]) || [], demo: false as const };
  } catch (error) {
    return { success: false, error: (error as Error).message, demo: false as const };
  }
}

/**
 * Obtener reserva por ID
 */
export async function getReservaById(id: string) {
  try {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Actualizar reserva
 */
export async function updateReserva(id: string, updates: Partial<Reserva>) {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase no está configurado todavía: no se puede actualizar la reserva." };
  }
  try {
    const { data, error } = await supabase
      .from("reservas")
      .update(updates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Cancelar reserva
 */
export async function cancelReserva(id: string) {
  return updateReserva(id, { estado: "cancelada" });
}

/**
 * Eliminar reserva
 */
export async function deleteReserva(id: string) {
  try {
    const { error } = await supabase.from("reservas").delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
