"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReservaForm from "@/components/forms/ReservaForm";
import Navbar from "@/components/shared/Navbar";

export default function HabitacionesPage() {
  const [openReserva, setOpenReserva] = useState(false);

  const habitaciones = [
    {
      title: "Suite Presidencial",
      desc: "Amplia suite con vista panorámica, cama king y salón privado. Incluye minibar, jacuzzi privado y servicio de mayordomo 24/7.",
      price: 950,
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
      amenities: ["Cama King", "Vista Panorámica", "Jacuzzi Privado", "Mayordomo 24/7", "Minibar Premium"],
    },
    {
      title: "Suite Deluxe",
      desc: "Diseño contemporáneo, balcón y servicios premium. Baño con ducha de lluvia, área de trabajo y acceso a zona VIP.",
      price: 620,
      img: "https://images.unsplash.com/photo-1501117716987-c8e5b1f1d4e4?auto=format&fit=crop&w=1400&q=80",
      amenities: ["Cama Queen", "Balcón", "Ducha de Lluvia", "Área de Trabajo", "Acceso VIP"],
    },
    {
      title: "Doble Ejecutiva",
      desc: "Cómoda, funcional y perfecta para viajes de negocios. Escritorio completo, conexión internet de alta velocidad y sala de reuniones accesible.",
      price: 420,
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
      amenities: ["Cama Doble", "Escritorio", "Internet 5G", "Sala de Reuniones", "TV Inteligente"],
    },
    {
      title: "Suite Junior",
      desc: "Perfecta para parejas o viajeros individuales. Sofá cama, pequeña sala y acceso a piscina.",
      price: 380,
      img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
      amenities: ["Cama Queen", "Sofá Cama", "Acceso Piscina", "Minibar", "Balcón"],
    },
    {
      title: "Habitación Estándar",
      desc: "Cómoda y económica para viajeros que buscan calidad sin lujos excesivos.",
      price: 250,
      img: "https://images.unsplash.com/photo-1521132573892-7c67fb4ce338?auto=format&fit=crop&w=1400&q=80",
      amenities: ["Cama Twin/Queen", "Baño Completo", "TV", "Wi-Fi", "Aire Acondicionado"],
    },
    {
      title: "Suite Romántica",
      desc: "Diseñada para parejas. Decoración romántica, jacuzzi y champagne de bienvenida.",
      price: 550,
      img: "https://images.unsplash.com/photo-1587612881519-e21cc028cb29?auto=format&fit=crop&w=1400&q=80",
      amenities: ["Cama King", "Jacuzzi", "Champagne", "Pétalos de Rosa", "Música Ambiente"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#06070a] text-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">Nuestras Habitaciones</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Descubre nuestra variedad de habitaciones diseñadas para ofrecer confort, lujo y experiencias inolvidables. Cada espacio está pensado para tu comodidad.
            </p>
          </motion.div>
        </section>

        {/* Grid de Habitaciones */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {habitaciones.map((room, idx) => (
              <motion.article
                key={room.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                {/* Imagen */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.title}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-amber-500 text-gray-900 px-4 py-2 rounded-full font-bold">
                    ${room.price}/noche
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">{room.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{room.desc}</p>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">Amenities:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity) => (
                        <li key={amenity} className="text-xs text-gray-300 flex items-center">
                          <span className="w-1 h-1 bg-amber-500 rounded-full mr-2" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Botón */}
                  <button
                    onClick={() => setOpenReserva(true)}
                    className="w-full bg-amber-500/95 hover:bg-amber-500 text-gray-900 px-4 py-3 rounded-lg font-semibold transition"
                  >
                    Reservar Ahora
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      {/* Modal de Reserva */}
      <ReservaForm open={openReserva} onClose={() => setOpenReserva(false)} />
    </div>
  );
}
