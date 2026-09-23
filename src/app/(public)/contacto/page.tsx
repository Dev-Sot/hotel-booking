"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import Icon, { IconName } from "@/components/ui/Icon";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const EMPTY: FormData = { nombre: "", email: "", telefono: "", asunto: "", mensaje: "" };

const INFO: { icon: IconName; title: string; lines: [string, string][] }[] = [
  {
    icon: "location",
    title: "Dirección",
    lines: [["", "Carrera 5 #120-45"], ["", "Bogotá, Colombia"]],
  },
  {
    icon: "phone",
    title: "Teléfono",
    lines: [["Recepción", "+57 601 555 0100"], ["Reservas", "+57 601 555 0101"]],
  },
  {
    icon: "mail",
    title: "Correo",
    lines: [["Reservas", "reservas@hotelbooking.com"], ["Eventos", "eventos@hotelbooking.com"]],
  },
  {
    icon: "clock",
    title: "Atención",
    lines: [["Recepción", "24 horas"], ["Reservas", "Lun a Sáb, 8:00 – 20:00"]],
  },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>(EMPTY);
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    // Simular envío (pendiente: endpoint real, ver Roadmap del README)
    setTimeout(() => {
      setEnviado(true);
      setFormData(EMPTY);
      setCargando(false);
      setTimeout(() => setEnviado(false), 5000);
    }, 1200);
  };

  const canSubmit = Object.values(formData).every(Boolean);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <PageHero
        eyebrow="Contacto"
        title="Contacto"
        image="/habitacion3.jpg"
        description="Nuestro equipo te acompaña antes, durante y después de tu estancia. Escríbenos y te responderemos en menos de 24 horas."
      />

      <main className="container-site pb-28 pt-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="border border-white/10 bg-ink-800 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl">Envíanos un mensaje</h2>
              <p className="mt-3 text-sm text-sand-muted">Todos los campos son obligatorios.</p>

              {enviado && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="mt-8 flex items-center gap-3 border border-gold/40 bg-gold/[0.06] px-5 py-4 text-sm text-gold-100"
                >
                  <Icon name="check" className="h-4 w-4 text-gold" strokeWidth={1.75} />
                  Mensaje enviado. Te contactaremos muy pronto.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="mt-10 grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="c-nombre" className="field-label">Nombre completo</label>
                  <input id="c-nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" className="field" required />
                </div>
                <div>
                  <label htmlFor="c-email" className="field-label">Correo electrónico</label>
                  <input id="c-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" className="field" required />
                </div>
                <div>
                  <label htmlFor="c-tel" className="field-label">Teléfono</label>
                  <input id="c-tel" type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="+57 300 000 0000" className="field" required />
                </div>
                <div>
                  <label htmlFor="c-asunto" className="field-label">Asunto</label>
                  <select id="c-asunto" name="asunto" value={formData.asunto} onChange={handleChange} className="field bg-ink-800" required>
                    <option value="">Selecciona un asunto</option>
                    <option value="reserva">Consulta sobre reserva</option>
                    <option value="habitacion">Información de habitaciones</option>
                    <option value="servicios">Preguntas sobre servicios</option>
                    <option value="evento">Organizar un evento</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="c-mensaje" className="field-label">Mensaje</label>
                  <textarea id="c-mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos qué necesitas" rows={5} className="field resize-none" required />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={!canSubmit || cargando} className="btn-gold w-full md:w-auto">
                    {cargando ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {INFO.map((item) => (
                <li key={item.title} className="flex gap-6 py-8">
                  <Icon name={item.icon} className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1} />
                  <div>
                    <h3 className="text-xl">{item.title}</h3>
                    <dl className="mt-3 space-y-1.5 text-sm">
                      {item.lines.map(([k, v]) => (
                        <div key={v} className="flex flex-wrap gap-x-2">
                          {k && <dt className="text-sand-dim">{k}:</dt>}
                          <dd className="break-all text-sand">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-24">
          <div className="flex items-center gap-4">
            <span className="hairline" />
            <p className="eyebrow">Ubicación</p>
          </div>
          <h2 className="mt-5 text-4xl">Encuéntranos</h2>
          <div className="mt-10 h-[420px] overflow-hidden border border-white/10">
            <iframe
              title="Mapa de ubicación del hotel"
              src="https://www.google.com/maps?q=Carrera+5+%23120-45,+Bogot%C3%A1,+Colombia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
