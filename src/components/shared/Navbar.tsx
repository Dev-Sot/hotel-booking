"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/habitaciones", label: "Habitaciones" },
    { href: "/servicios", label: "Servicios" },
    { href: "/reservas", label: "Reservas" },
    { href: "/contacto", label: "Contacto" },
  ];

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "bg-black/85 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        {/* Logo elegante */}
        <Link href="/" className="text-2xl font-semibold tracking-wide">
          <span className="text-amber-500 font-serif">Hotel</span>{" "}
          <span className="text-white font-light">Booking</span>
        </Link>

        {/* Links de navegación */}
        <ul className="hidden md:flex gap-8 text-sm tracking-wider">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative transition-all duration-300 hover:text-amber-400"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Section (desktop) */}
        <div className="ml-6 hidden md:flex items-center gap-4">
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-amber-500"></div>
          ) : user ? (
            // Usuario autenticado
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                className="flex items-center gap-3 bg-amber-500/90 hover:bg-amber-500 text-gray-900 px-5 py-2.5 rounded-lg font-semibold transition shadow-lg border-2 border-amber-400"
              >
                <span className="text-xl" aria-hidden="true">👤</span>
                <span className="text-sm font-bold truncate max-w-[150px]">
                  {user.nombre || user.email?.split("@")[0] || "Usuario"}
                </span>
                <span className="text-xs" aria-hidden="true">▼</span>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 bg-black/95 border border-amber-500/30 rounded-lg shadow-lg overflow-hidden min-w-[200px]"
                >
                  <div className="p-3 border-b border-amber-500/20">
                    <p className="text-xs text-gray-400">Conectado como</p>
                    <p className="text-sm text-white font-semibold truncate">
                      {user.nombre || user.email}
                    </p>
                  </div>
                  <Link
                    href="/reservas"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-amber-500/20 hover:text-white transition"
                  >
                     Mis Reservas
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 transition"
                  >
                    🚪 Cerrar Sesión
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            // Sin autenticar: mostrar botón que abre un dropdown con opciones
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                className="bg-amber-500/95 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition transform hover:scale-105"
              >
                Iniciar sesión
              </button>

              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-lg overflow-hidden border"
                >
                  <div className="p-4">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        window.location.href = "/login";
                      }}
                      className="w-full text-left px-4 py-3 mb-2 bg-sky-50 hover:bg-sky-100 rounded-md"
                    >
                      Iniciar sesión
                    </button>

                    <div className="mt-2 border-t pt-2">
                      <Link
                        href="/reservas"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        Mis reservas
                      </Link>
                      <Link
                        href="/contacto"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        Asistencia y ayuda
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Botón de menú móvil */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Panel de navegación móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-black/95 border-t border-white/10"
          >
            <ul className="px-6 py-4 space-y-3 text-white">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1 hover:text-amber-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6 border-t border-white/10 pt-4">
              {user ? (
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">
                    Conectado como <span className="text-white">{user.nombre || user.email}</span>
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm rounded-md bg-red-600/20 text-red-300"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
