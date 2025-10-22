"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/", // redirige al home después del login
      },
    });

    if (error) {
      console.error("Error en el login:", error.message);
      alert("Hubo un error al iniciar sesión.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-xl text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Hotel Booking</h1>
        <p className="text-gray-600">Inicia sesión para continuar</p>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
        >
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}
