"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalReservaProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalReserva({ open, onClose }: ModalReservaProps) {
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
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {!confirmado ? (
              <>
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  Reserva tu habitación
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 text-gray-700"
                >
                  <div>
                    <label className="block font-medium">Nombre completo</label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-medium">
                      Tipo de habitación
                    </label>
                    <select
                      required
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecciona</option>
                      <option value="suite">Suite Presidencial</option>
                      <option value="doble">Doble Deluxe</option>
                      <option value="sencilla">Sencilla Ejecutiva</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium">
                        Fecha de entrada
                      </label>
                      <input
                        type="date"
                        required
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">
                        Fecha de salida
                      </label>
                      <input
                        type="date"
                        required
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mt-4"
                  >
                    Confirmar Reserva
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-2xl font-semibold text-green-600">
                  Reserva Confirmada
                </h3>
                <p className="text-gray-600 mt-2">
                  Gracias, {nombre}. Tu reserva fue procesada con éxito.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
