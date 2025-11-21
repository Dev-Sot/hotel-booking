"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";

export default function ServiciosPage() {
  const servicios = [
    {
      title: "Spa & Wellness",
      desc: "Relajación total con masajes personalizados, sauna, jacuzzi y tratamientos holísticos.",
      icon: "🧖",
    },
    {
      title: "Restaurante Gourmet",
      desc: "Cocina internacional de alta categoría con chef estrella Michelin. Servicio 24/7.",
      icon: "🍽️",
    },
    {
      title: "Gym Premium",
      desc: "Equipamiento moderno, entrenador personal disponible y clases de yoga y pilates.",
      icon: "💪",
    },
    {
      title: "Piscina Olímpica",
      desc: "Piscina climatizada con barra de cócteles, zona infantil y servicio de sombrillas.",
      icon: "🏊",
    },
    {
      title: "Concierge VIP",
      desc: "Asistencia 24/7 para reservas, tours, transportes y experiencias personalizadas.",
      icon: "🎩",
    },
    {
      title: "Cine Privado",
      desc: "Sala de cine con la mejor tecnología, snacks gourmet y dulces caseros.",
      icon: "🎬",
    },
    {
      title: "Business Center",
      desc: "Sala de reuniones completamente equipada, internet 5G y servicios administrativos.",
      icon: "💼",
    },
    {
      title: "Servicio de Limousina",
      desc: "Transporte lujoso hacia aeropuerto, restaurantes y lugares de interés.",
      icon: "🚗",
    },
    {
      title: "Guardería Infantil",
      desc: "Cuidado profesional para niños con actividades educativas y recreativas.",
      icon: "👶",
    },
    {
      title: "Biblioteca & Zona Lectura",
      desc: "Miles de libros, ambiente tranquilo con chimenea y café premium.",
      icon: "📚",
    },
    {
      title: "Eventos & Conferencias",
      desc: "Salones equipados para bodas, congresos y reuniones corporativas.",
      icon: "🎊",
    },
    {
      title: "Tienda de Artículos de Lujo",
      desc: "Compras exclusivas de marcas internacionales y artículos de regalo premium.",
      icon: "🛍️",
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
            <h1 className="text-5xl font-bold mb-4">Servicios Premium</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Nuestro hotel ofrece una amplia gama de servicios diseñados para hacer tu estancia memorable. Desde bienestar hasta entretenimiento, tenemos todo para ti.
            </p>
          </motion.div>
        </section>

        {/* Grid de Servicios */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio, idx) => (
              <motion.article
                key={servicio.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                <div className="text-5xl mb-4">{servicio.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">{servicio.title}</h3>
                <p className="text-gray-300">{servicio.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Sección de Contacto */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">¿Necesitas un servicio personalizado?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de concierge está disponible 24/7 para ayudarte con cualquier solicitud especial. No dudes en contactarnos.
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-8 py-3 rounded-lg font-semibold transition">
              Contactar Concierge
            </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
