export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Hotel Booking — Todos los derechos reservados.
      </div>
    </footer>
  );
}
