import Image from "next/image";

interface Habitacion {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  capacidad: number;
  servicios: string[];
  imagen: string;
}

const habitaciones: Habitacion[] = [
  {
    id: 1,
    nombre: "Suite Presidencial",
    descripcion:
      "Lujo absoluto con vista panorámica, jacuzzi privado y servicio 24 horas.",
    precio: 950000,
    capacidad: 4,
    servicios: ["Jacuzzi", "Wi-Fi Premium", "Desayuno buffet", "Balcón privado"],
    imagen: "/habitacion1.jpg",
  },
  {
    id: 2,
    nombre: "Suite Deluxe",
    descripcion:
      "Diseño moderno, amplio espacio y comodidad total para tu estadía.",
    precio: 620000,
    capacidad: 3,
    servicios: ["TV 4K", "Wi-Fi", "Mini bar", "Aire acondicionado"],
    imagen: "/habitacion2.jpg",
  },
  {
    id: 3,
    nombre: "Habitación Doble Ejecutiva",
    descripcion:
      "Perfecta para viajes de negocios o escapadas en pareja.",
    precio: 420000,
    capacidad: 2,
    servicios: ["Wi-Fi", "Escritorio", "Desayuno incluido", "Vista a la ciudad"],
    imagen: "/habitacion3.jpg",
  },
];

export default function HabitacionesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Habitaciones Disponibles
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {habitaciones.map((hab) => (
          <div
            key={hab.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            <div className="relative h-64 w-full">
              <Image
                src={hab.imagen}
                alt={hab.nombre}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-semibold text-blue-700">{hab.nombre}</h2>
              <p className="text-gray-600 text-sm">{hab.descripcion}</p>

              <div className="flex justify-between text-gray-800 font-medium">
                <span>👥 {hab.capacidad} personas</span>
                <span className="text-blue-600 font-bold">
                  ${hab.precio.toLocaleString("es-CO")}
                </span>
              </div>

              <ul className="text-sm text-gray-500 space-y-1 mt-3">
                {hab.servicios.map((servicio, index) => (
                  <li key={index}>• {servicio}</li>
                ))}
              </ul>

              <a
                href={`/reservas?id=${hab.id}`}
                className="block w-full mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Reservar ahora
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
