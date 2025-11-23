"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import { useAuthContext } from "@/context/AuthContext";
import { signInWithGoogle } from "@/lib/api/auth";

interface Reserva {
  id: string;
  habitacion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "confirmada" | "pendiente" | "cancelada";
  precio: number;
  noches: number;
  createdAt: string;
}

export default function ReservasPage() {
  const { user, loading: authLoading } = useAuthContext();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loadingReservas, setLoadingReservas] = useState(true);
  const [modalActivo, setModalActivo] = useState<{ tipo: "detalles" | "modificar" | "cancelar"; reserva: Reserva } | null>(null);

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    await signInWithGoogle(window.location.href);
  };

  // Simulación de reservas (en producción, vendrían del API)
  useEffect(() => {
    // Solo cargar reservas si el usuario está autenticado
    if (!user) {
      setLoadingReservas(false);
      return;
    }

    const timer = setTimeout(() => {
      const mockReservas: Reserva[] = [
        {
          id: "res-001",
          habitacion: "Suite Presidencial",
          fechaInicio: "2025-12-20",
          fechaFin: "2025-12-25",
          estado: "confirmada",
          precio: 950,
          noches: 5,
          createdAt: "2025-11-10",
        },
        {
          id: "res-002",
          habitacion: "Suite Deluxe",
          fechaInicio: "2025-11-25",
          fechaFin: "2025-11-28",
          estado: "pendiente",
          precio: 620,
          noches: 3,
          createdAt: "2025-11-14",
        },
        {
          id: "res-003",
          habitacion: "Doble Ejecutiva",
          fechaInicio: "2025-01-10",
          fechaFin: "2025-01-15",
          estado: "confirmada",
          precio: 420,
          noches: 5,
          createdAt: "2025-11-01",
        },
      ];
      setReservas(mockReservas);
      setLoadingReservas(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return "bg-green-500/20 border-green-500/50 text-green-300";
      case "pendiente":
        return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
      case "cancelada":
        return "bg-red-500/20 border-red-500/50 text-red-300";
      default:
        return "bg-gray-500/20 border-gray-500/50 text-gray-300";
    }
  };

  const getStatusLabel = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return "✓ Confirmada";
      case "pendiente":
        return "⏳ Pendiente";
      case "cancelada":
        return "✕ Cancelada";
      default:
        return estado;
    }
  };

  // Loading de autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#06070a] text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-20">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
          <p className="mt-4 text-gray-300">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Usuario no autenticado - mostrar pantalla de login
  if (!user) {
    return (
      <div className="min-h-screen bg-[#06070a] text-white">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl p-12 text-center border border-white/10 max-w-md mx-4"
          >
            <div className="text-6xl mb-6">🔐</div>
            <h2 className="text-3xl font-bold mb-4">Inicia sesión</h2>
            <p className="text-gray-400 mb-8">
              Para ver y gestionar tus reservas, necesitas iniciar sesión con tu cuenta de Google.
            </p>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </button>
            <p className="text-gray-500 text-sm mt-6">
              Al iniciar sesión, aceptas nuestros términos y condiciones.
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  // Loading de reservas
  if (loadingReservas) {
    return (
      <div className="min-h-screen bg-[#06070a] text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center pt-20">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
          <p className="mt-4 text-gray-300">Cargando reservas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-white">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-2">Mis Reservas</h1>
            <p className="text-xl text-gray-400">
              Bienvenido, {user.nombre || user.email}. Aquí puedes gestionar tus reservas.
            </p>
          </motion.div>
        </section>

        {/* Reservas List */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {reservas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-2xl p-12 text-center border border-white/10"
            >
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-2xl font-semibold mb-2">No tienes reservas</h2>
              <p className="text-gray-400 mb-6">
                Crea una nueva reserva para disfrutar de nuestros servicios premium.
              </p>
              <a
                href="/habitaciones"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-3 rounded-lg font-semibold transition"
              >
                Explorar Habitaciones
              </a>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {reservas.map((reserva, idx) => (
                <motion.article
                  key={reserva.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gradient-to-r from-white/5 to-white/2 rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Habitación</p>
                      <h3 className="text-xl font-semibold text-white">{reserva.habitacion}</h3>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Fechas</p>
                      <div className="text-white">
                        <div className="font-medium">{new Date(reserva.fechaInicio).toLocaleDateString("es-ES")}</div>
                        <div className="text-gray-400 text-xs">a {new Date(reserva.fechaFin).toLocaleDateString("es-ES")}</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Detalles</p>
                      <div className="text-white">
                        <div className="font-medium">{reserva.noches} noches</div>
                        <div className="text-amber-400 text-sm">${reserva.precio}/noche</div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Total</p>
                      <div className="text-2xl font-bold text-amber-400">${reserva.precio * reserva.noches}</div>
                    </div>
                    <div className="flex items-center justify-center md:justify-end">
                      <div className={`px-6 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(reserva.estado)}`}>
                        {getStatusLabel(reserva.estado)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/10 flex gap-3 justify-end flex-wrap">
                    {reserva.estado === "confirmada" && (
                      <>
                        <button onClick={() => setModalActivo({ tipo: "modificar", reserva })} className="px-6 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">✏️ Modificar</button>
                        <button onClick={() => setModalActivo({ tipo: "cancelar", reserva })} className="px-6 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition">🗑️ Cancelar</button>
                      </>
                    )}
                    {reserva.estado === "pendiente" && (
                      <button onClick={() => setModalActivo({ tipo: "cancelar", reserva })} className="px-6 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition">🗑️ Cancelar</button>
                    )}
                    <button onClick={() => setModalActivo({ tipo: "detalles", reserva })} className="px-6 py-2 text-sm font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition">👁️ Detalles</button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {modalActivo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalActivo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {modalActivo.tipo === "detalles" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">📋 Detalles</h2>
                <div className="space-y-3 text-gray-300">
                  <p><span className="text-gray-500">Habitación:</span> {modalActivo.reserva.habitacion}</p>
                  <p><span className="text-gray-500">Fechas:</span> {modalActivo.reserva.fechaInicio} a {modalActivo.reserva.fechaFin}</p>
                  <p><span className="text-gray-500">Total:</span> <span className="text-amber-400 font-bold">${modalActivo.reserva.precio * modalActivo.reserva.noches}</span></p>
                </div>
              </>
            )}
            {modalActivo.tipo === "modificar" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">✏️ Modificar</h2>
                <p className="text-gray-300 mb-4">Contacta soporte para modificar tu reserva.</p>
              </>
            )}
            {modalActivo.tipo === "cancelar" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">🗑️ Cancelar</h2>
                <p className="text-gray-300 mb-4">¿Seguro que deseas cancelar esta reserva?</p>
              </>
            )}
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setModalActivo(null)} className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition">Cerrar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}