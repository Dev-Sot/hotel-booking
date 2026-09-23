"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import AuthGuard from "@/components/shared/AuthGuard";
import Modal from "@/components/ui/Modal";
import Icon, { IconName } from "@/components/ui/Icon";
import { useAuthContext } from "@/context/AuthContext";
import { useReservaContext } from "@/context/ReservaContext";
import { Reserva } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils/formatters";
import { daysBetween } from "@/lib/utils/dateHelpers";
import { RESERVATION_STATE_LABELS } from "@/lib/utils/constants";

const STATUS_STYLES: Record<Reserva["estado"], string> = {
  confirmada: "border-emerald-400/40 text-emerald-300",
  pendiente: "border-gold/50 text-gold",
  cancelada: "border-white/15 text-sand-dim",
};

const SUPPORT: { icon: IconName; title: string; desc: string; href: string }[] = [
  { icon: "concierge", title: "Concierge 24 horas", desc: "Cambios de fecha, traslados o peticiones especiales.", href: "/contacto" },
  { icon: "bed", title: "Habitaciones", desc: "Descubre las suites disponibles para tu próxima visita.", href: "/habitaciones" },
  { icon: "spa", title: "Servicios", desc: "Reserva spa, cenas privadas y experiencias exclusivas.", href: "/servicios" },
];

type ModalState = { tipo: "detalles" | "modificar" | "cancelar"; reserva: Reserva } | null;

