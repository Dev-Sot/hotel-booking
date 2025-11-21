import { supabase } from "@/lib/supabaseClient";
import { Habitacion } from "@/types";

/**
 * Obtener todas las habitaciones
 */
export async function getHabitaciones() {
  try {
    const { data, error } = await supabase
      .from("habitaciones")
      .select("*")
      .eq("activa", true);
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
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
