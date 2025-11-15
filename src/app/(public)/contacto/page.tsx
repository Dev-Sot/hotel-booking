"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    // Simular envío
    setTimeout(() => {
      setEnviado(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
      setCargando(false);

      // Resetear mensaje después de 5 segundos
      setTimeout(() => setEnviado(false), 5000);
    }, 1500);
  };

  const canSubmit =
    formData.nombre &&
    formData.email &&
    formData.telefono &&
    formData.asunto &&
    formData.mensaje;

  return (
    <div className="min-h-screen bg-[#06070a] text-white">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">Contacto</h1>
            <p className="text-xl text-gray-300">
              ¿Tienes preguntas? Nos encantaría saber de ti. Contáctanos y te responderemos lo más pronto posible.
            </p>
          </motion.div>
        </section>

        {/* Contenido principal */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/2 rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>

                {enviado && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300"
                  >
                    ✓ Mensaje enviado exitosamente. Te contactaremos pronto.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Asunto *
                    </label>
                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:outline-none transition"
                      required
                    >
                      <option value="">-- Selecciona un asunto --</option>
                      <option value="reserva">Consulta sobre reserva</option>
                      <option value="habitacion">Información de habitaciones</option>
                      <option value="servicios">Preguntas sobre servicios</option>
                      <option value="evento">Organizar un evento</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos qué necesitas..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition resize-none"
                      required
                    />
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={!canSubmit || cargando}
                    className={`w-full py-3 rounded-lg font-semibold transition transform ${
                      canSubmit && !cargando
                        ? "bg-amber-600 hover:bg-amber-700 text-white hover:scale-105 shadow-lg"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {cargando ? "Enviando..." : "Enviar Mensaje"}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-6 border border-amber-500/20">
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-semibold text-white mb-2">Ubicación</h3>
                <p className="text-gray-400 text-sm">
                  Carrera 5 #120-45<br />
                  Bogotá, Colombia
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-6 border border-blue-500/20">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-semibold text-white mb-2">Teléfono</h3>
                <p className="text-gray-400 text-sm">
                  <strong>Recepción:</strong> +1 (555) 123-4567<br />
                  <strong>Reservas:</strong> +1 (555) 987-6543<br />
                  <strong>Emergencias:</strong> +1 (555) 111-2222
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-6 border border-green-500/20">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-400 text-sm break-all">
                  <strong>General:</strong> info@hotelcolina.com<br />
                  <strong>Reservas:</strong> reservas@hotelcolina.com<br />
                  <strong>Eventos:</strong> eventos@hotelcolina.com
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl p-6 border border-purple-500/20">
                <div className="text-3xl mb-3">🕐</div>
                <h3 className="font-semibold text-white mb-2">Horario de Atención</h3>
                <p className="text-gray-400 text-sm">
                  <strong>Lunes - Viernes:</strong> 9:00 - 18:00<br />
                  <strong>Sábado:</strong> 10:00 - 16:00<br />
                  <strong>Domingo:</strong> Cerrado<br />
                  <strong>Emergencias 24/7:</strong> Siempre disponibles
                </p>
              </div>

              {/* Redes Sociales */}
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-2xl p-6 border border-red-500/20">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-white mb-3">Síguenos</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg text-sm font-medium transition">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-sky-600/20 hover:bg-sky-600/40 text-sky-300 rounded-lg text-sm font-medium transition">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 rounded-lg text-sm font-medium transition">
                    Instagram
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mapa */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Encuéntranos</h2>
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8434234234234!2d-74.07611232343243!3d4.710988971234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a2c7b6c7b6%3A0x1234567890abcdef!2sHotel%20Colina%20Campestre!5e0!3m2!1ses!2sco!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
