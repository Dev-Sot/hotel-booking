"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReservaForm from "@/components/forms/ReservaForm";
import Navbar from "@/components/shared/Navbar";


export default function Home() {
  const [openReserva, setOpenReserva] = useState(false);

  return (
    <div className="text-gray-100">
      {/* HERO: video full-bleed */}
      <header className="relative h-screen min-h-[720px]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 max-w-6xl mx-auto h-full px-6 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-3/5"
          >
            <p className="text-sm tracking-widest text-gray-300 mb-4">EXPERIENCE · EXCLUSIVITY · COMFORT</p>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-white">
              Hotel Booking
            </h1>

            <p className="mt-6 text-gray-200 max-w-xl">
              Escapa a una experiencia nocturna de lujo: habitaciones premium, servicios exclusivos y atención personalizada. Reserva ahora y asegura la mejor estancia.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setOpenReserva(true)}
                className="bg-amber-500/95 hover:bg-amber-500 text-gray-900 font-medium px-6 py-3 rounded-lg shadow-md transition"
                aria-label="Reservar ahora"
              >
                Reservar ahora
              </button>

              <a
                href="#habitaciones"
                className="border border-gray-300 text-gray-200 px-6 py-3 rounded-lg hover:bg-white/5 transition"
              >
                Ver habitaciones
              </a>
            </div>
          </motion.div>
        </div>

        {/* subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        <Navbar />


      </header>

      <main className="bg-[#06070a]">
        {/* Habitaciones */}
        <section id="habitaciones" className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl text-white font-semibold text-center mb-8"
          >
            Habitaciones destacadas
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Suite Presidencial",
                desc: "Amplia suite con vista panorámica, cama king y salón privado.",
                price: 950,
                img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80",
              },
              {
                title: "Suite Deluxe",
                desc: "Diseño contemporáneo, balcón y servicios premium.",
                price: 620,
                img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
              },
              {
                title: "Doble Ejecutiva",
                desc: "Cómoda, funcional y perfecta para viajes de negocios.",
                price: 420,
                img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80",
              },
            ].map((room) => (
              <motion.article
                key={room.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <div className="relative h-56 w-full">
                  <img
                    src={room.img}
                    alt={room.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{room.title}</h3>
                  <p className="mt-2 text-gray-300 text-sm">{room.desc}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-white font-semibold">${room.price} / noche</div>
                    <button
                      onClick={() => setOpenReserva(true)}
                      className="bg-amber-500/95 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Servicios */}
        <section className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl text-white font-semibold text-center mb-8"
            >
              Servicios premium
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Spa & Wellness",
                  desc: "Tratamientos personalizados y circuito de relajación.",
                },
                {
                  title: "Gastronomía",
                  desc: "Restaurante de autor con menú degustación y carta selecta.",
                },
                {
                  title: "Eventos y reuniones",
                  desc: "Salones equipados para eventos corporativos y celebraciones.",
                },
              ].map((s) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 rounded-2xl p-6 shadow hover:shadow-2xl transition"
                >
                  <h4 className="text-xl text-white font-semibold">{s.title}</h4>
                  <p className="mt-2 text-gray-300 text-sm">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto / Footer CTA */}
        <section id="contacto" className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl text-white font-semibold mb-4">
                Contacto y reservas directas
              </h3>
              <p className="text-gray-300 mb-4">
                Nuestro equipo está disponible para ayudarte con solicitudes especiales, reservas de grupo y eventos privados.
              </p>
              <p className="text-gray-400 text-sm">Tel: +57 300 000 0000</p>
              <p className="text-gray-400 text-sm">Correo: reservas@hotelbooking.com</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <form className="space-y-4">
                <input className="w-full p-3 rounded border border-white/10 bg-transparent text-white" placeholder="Nombre" />
                <input className="w-full p-3 rounded border border-white/10 bg-transparent text-white" placeholder="Correo" />
                <textarea className="w-full p-3 rounded border border-white/10 bg-transparent text-white" rows={4} placeholder="Mensaje" />
                <button className="bg-amber-500/95 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded font-medium">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Hotel Booking — Todos los derechos reservados.
          </div>
        </footer>
      </main>

      {/* ReservaForm: componente movido a src/components/forms */}
      <ReservaForm open={openReserva} onClose={() => setOpenReserva(false)} />
    </div>
  );
}