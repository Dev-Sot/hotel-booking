"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 40);
    });
  }

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/habitaciones", label: "Habitaciones" },
    { href: "/servicios", label: "Servicios" },
    { href: "/reservas", label: "Reservas" },
    { href: "/contacto", label: "Contacto" },
  ];

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

        {/* Botón de login */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-6 bg-amber-500/95 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition hidden md:block"
        >
          Iniciar sesión
        </motion.button>
      </div>
    </motion.nav>
  );
}
