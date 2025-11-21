import { useState } from "react";
import {
  createReserva,
  getReservasByUser,
  updateReserva,
  cancelReserva,
} from "@/lib/api";
import { Reserva } from "@/types";

/**
 * Hook para manejar reservas
 */
export function useReserva() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReservas = async (usuarioId: string) => {
    setLoading(true);
    setError(null);
    const result = await getReservasByUser(usuarioId);
    if (result.success) {
      setReservas(result.data || []);
    } else {
      setError(result.error || "Error al cargar reservas");
    }
    setLoading(false);
  };

  const create = async (data: Omit<Reserva, "id" | "createdAt">) => {
    setLoading(true);
    setError(null);
    const result = await createReserva(data);
    if (result.success) {
      setReservas([...reservas, result.data!]);
      return { success: true };
    } else {
      setError(result.error || "Error al crear reserva");
      return { success: false, error: result.error };
    }
    setLoading(false);
  };

  const update = async (id: string, updates: Partial<Reserva>) => {
    setLoading(true);
    setError(null);
    const result = await updateReserva(id, updates);
    if (result.success) {
      setReservas(
        reservas.map((r) => (r.id === id ? result.data! : r))
      );
      return { success: true };
    } else {
      setError(result.error || "Error al actualizar reserva");
      return { success: false, error: result.error };
    }
    setLoading(false);
  };

  const cancel = async (id: string) => {
    return update(id, { estado: "cancelada" });
  };

  return { reservas, loading, error, loadReservas, create, update, cancel };
}
