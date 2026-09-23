import Link from "next/link";
import { Logo } from "./Navbar";

const COLUMNS = [
  {
    title: "Hotel",
    links: [
      { href: "/habitaciones", label: "Habitaciones y suites" },
      { href: "/servicios", label: "Servicios" },
      { href: "/reservas", label: "Mis reservas" },
    ],
  },
  {
    title: "Asistencia",
    links: [
      { href: "/contacto", label: "Contacto" },
      { href: "/contacto", label: "Eventos privados" },
      { href: "/login", label: "Acceso huéspedes" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-900">
      <div className="container-site grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-muted">
            Una residencia de lujo pensada para el descanso: suites de autor, gastronomía de temporada y un
            servicio que se anticipa a cada detalle.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <p className="eyebrow mb-5">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-sand-muted transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <p className="eyebrow mb-5">Reservas directas</p>
          <p className="font-display text-2xl text-white">+57 601 555 0100</p>
          <p className="mt-2 text-sm text-sand-muted">reservas@hotelbooking.com</p>
          <p className="mt-6 text-sm leading-relaxed text-sand-muted">
            Carrera 5 #120-45
            <br />
            Bogotá, Colombia
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-[11px] uppercase tracking-[0.18em] text-sand-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Hotel Booking</p>
          <p>Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
