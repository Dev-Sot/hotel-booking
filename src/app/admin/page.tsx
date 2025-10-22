"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-600">Verificando sesión...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.email}</h1>
      <p className="text-gray-600 mb-8">
        Aquí podrás gestionar las habitaciones, reservas y usuarios.
      </p>
      <button
        onClick={async () => {
          await import("@/lib/supabaseClient").then(async ({ supabase }) => {
            await supabase.auth.signOut();
            router.push("/login");
          });
        }}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
