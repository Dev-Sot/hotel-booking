"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "@/context";
import Icon from "@/components/ui/Icon";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/servicios", label: "Servicios" },
  { href: "/reservas", label: "Reservas" },
  { href: "/contacto", label: "Contacto" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex flex-col leading-none text-white ${className}`} aria-label="Hotel Booking, inicio">
      <span className="font-display text-[22px] tracking-[0.02em]">
        Hotel <span className="italic text-gold">Booking</span>
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.45em] text-sand-muted">
        Luxury Collection
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, loading, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const displayName = user?.nombre || user?.email?.split("@")[0] || "Mi cuenta";
  const solid = scrolled || mobileOpen;

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
        solid
          ? "border-b border-white/[0.06] bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div
        className={`container-site flex items-center justify-between transition-[height] duration-500 ${
          scrolled ? "h-[72px]" : "h-[88px]"
        }`}
      >
        <Logo />

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`link-underline text-[12px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive(link.href) ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border border-gold/30 border-t-gold" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.18em] text-white/85 transition hover:text-gold"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <Icon name="user" className="h-4 w-4" />
                </span>
                <span className="max-w-[140px] truncate normal-case tracking-normal text-sm">{displayName}</span>
                <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-4 w-64 border border-white/10 bg-ink-800/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
                  >
                    <div className="border-b border-white/[0.06] px-5 py-4">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-sand-dim">Conectado como</p>
                      <p className="mt-1 truncate text-sm text-white">{user.nombre || user.email}</p>
                    </div>
                    <Link
                      href="/reservas"
                      onClick={() => setMenuOpen(false)}
                      className="block px-5 py-3 text-sm text-sand transition hover:bg-white/[0.04] hover:text-gold"
                    >
                      Mis reservas
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="block px-5 py-3 text-sm text-sand transition hover:bg-white/[0.04] hover:text-gold"
                    >
                      Panel de administración
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 border-t border-white/[0.06] px-5 py-3 text-left text-sm text-sand-muted transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <Icon name="logout" className="h-4 w-4" />
                      Cerrar sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[12px] uppercase tracking-[0.2em] text-white/80 transition hover:text-gold"
            >
              Iniciar sesión
            </Link>
          )}

          <Link href="/habitaciones" className="btn-gold !px-6 !py-3">
            Reservar
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-ink lg:hidden"
          >
            <ul className="container-site py-6">
              {LINKS.map((link) => (
                <li key={link.href} className="border-b border-white/[0.05]">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-4 font-display text-2xl ${
                      isActive(link.href) ? "text-gold" : "text-white"
                    }`}
                  >
                    {link.label}
                    <Icon name="arrow" className="h-4 w-4 text-sand-dim" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="container-site space-y-3 pb-8">
              {user ? (
                <>
                  <p className="text-xs text-sand-muted">
                    Conectado como <span className="text-white">{user.nombre || user.email}</span>
                  </p>
                  <button onClick={handleLogout} className="btn-outline w-full">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline w-full">
                  Iniciar sesión
                </Link>
              )}
              <Link href="/habitaciones" onClick={() => setMobileOpen(false)} className="btn-gold w-full">
                Reservar estancia
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