function ReservasContent() {
  const { user } = useAuthContext();
  const { reservas, loading, error, fetchReservas, cancelar } = useReservaContext();
  const [modalActivo, setModalActivo] = useState<ModalState>(null);
  const [cancelando, setCancelando] = useState(false);

  useEffect(() => {
    if (user) fetchReservas(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancelar = async (reserva: Reserva) => {
    setCancelando(true);
    const ok = await cancelar(reserva.id);
    setCancelando(false);
    if (ok) setModalActivo(null);
  };

  const modalTitle =
    modalActivo?.tipo === "detalles"
      ? "Detalles de la reserva"
      : modalActivo?.tipo === "modificar"
        ? "Modificar reserva"
        : "Cancelar reserva";

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <PageHero
        eyebrow="Área de huéspedes"
        title="Mis Reservas"
        image="/habitacion1.jpg"
        description="Consulta y gestiona tus estancias. Para cualquier cambio, nuestro concierge está a tu disposición."
      />

      <main className="container-site pb-24 pt-8">
        {loading ? (
          <div className="flex flex-col items-center py-24 text-sand-muted">
            <div className="h-10 w-10 animate-spin rounded-full border border-gold/30 border-t-gold" />
            <p className="mt-5 text-sm">Cargando reservas...</p>
          </div>
        ) : error ? (
          <div className="border border-red-400/30 bg-red-500/5 p-10 text-center">
            <p className="text-red-200">No se pudieron cargar tus reservas</p>
            <p className="mt-1 text-sm text-red-200/70">{error}</p>
          </div>
        ) : reservas.length === 0 ? (
          <Reveal>
            <div className="border border-white/10 bg-ink-800 px-8 py-20 text-center">
              <Icon name="calendar" className="mx-auto h-10 w-10 text-gold" strokeWidth={1} />
              <h2 className="mt-8 text-3xl">No tienes reservas</h2>
              <p className="mx-auto mt-4 max-w-md text-sand-muted">
                Cuando reserves una estancia aparecerá aquí, con todos sus detalles.
              </p>
              <Link href="/habitaciones" className="btn-gold mt-10">
                Explorar habitaciones
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-6">
            {reservas.map((reserva, idx) => {
              const noches = daysBetween(reserva.fechaInicio, reserva.fechaFin);
              const precioNoche = reserva.habitacion?.precio;
              const total = precioNoche != null ? precioNoche * noches : null;
              const activa = reserva.estado !== "cancelada";

              return (
                <Reveal key={reserva.id} delay={idx * 0.06}>
                  <article className="grid overflow-hidden border border-white/10 bg-ink-800 md:grid-cols-[260px_1fr]">
                    <div className="relative h-48 md:h-auto">
                      <Image
                        src={reserva.habitacion?.imagen || "/habitacion1.jpg"}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 260px"
                        className={`object-cover ${activa ? "" : "grayscale"}`}
                      />
                    </div>

                    <div className="p-7 md:p-9">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.25em] text-sand-dim">
                            Reserva · {reserva.id.slice(0, 8).toUpperCase()}
                          </p>
                          <h3 className="mt-2 text-3xl">{reserva.habitacion?.titulo || reserva.tipo}</h3>
                        </div>
                        <span className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] ${STATUS_STYLES[reserva.estado]}`}>
                          {RESERVATION_STATE_LABELS[reserva.estado] ?? reserva.estado}
                        </span>
                      </div>

                      <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 md:grid-cols-4">
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-sand-dim">Llegada</dt>
                          <dd className="mt-2 text-sm text-white">{formatDate(reserva.fechaInicio)}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-sand-dim">Salida</dt>
                          <dd className="mt-2 text-sm text-white">{formatDate(reserva.fechaFin)}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-sand-dim">Duración</dt>
                          <dd className="mt-2 text-sm text-white">
                            {noches} {noches === 1 ? "noche" : "noches"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-sand-dim">Total</dt>
                          <dd className="mt-1 font-display text-2xl text-gold">{total != null ? formatPrice(total) : "—"}</dd>
                        </div>
                      </dl>

                      <div className="mt-8 flex flex-wrap justify-end gap-3">
                        <button onClick={() => setModalActivo({ tipo: "detalles", reserva })} className="btn-outline !px-5 !py-2.5">
                          Detalles
                        </button>
                        {reserva.estado === "confirmada" && (
                          <button onClick={() => setModalActivo({ tipo: "modificar", reserva })} className="btn-outline !px-5 !py-2.5">
                            Modificar
                          </button>
                        )}
                        {activa && (
                          <button onClick={() => setModalActivo({ tipo: "cancelar", reserva })} className="btn-danger !px-5 !py-2.5">
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        <section className="mt-24 grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
          {SUPPORT.map((s) => (
            <Link key={s.title} href={s.href} className="group bg-ink p-9 transition-colors duration-500 hover:bg-ink-800">
              <Icon name={s.icon} className="h-7 w-7 text-gold" strokeWidth={1} />
              <h3 className="mt-6 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-sand-muted">{s.desc}</p>
              <Icon name="arrow" className="mt-6 h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          ))}
        </section>
      </main>

      <Footer />

      <Modal open={modalActivo !== null} onClose={() => setModalActivo(null)} title={modalTitle}>
        {modalActivo?.tipo === "detalles" && (
          <dl className="divide-y divide-white/10 border-y border-white/10 text-sm">
            {[
              ["Habitación", modalActivo.reserva.habitacion?.titulo || modalActivo.reserva.tipo],
              ["Huésped", modalActivo.reserva.nombre],
              ["Llegada", formatDate(modalActivo.reserva.fechaInicio)],
              ["Salida", formatDate(modalActivo.reserva.fechaFin)],
              ["Duración", `${daysBetween(modalActivo.reserva.fechaInicio, modalActivo.reserva.fechaFin)} noches`],
              ["Estado", RESERVATION_STATE_LABELS[modalActivo.reserva.estado] ?? modalActivo.reserva.estado],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3">
                <dt className="text-sand-dim">{k}</dt>
                <dd className="text-right text-white">{v}</dd>
              </div>
            ))}
          </dl>
        )}

        {modalActivo?.tipo === "modificar" && (
          <>
            <p className="leading-relaxed text-sand-muted">
              Para cambiar fechas o habitación, contacta a nuestro equipo de reservas. Gestionaremos el cambio según
              disponibilidad.
            </p>
            <div className="mt-6 space-y-3 border border-white/10 p-5 text-sm">
              <p className="flex items-center gap-3 text-sand">
                <Icon name="phone" className="h-4 w-4 text-gold" /> +57 601 555 0101
              </p>
              <p className="flex items-center gap-3 text-sand">
                <Icon name="mail" className="h-4 w-4 text-gold" /> reservas@hotelbooking.com
              </p>
            </div>
          </>
        )}

        {modalActivo?.tipo === "cancelar" && (
          <>
            <p className="leading-relaxed text-sand-muted">
              ¿Deseas cancelar esta reserva? La cancelación se procesará según nuestra política vigente.
            </p>
            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
          </>
        )}

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setModalActivo(null)} className="btn-outline !px-5 !py-2.5">
            {modalActivo?.tipo === "detalles" ? "Cerrar" : "Volver"}
          </button>
          {modalActivo?.tipo === "cancelar" && (
            <button
              onClick={() => handleCancelar(modalActivo.reserva)}
              disabled={cancelando}
              className="btn-danger !px-5 !py-2.5"
            >
              {cancelando ? "Cancelando..." : "Confirmar cancelación"}
            </button>
          )}
        </div>
      </Modal>
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
