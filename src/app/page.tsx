export default function Home() {
  return (
    <div className="relative">
      <section className="h-[90vh] flex flex-col justify-center items-center text-center bg-[url('/hotel-bg.jpg')] bg-cover bg-center text-white">
        <div className="bg-black/50 p-10 rounded-xl">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Bienvenido a ÉTOILE Hotel
          </h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Vive una experiencia inolvidable. Reserva tu habitación ideal y disfruta de nuestros servicios exclusivos.
          </p>
          <a
            href="/reservas"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
          >
            Reservar ahora
          </a>
        </div>
      </section>
    </div>
  );
}
