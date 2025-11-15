"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface ReservaFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ReservaForm({ open, onClose }: ReservaFormProps) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmado(true);
    setTimeout(() => {
      setConfirmado(false);
      onClose();
      setNombre("");
      setTipo("");
      setFechaInicio("");
      setFechaFin("");
    }, 2000);
  };

  return (
    <Modal open={open} onClose={onClose} title="Reserva tu habitación">
      {!confirmado ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-700">
          <Input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            label="Nombre completo"
          />

          <div>
            <label className="block font-medium mb-1">Tipo de habitación</label>
            <select
              required
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Selecciona</option>
              <option value="suite">Suite Presidencial</option>
              <option value="doble">Doble Deluxe</option>
              <option value="sencilla">Sencilla Ejecutiva</option>
            </select>
          </div>

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

          <Button type="submit" variant="primary" fullWidth>
            Reservar
          </Button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-green-600 font-semibold">¡Reserva confirmada!</p>
        </motion.div>
      )}
    </Modal>
  );
}