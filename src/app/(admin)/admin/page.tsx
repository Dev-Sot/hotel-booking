"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function AdminPage() {
  const { user, loading, logout } = useAuthContext();
  const router = useRouter();

  const handleGoToReservations = () => router.push("/reservas");
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Panel de Administración</h1>

        {loading ? (
          <p className="text-gray-400">Cargando usuario...</p>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-lg">Bienvenido{user?.nombre ? `, ${user.nombre}` : ""}.</p>
            <p className="text-sm text-gray-400 mb-4">Gestiona reservas y contenido desde aquí.</p>

            <div className="flex gap-3">
              <button
                onClick={handleGoToReservations}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-md font-medium"
              >
                Mis Reservas
              </button>

              <button
                onClick={() => router.push("/habitaciones")}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md font-medium"
              >
                Ver Habitaciones
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium ml-auto"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
