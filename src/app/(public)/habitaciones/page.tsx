"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReservaForm from "@/components/forms/ReservaForm";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import Icon, { IconName } from "@/components/ui/Icon";
import { getHabitaciones } from "@/lib/api/habitaciones";
import { Habitacion } from "@/types";
import { formatPrice } from "@/lib/utils/formatters";
import { ROOM_TYPE_LABELS } from "@/lib/utils/constants";

const AMENITIES: Record<Habitacion["tipo"], { icon: IconName; label: string }[]> = {
  suite: [
    { icon: "area", label: "85 m²" },
    { icon: "bed", label: "Cama king" },
    { icon: "view", label: "Vista panorámica" },
  ],
  doble: [
    { icon: "area", label: "45 m²" },
    { icon: "bed", label: "Dos camas queen" },
    { icon: "wifi", label: "Wi-Fi de alta velocidad" },
  ],
  sencilla: [
    { icon: "area", label: "32 m²" },
    { icon: "bed", label: "Cama queen" },
    { icon: "wifi", label: "Wi-Fi de alta velocidad" },
  ],
};

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
    <div className="min-h-screen bg-ink">
      <Navbar />

      <PageHero
        eyebrow="Habitaciones y suites"
        title="Nuestras Habitaciones"
        image="/habitacion2.jpg"
        description="Espacios concebidos para el descanso: materiales nobles, iluminación cálida y vistas que invitan a quedarse un día más."
      >
        {demo && (
          <p className="mt-8 inline-flex items-center gap-2 border border-gold/30 bg-ink/60 px-4 py-2 text-xs text-gold-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Modo demo: conecta Supabase para mostrar el catálogo real de habitaciones.
          </p>
        )}
      </PageHero>

      <main className="container-site pb-32 pt-8">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border border-gold/30 border-t-gold" />
          </div>
        ) : error ? (
          <div className="border border-red-400/30 bg-red-500/5 p-10 text-center">
            <p className="text-red-200">No se pudieron cargar las habitaciones</p>
            <p className="mt-1 text-sm text-red-200/70">{error}</p>
          </div>
        ) : habitaciones.length === 0 ? (
          <div className="border border-white/10 p-14 text-center text-sand-muted">Todavía no hay habitaciones publicadas.</div>
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {habitaciones.map((room, idx) => (
              <Reveal key={room.id}>
                <article className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-16 md:py-20">
                  <div className={`md:col-span-7 ${idx % 2 ? "md:order-2" : ""}`}>
                    <div className="group relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={room.imagen}
                        alt={room.titulo}
                        fill
                        sizes="(max-width: 768px) 100vw, 58vw"
                        className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <p className="font-display text-6xl text-white/10">{String(idx + 1).padStart(2, "0")}</p>
                    <p className="eyebrow mt-2">{ROOM_TYPE_LABELS[room.tipo] ?? room.tipo}</p>
                    <h2 className="mt-4 text-4xl md:text-5xl">{room.titulo}</h2>
                    <p className="mt-5 leading-relaxed text-sand-muted">{room.descripcion}</p>

                    <ul className="mt-8 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                      {(AMENITIES[room.tipo] ?? AMENITIES.suite).map((a) => (
                        <li key={a.label} className="flex flex-col gap-2 text-xs text-sand-muted">
                          <Icon name={a.icon} className="h-5 w-5 text-gold" />
                          {a.label}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
                      <p className="text-sm text-sand-muted">
                        Desde <span className="font-display text-3xl text-white">{formatPrice(room.precio)}</span>
                        <span className="ml-1">/ noche</span>
                      </p>
                      <button onClick={() => setHabitacionActiva(room)} className="btn-gold">
                        Reservar ahora
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <Footer />

      <ReservaForm
        key={habitacionActiva?.id ?? "none"}
        open={habitacionActiva !== null}
        onClose={() => setHabitacionActiva(null)}
        habitacion={habitacionActiva}
      />
    </div>
  );
}
