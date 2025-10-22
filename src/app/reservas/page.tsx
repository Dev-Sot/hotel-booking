"use client";

import { useState } from "react";

const habitaciones = [
  { id: 1, nombre: "Suite Presidencial" },
  { id: 2, nombre: "Suite Deluxe" },
  { id: 3, nombre: "Habitación Doble Ejecutiva" },
];

export default function ReservasPage() {
  const [habitacion, setHabitacion] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");

  const handleReservar = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Has reservado la habitación ${habitacion} del ${fechaEntrada} al ${fechaSalida}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Realizar Reserva
      </h1>

      <form
        onSubmit={handleReservar}
        className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Selecciona habitación
          </label>
          <select
            value={habitacion}
            onChange={(e) => setHabitacion(e.target.value)}
            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
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
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Confirmar reserva
        </button>
      </form>
    </div>
  );
}
