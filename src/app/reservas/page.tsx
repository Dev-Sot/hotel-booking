"use client";

import { useState, useEffect } from "react";

const habitaciones = [
  { id: 1, nombre: "Suite Presidencial" },
  { id: 2, nombre: "Suite Deluxe" },
  { id: 3, nombre: "Habitación Doble Ejecutiva" },
];

export default function ReservasPage() {
  const [habitacion, setHabitacion] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [error, setError] = useState("");
  const [resumen, setResumen] = useState("");

  useEffect(() => {
    if (habitacion && fechaEntrada && fechaSalida) {
      const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);

      if (salida <= entrada) {
        setError("La fecha de salida debe ser posterior a la fecha de entrada");
        setResumen("");
      } else {
        setError("");
        setResumen(
          `Reserva: ${habitacion} del ${entrada.toLocaleDateString()} al ${salida.toLocaleDateString()}`
        );
      }
    } else {
      setResumen("");
      setError("");
    }
  }, [habitacion, fechaEntrada, fechaSalida]);

  const handleReservar = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    alert(resumen || "Complete los datos para reservar");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Realizar Reserva
      </h1>

      <form
        onSubmit={handleReservar}
        className="bg-white p-10 rounded-3xl shadow-2xl space-y-8"
      >
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Selecciona habitación
          </label>
          <select
            value={habitacion}
            onChange={(e) => setHabitacion(e.target.value)}
            className="w-full border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Escoge una habitación --</option>
            {habitaciones.map((h) => (
              <option key={h.id} value={h.nombre}>
                {h.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Fecha de entrada
            </label>
            <input
              type="date"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
              className="w-full border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Fecha de salida
            </label>
            <input
              type="date"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              className="w-full border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-600 font-medium">{error}</p>}
        {resumen && <p className="text-gray-700 font-semibold">{resumen}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition"
        >
          Confirmar reserva
        </button>
      </form>
    </div>
  );
}
