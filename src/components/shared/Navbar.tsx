"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/context";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/85 backdrop-blur-md shadow-lg" : "bg-transparent"
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

        {/* Auth Section */}
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
                className="flex items-center gap-2 bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 px-4 py-2 rounded-lg font-medium transition border border-amber-500/30"
              >
                <span className="text-xl">👤</span>
                <span className="text-sm truncate max-w-[150px]">
                  {user.nombre || user.email?.split("@")[0] || "Usuario"}
                </span>
                <span className="text-xs">▼</span>
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
                    📋 Mis Reservas
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
                        // navegar a la página de login
                        window.location.href = "/login";
                      }}
                      className="w-full text-left px-4 py-3 mb-2 bg-sky-50 hover:bg-sky-100 rounded-md"
                    >
                      Iniciar sesión
                    </button>

                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 mb-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      Registrarse gratis
                    </Link>

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
      </div>
    </motion.nav>
  );
}
