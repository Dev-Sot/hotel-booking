"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ReservaForm from "@/components/forms/ReservaForm";
import Navbar from "@/components/shared/Navbar";
import { getHabitaciones } from "@/lib/api/habitaciones";
import { Habitacion } from "@/types";
import { formatPrice } from "@/lib/utils/formatters";

export default function HabitacionesPage() {
  const [habitacionActiva, setHabitacionActiva] = useState<Habitacion | null>(null);
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getHabitaciones();
      if (result.success) {
        setHabitaciones(result.data || []);
        setDemo(Boolean(result.demo));
      } else {
        setError(result.error || "Error al cargar habitaciones");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#06070a] text-white">
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">Nuestras Habitaciones</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Descubre nuestra variedad de habitaciones diseñadas para ofrecer confort, lujo y experiencias inolvidables. Cada espacio está pensado para tu comodidad.
            </p>
            {demo && (
              <p className="mt-4 inline-block text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-3 py-1">
                Modo demo: conecta Supabase para mostrar el catálogo real de habitaciones.
              </p>
            )}
          </motion.div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
              <p className="text-red-300 font-semibold">No se pudieron cargar las habitaciones</p>
              <p className="text-red-300/80 text-sm mt-1">{error}</p>
            </div>
          ) : habitaciones.length === 0 ? (
            <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/10">
              <p className="text-gray-300">Todavía no hay habitaciones publicadas.</p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {habitaciones.map((room, idx) => (
                <motion.article
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={room.imagen}
                      alt={room.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-amber-500 text-gray-900 px-4 py-2 rounded-full font-bold">
                      {formatPrice(room.precio)}/noche
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">{room.titulo}</h3>
                    <p className="text-gray-300 text-sm mb-6">{room.descripcion}</p>

                    <button
                      onClick={() => setHabitacionActiva(room)}
                      className="w-full bg-amber-500/95 hover:bg-amber-500 text-gray-900 px-4 py-3 rounded-lg font-semibold transition"
                    >
                      Reservar Ahora
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>

      <ReservaForm
        open={habitacionActiva !== null}
        onClose={() => setHabitacionActiva(null)}
        habitacion={habitacionActiva}
      />
    </div>
  );
}
