import { supabase } from "@/lib/supabaseClient";
import { Reserva } from "@/types";

/**
 * Crear nueva reserva
 */
export async function createReserva(reserva: Omit<Reserva, "id" | "createdAt">) {
  try {
    const { data, error } = await supabase
      .from("reservas")
      .insert([reserva])
      .select();
    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Obtener todas las reservas de un usuario
 */
export async function getReservasByUser(usuarioId: string) {
  try {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .eq("usuarioId", usuarioId);
    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    return { success: false, error: (error as Error).message };
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
