"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const handleLoginGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/admin",
      },
    });
    if (error) alert("Error al iniciar sesión: " + error.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Inicia sesión</h1>
        <button
          onClick={handleLoginGoogle}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
