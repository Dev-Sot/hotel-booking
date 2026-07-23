"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import AuthGuard from "@/components/shared/AuthGuard";
import { useAuthContext } from "@/context/AuthContext";
import { useReservaContext } from "@/context/ReservaContext";
import { Reserva } from "@/types";
import { formatDate } from "@/lib/utils/formatters";
import { daysBetween } from "@/lib/utils/dateHelpers";

function ReservasContent() {
  const { user } = useAuthContext();
  const { reservas, loading, error, fetchReservas, cancelar } = useReservaContext();
  const [modalActivo, setModalActivo] = useState<{ tipo: "detalles" | "modificar" | "cancelar"; reserva: Reserva } | null>(null);
  const [cancelando, setCancelando] = useState(false);

  useEffect(() => {
    if (user) fetchReservas(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCancelar = async (reserva: Reserva) => {
    setCancelando(true);
    const ok = await cancelar(reserva.id);
    setCancelando(false);
    if (ok) setModalActivo(null);
  };

  if (loading) {
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
              Aquí puedes ver y gestionar todas tus reservas
            </p>
          </motion.div>
        </section>

        {/* Reservas List */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          {error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
              <p className="text-red-300 font-semibold mb-1">No se pudieron cargar tus reservas</p>
              <p className="text-red-300/80 text-sm">{error}</p>
            </div>
          ) : reservas.length === 0 ? (
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
              {reservas.map((reserva, idx) => {
                const noches = daysBetween(reserva.fechaInicio, reserva.fechaFin);
                const precioNoche = reserva.habitacion?.precio;
                const total = precioNoche != null ? precioNoche * noches : null;

                return (
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
                        <h3 className="text-xl font-semibold text-white">
                          {reserva.habitacion?.titulo || reserva.tipo}
                        </h3>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-2">Fechas</p>
                        <div className="text-white">
                          <div className="font-medium">{formatDate(reserva.fechaInicio)}</div>
                          <div className="text-gray-400 text-xs">a {formatDate(reserva.fechaFin)}</div>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-2">Detalles</p>
                        <div className="text-white">
                          <div className="font-medium">{noches} noches</div>
                          {precioNoche != null && (
                            <div className="text-amber-400 text-sm">${precioNoche}/noche</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm mb-2">Total</p>
                        <div className="text-2xl font-bold text-amber-400">
                          {total != null ? `$${total}` : "—"}
                        </div>
                      </div>

                      <div className="flex items-center justify-center md:justify-end">
                        <div
                          className={`px-6 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(
                            reserva.estado
                          )}`}
                        >
                          {getStatusLabel(reserva.estado)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10 flex gap-3 justify-end flex-wrap">
                      {(reserva.estado === "confirmada" || reserva.estado === "pendiente") && (
                        <>
                          {reserva.estado === "confirmada" && (
                            <button
                              onClick={() => setModalActivo({ tipo: "modificar", reserva })}
                              className="px-6 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                              Modificar
                            </button>
                          )}
                          <button
                            onClick={() => setModalActivo({ tipo: "cancelar", reserva })}
                            className="px-6 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setModalActivo({ tipo: "detalles", reserva })}
                        className="px-6 py-2 text-sm font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        Detalles
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-2xl p-8"
            >
              <div className="text-3xl mb-4">📞</div>
              <h3 className="font-semibold text-white mb-2">Soporte 24/7</h3>
              <p className="text-gray-400 text-sm">
                ¿Necesitas ayuda? Contacta a nuestro equipo de soporte.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-2xl p-8"
            >
              <div className="text-3xl mb-4">🏨</div>
              <h3 className="font-semibold text-white mb-2">Nuevas Habitaciones</h3>
              <p className="text-gray-400 text-sm">
                Explora nuestras últimas habitaciones disponibles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-2xl p-8"
            >
              <div className="text-3xl mb-4">✈️</div>
              <h3 className="font-semibold text-white mb-2">Ofertas Especiales</h3>
              <p className="text-gray-400 text-sm">
                Aprovecha nuestros descuentos y promociones especiales.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalActivo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setModalActivo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-amber-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modalActivo.tipo === "detalles" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Detalles de la Reserva</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Habitación</p>
                    <p className="text-white font-semibold">
                      {modalActivo.reserva.habitacion?.titulo || modalActivo.reserva.tipo}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Fechas</p>
                    <p className="text-white font-semibold">
                      {formatDate(modalActivo.reserva.fechaInicio)} a {formatDate(modalActivo.reserva.fechaFin)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Duración</p>
                    <p className="text-white font-semibold">
                      {daysBetween(modalActivo.reserva.fechaInicio, modalActivo.reserva.fechaFin)} noches
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Estado</p>
                    <p className="text-white font-semibold">{getStatusLabel(modalActivo.reserva.estado)}</p>
                  </div>
                </div>
              </>
            )}

            {modalActivo.tipo === "modificar" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Modificar Reserva</h2>
                <p className="text-gray-300 mb-6">
                  Para modificar tu reserva, por favor contacta al equipo de soporte. Podemos ayudarte a cambiar fechas o habitación.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-300 text-sm">
                    📞 Teléfono: +1 (555) 123-4567<br />
                    📧 Email: reservas@hotelcolina.com
                  </p>
                </div>
              </>
            )}

            {modalActivo.tipo === "cancelar" && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Cancelar Reserva</h2>
                <p className="text-gray-300 mb-4">¿Estás seguro de que deseas cancelar esta reserva?</p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-300 text-sm">
                    <strong>Aviso:</strong> La cancelación se procesará según nuestra política de cancelación.
                  </p>
                </div>
                {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
              </>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setModalActivo(null)}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
              >
                {modalActivo.tipo === "detalles" ? "Cerrar" : "Atrás"}
              </button>
              {modalActivo.tipo === "cancelar" && (
                <button
                  onClick={() => handleCancelar(modalActivo.reserva)}
                  disabled={cancelando}
                  className="px-6 py-2 rounded-lg font-semibold transition text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelando ? "Cancelando..." : "Confirmar Cancelación"}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default function ReservasPage() {
  return (
    <AuthGuard>
      <ReservasContent />
    </AuthGuard>
  );
}
