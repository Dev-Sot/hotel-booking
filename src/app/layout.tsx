import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Étoile – Reserva tu experiencia 6 estrellas",
  description: "Disfruta lujo y confort en cada detalle. Reserva tus habitaciones y servicios de manera rápida y segura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// 🔹 Navbar elegante
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-700 tracking-wide">
          ÉTOILE<span className="text-gray-500">Hotel</span>
        </h1>
        <div className="space-x-6 text-sm font-medium">
          <a href="/" className="hover:text-blue-700 transition">Inicio</a>
          <a href="/habitaciones" className="hover:text-blue-700 transition">Habitaciones</a>
          <a href="/servicios" className="hover:text-blue-700 transition">Servicios</a>
          <a href="/reservas" className="hover:text-blue-700 transition">Reservas</a>
          <a href="/contacto" className="hover:text-blue-700 transition">Contacto</a>
        </div>
      </div>
    </nav>
  );
}

// 🔹 Footer simple y elegante
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
      <p>© {new Date().getFullYear()} ÉTOILE Hotel. Todos los derechos reservados.</p>
    </footer>
  );
}
