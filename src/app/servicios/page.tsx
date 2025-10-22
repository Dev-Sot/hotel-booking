import Image from "next/image";

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const servicios: Servicio[] = [
  {
    id: 1,
    nombre: "Spa & Relax",
    descripcion: "Disfruta de masajes y tratamientos exclusivos para tu bienestar.",
    imagen: "/spa.jpg",
  },
  {
    id: 2,
    nombre: "Gastronomía Gourmet",
    descripcion: "Restaurante de alta cocina con menú internacional y local.",
    imagen: "/restaurant.jpg",
  },
  {
    id: 3,
    nombre: "Gimnasio & Fitness",
    descripcion: "Equipo moderno y clases dirigidas para mantener tu rutina.",
    imagen: "/gym.jpg",
  },
  {
    id: 4,
    nombre: "Transporte Premium",
    descripcion: "Servicio privado de traslado al aeropuerto y tours locales.",
    imagen: "/transporte.jpg",
  },
];

export default function ServiciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Nuestros Servicios
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {servicios.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-1"
          >
            <div className="relative h-48 w-full">
              <Image
                src={s.imagen}
                alt={s.nombre}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <h2 className="text-xl font-semibold text-blue-700">{s.nombre}</h2>
              <p className="text-gray-600 text-sm">{s.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
