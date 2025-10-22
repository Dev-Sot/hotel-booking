import Image from "next/image";

const habitaciones = [
  { id: 1, nombre: "Suite Presidencial", capacidad: 4, precio: 950000 },
  { id: 2, nombre: "Suite Deluxe", capacidad: 3, precio: 620000 },
  { id: 3, nombre: "Habitación Doble Ejecutiva", capacidad: 2, precio: 420000 },
];

const reservas = [
  { id: 1, cliente: "Juan Pérez", habitacion: "Suite Presidencial", desde: "2025-10-22", hasta: "2025-10-24" },
  { id: 2, cliente: "María López", habitacion: "Suite Deluxe", desde: "2025-10-23", hasta: "2025-10-25" },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Panel de Administración
      </h1>

      {/* Habitaciones */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Habitaciones</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {habitaciones.map((h) => (
            <div key={h.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-blue-700">{h.nombre}</h3>
              <p>Capacidad: {h.capacidad} personas</p>
              <p>Precio: ${h.precio.toLocaleString("es-CO")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reservas */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Reservas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reservas.map((r) => (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
              <h3 className="text-lg font-semibold text-gray-800">{r.cliente}</h3>
              <p>Habitación: {r.habitacion}</p>
              <p>Desde: {r.desde}</p>
              <p>Hasta: {r.hasta}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
