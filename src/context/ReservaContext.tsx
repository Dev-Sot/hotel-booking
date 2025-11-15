"use client";

import React, { createContext, useContext, useState } from "react";
import {
  createReserva,
  getReservasByUser,
  updateReserva,
  cancelReserva,
} from "@/lib/api";
import { Reserva } from "@/types";

interface ReservaContextType {
  reservas: Reserva[];
  loading: boolean;
  error: string | null;
  fetchReservas: (usuarioId: string) => Promise<void>;
  crear: (reserva: Omit<Reserva, "id" | "createdAt">) => Promise<boolean>;
  actualizar: (id: string, updates: Partial<Reserva>) => Promise<boolean>;
  cancelar: (id: string) => Promise<boolean>;
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);

export function ReservaProvider({ children }: { children: React.ReactNode }) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservas = async (usuarioId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getReservasByUser(usuarioId);
      if (result.success) {
        setReservas(result.data || []);
      } else {
        setError(result.error || "Error al cargar reservas");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const crear = async (data: Omit<Reserva, "id" | "createdAt">) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createReserva(data);
      if (result.success) {
        setReservas([...reservas, result.data!]);
        return true;
      } else {
        setError(result.error || "Error al crear reserva");
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const actualizar = async (id: string, updates: Partial<Reserva>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateReserva(id, updates);
      if (result.success) {
        setReservas(
          reservas.map((r) => (r.id === id ? result.data! : r))
        );
        return true;
      } else {
        setError(result.error || "Error al actualizar reserva");
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelar = async (id: string) => {
    return actualizar(id, { estado: "cancelada" });
  };

  return (
    <ReservaContext.Provider
      value={{
        reservas,
        loading,
        error,
        fetchReservas,
        crear,
        actualizar,
        cancelar,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}

export function useReservaContext() {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error("useReservaContext debe usarse dentro de ReservaProvider");
  }
  return context;
}
