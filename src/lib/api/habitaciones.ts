import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { HABITACIONES_SEED } from "@/lib/data/habitaciones.seed";
import { Habitacion } from "@/types";

const supabase = createClient();

/**
 * Obtener todas las habitaciones activas. Sin Supabase configurado, cae a
 * datos de ejemplo (HABITACIONES_SEED) para que la demo se pueda navegar;
 * `demo: true` permite a la UI avisarlo en vez de fingir que son datos reales.
 */
export async function getHabitaciones() {
  if (!isSupabaseConfigured) {
    return { success: true, data: HABITACIONES_SEED, demo: true as const };
  }
  try {
    const { data, error } = await supabase
      .from("habitaciones")
      .select("*")
      .eq("activa", true);
    if (error) throw error;
    return { success: true, data: data || [], demo: false as const };
  } catch (error) {
    return { success: false, error: (error as Error).message, demo: false as const };
  }
}

/**
 * Obtener habitación por ID
 */
export async function getHabitacionById(id: string) {
  try {
    const { data, error } = await supabase
      .from("habitaciones")
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
 * Obtener habitaciones por tipo
 */
export async function getHabitacionesByTipo(tipo: string) {
  try {
    const { data, error } = await supabase
      .from("habitaciones")
      .select("*")
      .eq("tipo", tipo)
      .eq("activa", true);
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Crear habitación (admin)
 */
export async function createHabitacion(habitacion: Omit<Habitacion, "id">) {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase no está configurado todavía: no se puede guardar la habitación." };
  }
  try {
    const { data, error } = await supabase
      .from("habitaciones")
      .insert([habitacion])
      .select();
    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Actualizar habitación (admin)
 */
export async function updateHabitacion(id: string, updates: Partial<Habitacion>) {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase no está configurado todavía: no se puede actualizar la habitación." };
  }
  try {
    const { data, error } = await supabase
      .from("habitaciones")
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
 * Eliminar habitación (admin)
 */
export async function deleteHabitacion(id: string) {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase no está configurado todavía: no se puede eliminar la habitación." };
  }
  try {
    const { error } = await supabase
      .from("habitaciones")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
