"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
    try {
      const result = await getCurrentUser();
      if (result.success && result.user) {
        setUser({
          id: result.user.id,
          email: result.user.email || "",
          nombre: result.user.user_metadata?.nombre,
          apellido: result.user.user_metadata?.apellido,
          createdAt: result.user.created_at,
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al verificar usuario");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cerrar sesión");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}
