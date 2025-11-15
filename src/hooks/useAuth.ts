import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/lib/api";
import { User } from "@/types";

/**
 * Hook para manejar autenticación
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const logout = async () => {
    const result = await signOut();
    if (result.success) {
      setUser(null);
    } else {
      setError(result.error || "Error al cerrar sesión");
    }
  };

  return { user, loading, error, logout, checkUser };
}
