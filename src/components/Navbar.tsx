"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          🌴 Hotel Booking
        </Link>

        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-600 transition">Inicio</Link>
          <Link href="/habitaciones" className="hover:text-blue-600 transition">Habitaciones</Link>
          <Link href="/servicios" className="hover:text-blue-600 transition">Servicios</Link>
          <Link href="/reservas" className="hover:text-blue-600 transition">Reservas</Link>
          <Link href="/contacto" className="hover:text-blue-600 transition">Contacto</Link>

          {!user ? (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
