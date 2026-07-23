"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ReservaFormProps } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import { useReservaContext } from "@/context/ReservaContext";
import { signInWithGoogle } from "@/lib/api/auth";
import { validateDateRange, validateFutureDate, validateName } from "@/lib/utils/validators";
import { ROOM_TYPE_LABELS, ROOM_TYPES } from "@/lib/utils/constants";

export default function ReservaForm({ open, onClose, habitacion }: ReservaFormProps) {
  const { user, loading: authLoading } = useAuthContext();
  const { crear, loading: creando, error: reservaError } = useReservaContext();
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [confirmado, setConfirmado] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
      }, 2000);
    } else {
      setFormError(reservaError || "No se pudo crear la reserva. Intenta nuevamente.");
    }
  };

  // Loading de autenticación
  if (authLoading) {
    return (
      <Modal open={open} onClose={handleClose} title="Cargando...">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </Modal>
    );
  }

  // Usuario no autenticado - mostrar login con Google
  if (!user) {
    return (
      <Modal open={open} onClose={handleClose} title="Inicia sesión para reservar">
        <div className="text-center py-4">
          <div className="text-5xl mb-4">🔐</div>
          <p className="text-gray-600 mb-6">
            Para hacer una reserva, necesitas iniciar sesión con tu cuenta de Google.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          <p className="text-gray-400 text-xs mt-4">
            Al iniciar sesión, aceptas nuestros términos y condiciones.
          </p>
        </div>
      </Modal>
    );
  }

  // Usuario autenticado - mostrar formulario
  return (
    <Modal open={open} onClose={handleClose} title="Reserva tu habitación">
      {!confirmado ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-700">
          <p className="text-sm text-gray-500 mb-2">
            Reservando como: <span className="font-medium text-gray-700">{user.email}</span>
          </p>

          <Input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            label="Nombre completo"
          />

          {habitacion ? (
            <div className="rounded-lg border border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-1">Habitación seleccionada</p>
              <p className="font-semibold">{habitacion.titulo}</p>
              <p className="text-sm text-amber-600">${habitacion.precio}/noche</p>
            </div>
          ) : (
            <div>
              <label className="block font-medium mb-1">Tipo de habitación</label>
              <select
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            <Input
              type="date"
              required
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              label="Entrada"
            />
            <Input
              type="date"
              required
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              label="Salida"
            />
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <Button type="submit" variant="primary" fullWidth disabled={creando}>
            {creando ? "Reservando..." : "Confirmar Reserva"}
          </Button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="text-4xl mb-3">✅</div>
          <p className="text-green-600 font-semibold text-lg">¡Reserva confirmada!</p>
          <p className="text-gray-500 text-sm mt-2">Te enviaremos un correo de confirmación.</p>
        </motion.div>
      )}
    </Modal>
  );
}
