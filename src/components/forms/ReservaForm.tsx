"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";
import GoogleMark from "@/components/ui/GoogleMark";
import { ReservaFormProps } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import { useReservaContext } from "@/context/ReservaContext";
import { signInWithGoogle } from "@/lib/api/auth";
import { validateDateRange, validateFutureDate, validateName } from "@/lib/utils/validators";
import { ROOM_TYPE_LABELS, ROOM_TYPES } from "@/lib/utils/constants";
import { formatPrice } from "@/lib/utils/formatters";
import { daysBetween } from "@/lib/utils/dateHelpers";

export default function ReservaForm({
  open,
  onClose,
  habitacion,
  fechaInicioInicial = "",
  fechaFinInicial = "",
}: ReservaFormProps) {
  const { user, loading: authLoading } = useAuthContext();
  const { crear, loading: creando, error: reservaError } = useReservaContext();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(fechaInicioInicial);
  const [fechaFin, setFechaFin] = useState(fechaFinInicial);
  const [confirmado, setConfirmado] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const noches = fechaInicio && fechaFin && validateDateRange(fechaInicio, fechaFin) ? daysBetween(fechaInicio, fechaFin) : 0;

  const handleGoogleLogin = async () => {
    await signInWithGoogle(window.location.href);
  };

  const handleClose = () => {
    setFormError(null);
    setConfirmado(false);
    onClose();
  };

  const resetForm = () => {
    setNombre("");
    setTipo("");
    setFechaInicio("");
    setFechaFin("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateName(nombre)) {
      setFormError("Ingresa tu nombre completo (mínimo 2 caracteres).");
      return;
    }
    if (!habitacion && !tipo) {
      setFormError("Selecciona un tipo de habitación.");
      return;
    }
    if (!validateFutureDate(fechaInicio)) {
      setFormError("La fecha de entrada no puede ser en el pasado.");
      return;
    }
    if (!validateDateRange(fechaInicio, fechaFin)) {
      setFormError("La fecha de salida debe ser posterior a la de entrada.");
      return;
    }

    const ok = await crear({
      usuarioId: user!.id,
      habitacionId: habitacion?.id ?? null,
      nombre,
      tipo: habitacion?.tipo ?? tipo,
      fechaInicio,
      fechaFin,
      estado: "pendiente",
    });

    if (ok) {
      setConfirmado(true);
      setTimeout(() => {
        resetForm();
        handleClose();
      }, 2200);
    } else {
      setFormError(reservaError || "No se pudo crear la reserva. Intenta nuevamente.");
    }
  };

  if (authLoading) {
    return (
      <Modal open={open} onClose={handleClose} title="Un momento">
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border border-gold/30 border-t-gold" />
        </div>
      </Modal>
    );
  }

  if (!user) {
    return (
      <Modal open={open} onClose={handleClose} title="Inicia sesión para reservar">
        <p className="leading-relaxed text-sand-muted">
          Accede con tu cuenta para confirmar la disponibilidad y gestionar tus estancias desde un único lugar.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="mt-8 flex w-full items-center justify-center gap-3 border border-white/15 bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-sand"
        >
          <GoogleMark />
          Continuar con Google
        </button>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-sand-dim">
          <Icon name="shield" className="h-3.5 w-3.5" />
          Acceso seguro. No compartimos tus datos.
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} title={confirmado ? "Solicitud recibida" : "Reserva tu estancia"}>
      {!confirmado ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <p className="-mt-2 text-sm text-sand-muted">
            Reservando como <span className="text-white">{user.email}</span>
          </p>

          <Input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y apellido"
            label="Nombre completo"
          />

          {habitacion ? (
            <div className="flex items-center justify-between border border-gold/25 bg-gold/[0.04] px-5 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-sand-dim">Habitación</p>
                <p className="mt-1 font-display text-xl text-white">{habitacion.titulo}</p>
              </div>
              <p className="text-right text-sm text-gold">
                {formatPrice(habitacion.precio)}
                <span className="block text-[10px] uppercase tracking-[0.15em] text-sand-dim">por noche</span>
              </p>
            </div>
          ) : (
            <div>
              <label htmlFor="reserva-tipo" className="field-label">
                Tipo de habitación
              </label>
              <select
                id="reserva-tipo"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="field bg-ink-800"
              >
                <option value="">Selecciona</option>
                {Object.values(ROOM_TYPES).map((value) => (
                  <option key={value} value={value}>
                    {ROOM_TYPE_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input type="date" required value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} label="Llegada" />
            <Input type="date" required value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} label="Salida" />
          </div>

          {habitacion && noches > 0 && (
            <div className="flex items-baseline justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-sand-muted">
                {noches} {noches === 1 ? "noche" : "noches"} × {formatPrice(habitacion.precio)}
              </span>
              <span className="font-display text-2xl text-white">{formatPrice(noches * habitacion.precio)}</span>
            </div>
          )}

          {formError && <p className="text-sm text-red-300">{formError}</p>}

          <Button type="submit" variant="primary" fullWidth disabled={creando}>
            {creando ? "Reservando..." : "Confirmar reserva"}
          </Button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold">
            <Icon name="check" className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-lg text-white">Tu reserva quedó registrada.</p>
          <p className="mt-2 text-sm text-sand-muted">Te enviaremos la confirmación por correo electrónico.</p>
        </motion.div>
      )}
    </Modal>
  );
}
