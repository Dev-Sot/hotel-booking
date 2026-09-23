"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReservaForm from "@/components/forms/ReservaForm";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import Icon from "@/components/ui/Icon";
import { getHabitaciones } from "@/lib/api/habitaciones";
import { Habitacion } from "@/types";
import { formatPrice } from "@/lib/utils/formatters";
import { ROOM_TYPE_LABELS } from "@/lib/utils/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "48", label: "Suites y habitaciones" },
  { value: "24h", label: "Concierge privado" },
  { value: "3", label: "Restaurantes de autor" },
  { value: "1.200 m²", label: "Spa y bienestar" },
];

const EXPERIENCES = [
  {
    eyebrow: "Bienestar",
    title: "Spa & Wellness",
    desc: "Circuito de aguas termales, cabinas privadas y rituales diseñados a medida por nuestros terapeutas.",
    image: "/spa.jpg",
  },
  {
    eyebrow: "Gastronomía",
    title: "Cocina de autor",
    desc: "Menú degustación de temporada, bodega seleccionada y servicio en suite a cualquier hora.",
    image: "/restaurant.jpg",
  },
];

export default function Home() {
  const [openReserva, setOpenReserva] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [habitacionActiva, setHabitacionActiva] = useState<Habitacion | null>(null);
  const [destacadas, setDestacadas] = useState<Habitacion[]>([]);
  const [llegada, setLlegada] = useState("");
  const [salida, setSalida] = useState("");
  const [huespedes, setHuespedes] = useState("2");

  const abrirReserva = (room: Habitacion | null) => {
    setHabitacionActiva(room);
    setFormKey((k) => k + 1);
    setOpenReserva(true);
  };

  useEffect(() => {
    (async () => {
      const result = await getHabitaciones();
      if (result.success) setDestacadas((result.data || []).slice(0, 3));
    })();
  }, []);

  return (
    <div className="bg-ink">
      <Navbar />

      {/* HERO */}
      <header className="relative flex h-[100svh] min-h-[680px] items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/habitacion1.jpg"
          src="/videos/hero.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

        <div className="container-site relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <span className="hairline hidden sm:block" />
              <p className="eyebrow">Experience · Exclusivity · Comfort</p>
            </div>

            <h1 className="mt-8 text-[3.4rem] leading-[0.95] sm:text-7xl md:text-[6.5rem]">
              Hotel <em className="font-normal text-gold">Booking</em>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-sand/85 md:text-lg">
              Una residencia de lujo donde cada estancia se diseña a medida: suites con vistas abiertas,
              gastronomía de autor y un servicio que se anticipa a cada detalle.
            </p>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => abrirReserva(null)} className="btn-gold" aria-label="Reservar ahora">
                Reservar ahora
              </button>
              <a href="#habitaciones" className="btn-outline">
                Ver habitaciones
              </a>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#reserva"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-sand-muted md:flex"
        >
          Descubrir
          <span className="block h-12 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </motion.a>
      </header>

      <main>
        {/* BARRA DE RESERVA */}
        <section id="reserva" className="relative z-10 -mt-px border-y border-white/[0.06] bg-ink-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              abrirReserva(null);
            }}
            className="container-site grid gap-px py-6 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:gap-8 md:py-8"
          >
            <div>
              <label htmlFor="bar-llegada" className="field-label flex items-center gap-2">
                <Icon name="calendar" className="h-3.5 w-3.5 text-gold" /> Llegada
              </label>
              <input id="bar-llegada" type="date" value={llegada} onChange={(e) => setLlegada(e.target.value)} className="field" />
            </div>
            <div className="mt-4 md:mt-0">
              <label htmlFor="bar-salida" className="field-label flex items-center gap-2">
                <Icon name="calendar" className="h-3.5 w-3.5 text-gold" /> Salida
              </label>
              <input id="bar-salida" type="date" value={salida} onChange={(e) => setSalida(e.target.value)} className="field" />
            </div>
            <div className="mt-4 md:mt-0">
              <label htmlFor="bar-huespedes" className="field-label flex items-center gap-2">
                <Icon name="guests" className="h-3.5 w-3.5 text-gold" /> Huéspedes
              </label>
              <select id="bar-huespedes" value={huespedes} onChange={(e) => setHuespedes(e.target.value)} className="field bg-ink-800">
                {["1", "2", "3", "4"].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === "1" ? "adulto" : "adultos"}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-gold mt-6 md:mt-0 md:py-[15px]">
              Consultar disponibilidad
            </button>
          </form>
        </section>

        {/* INTRO */}
        <section className="container-site grid items-center gap-16 py-28 md:py-36 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="La residencia"
              title={
                <>
                  El lujo de no tener <em className="text-gold">que pedir nada</em>
                </>
              }
              description="Diseñamos cada estancia alrededor de quien nos visita. Desde la llegada hasta el último desayuno, nuestro equipo cuida los detalles para que solo tengas que disfrutar."
            />
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[11px] uppercase tracking-[0.18em] text-sand-dim">{s.label}</dt>
                  <dd className="font-display text-4xl text-white md:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src="/habitacion1.jpg" alt="Suite con zona de estar" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden w-56 border border-white/10 bg-ink-800 p-6 md:block">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 font-display text-lg leading-snug text-white">Categoría cinco estrellas</p>
            </div>
          </Reveal>
        </section>

        {/* HABITACIONES DESTACADAS */}
        <section id="habitaciones" className="border-t border-white/[0.06] bg-ink-800 py-28 md:py-36">
          <div className="container-site">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <Reveal>
                <SectionHeading
                  eyebrow="Habitaciones y suites"
                  title="Habitaciones destacadas"
                  description="Espacios amplios, materiales nobles y la luz justa para descansar de verdad."
                />
              </Reveal>
              <Reveal delay={0.1}>
                <Link href="/habitaciones" className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-gold">
                  Ver todas
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              {destacadas.map((room, i) => (
                <Reveal key={room.id} delay={i * 0.12}>
                  <article className="group">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={room.imagen}
                        alt={room.titulo}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.3em] text-sand">
                        {ROOM_TYPE_LABELS[room.tipo] ?? room.tipo}
                      </p>
                    </div>
                    <div className="pt-6">
                      <h3 className="text-2xl">{room.titulo}</h3>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-sand-muted">{room.descripcion}</p>
                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                        <p className="text-sm text-sand-muted">
                          Desde <span className="font-display text-xl text-white">{formatPrice(room.precio)}</span> / noche
                        </p>
                        <button
                          onClick={() => abrirReserva(room)}
                          className="link-underline text-[12px] uppercase tracking-[0.2em] text-gold"
                        >
                          Reservar
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCIAS */}
        <section className="py-28 md:py-36">
          <div className="container-site">
            <Reveal>
              <SectionHeading
                eyebrow="Experiencias"
                title="Servicios premium"
                description="Todo lo necesario para desconectar sin salir del hotel."
                align="center"
              />
            </Reveal>

            <div className="mt-20 space-y-24 md:space-y-32">
              {EXPERIENCES.map((exp, i) => (
                <div key={exp.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                  <Reveal className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image src={exp.image} alt={exp.title} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.12} className="md:col-span-5">
                    <p className="font-display text-6xl text-white/10">0{i + 1}</p>
                    <p className="eyebrow mt-2">{exp.eyebrow}</p>
                    <h3 className="mt-4 text-4xl">{exp.title}</h3>
                    <p className="mt-5 leading-relaxed text-sand-muted">{exp.desc}</p>
                    <Link href="/servicios" className="btn-ghost mt-8">
                      Descubrir
                    </Link>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIO */}
        <section className="border-y border-white/[0.06] bg-ink-800 py-28">
          <Reveal className="container-site text-center">
            <p className="mx-auto max-w-4xl font-display text-3xl italic leading-snug text-white md:text-[2.75rem]">
              “Un refugio en el que el tiempo se detiene. El servicio fue impecable desde el primer minuto.”
            </p>
            <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-sand-muted">Huésped · Suite Presidencial</p>
          </Reveal>
        </section>

        {/* CTA */}
        <section id="contacto" className="relative overflow-hidden py-32 md:py-44">
          <Image src="/habitacion3.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/80" />
          <Reveal className="container-site relative text-center">
            <p className="eyebrow">Reservas directas</p>
            <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-tight md:text-6xl">
              Tu próxima estancia empieza aquí
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sand/80">
              Mejor tarifa garantizada al reservar directamente. Nuestro equipo atiende solicitudes especiales,
              grupos y eventos privados.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button onClick={() => abrirReserva(null)} className="btn-gold">
                Reservar estancia
              </button>
              <Link href="/contacto" className="btn-outline">
                Contactar
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />

      <ReservaForm
        key={formKey}
        open={openReserva}
        onClose={() => {
          setOpenReserva(false);
          setHabitacionActiva(null);
        }}
        habitacion={habitacionActiva}
        fechaInicioInicial={llegada}
        fechaFinInicial={salida}
      />
    </div>
  );
}
