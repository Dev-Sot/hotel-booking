"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageHero from "@/components/shared/PageHero";
import Reveal from "@/components/shared/Reveal";
import SectionHeading from "@/components/shared/SectionHeading";
import Icon, { IconName } from "@/components/ui/Icon";

const SERVICIOS: { title: string; desc: string; icon: IconName }[] = [
  { title: "Spa & Wellness", desc: "Masajes personalizados, sauna, jacuzzi y rituales holísticos en cabinas privadas.", icon: "spa" },
  { title: "Restaurante Gourmet", desc: "Cocina internacional de temporada y servicio en suite disponible las 24 horas.", icon: "dining" },
  { title: "Gimnasio", desc: "Equipamiento de última generación, entrenador personal y clases de yoga y pilates.", icon: "fitness" },
  { title: "Piscina climatizada", desc: "Piscina interior con bar de cócteles y servicio de toallas y tumbonas.", icon: "pool" },
  { title: "Concierge privado", desc: "Asistencia permanente para reservas, excursiones y experiencias a medida.", icon: "concierge" },
  { title: "Cine privado", desc: "Sala de proyección para grupos reducidos con selección gourmet.", icon: "cinema" },
  { title: "Business Center", desc: "Salas de reuniones equipadas, conexión de alta velocidad y soporte administrativo.", icon: "business" },
  { title: "Traslados", desc: "Vehículos con conductor hacia el aeropuerto, restaurantes y puntos de interés.", icon: "car" },
  { title: "Club infantil", desc: "Cuidado profesional con actividades educativas y recreativas para los más pequeños.", icon: "child" },
  { title: "Biblioteca", desc: "Un salón silencioso con chimenea, lectura seleccionada y café de especialidad.", icon: "library" },
  { title: "Eventos", desc: "Salones para bodas, congresos y celebraciones privadas con coordinación integral.", icon: "events" },
  { title: "Boutique", desc: "Selección de firmas internacionales y artículos de regalo exclusivos.", icon: "boutique" },
];

const DESTACADOS = [
  {
    eyebrow: "Bienestar",
    title: "Un spa para desconectar",
    desc: "Más de mil metros cuadrados dedicados al descanso: circuito de aguas, cabinas de tratamiento y zona de relajación con luz natural.",
    image: "/spa.jpg",
  },
  {
    eyebrow: "Gastronomía",
    title: "La mesa como experiencia",
    desc: "Producto local, técnica contemporánea y una bodega que acompaña cada plato. Desayunos a la carta y cenas privadas bajo petición.",
    image: "/restaurant.jpg",
  },
];

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      <PageHero
        eyebrow="Servicios"
        title="Servicios Premium"
        image="/spa.jpg"
        description="Todo lo necesario para que tu estancia sea memorable, desde el bienestar hasta la gastronomía, sin salir del hotel."
      />

      <main>
        <section className="container-site space-y-24 py-24 md:space-y-32 md:py-32">
          {DESTACADOS.map((d, i) => (
            <div key={d.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
              <Reveal className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={d.image} alt={d.title} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.12} className="md:col-span-5">
                <p className="eyebrow">{d.eyebrow}</p>
                <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{d.title}</h2>
                <p className="mt-5 leading-relaxed text-sand-muted">{d.desc}</p>
              </Reveal>
            </div>
          ))}
        </section>

        <section className="border-t border-white/[0.06] bg-ink-800 py-24 md:py-32">
          <div className="container-site">
            <Reveal>
              <SectionHeading
                eyebrow="A tu disposición"
                title="Todo lo que ofrecemos"
                description="Servicios incluidos o disponibles bajo reserva a través de nuestro concierge."
                align="center"
              />
            </Reveal>

            <div className="mt-16 grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
              {SERVICIOS.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
                  <article className="group h-full bg-ink-800 p-9 transition-colors duration-500 hover:bg-ink-700 md:p-10">
                    <Icon name={s.icon} className="h-8 w-8 text-gold" strokeWidth={1} />
                    <h3 className="mt-8 text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-sand-muted">{s.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <Reveal className="container-site text-center">
            <p className="eyebrow">Concierge</p>
            <h2 className="mx-auto mt-6 max-w-2xl text-4xl leading-tight md:text-5xl">¿Necesitas un servicio personalizado?</h2>
            <p className="mx-auto mt-5 max-w-xl text-sand-muted">
              Nuestro equipo está disponible las 24 horas para atender cualquier solicitud especial.
            </p>
            <Link href="/contacto" className="btn-gold mt-10">
              Contactar
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
