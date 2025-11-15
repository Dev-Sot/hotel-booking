"use client";

import Image from "next/image";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLoginGoogle = async () => {
    setLoading(true);
    const result = await signInWithGoogle(window.location.origin + "/admin");
    setLoading(false);
    if (!result.success) alert("Error al iniciar sesión: " + result.error);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left image (hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full h-full relative">
          <Image
            src="/hotel-bg.jpg.avif"
            alt="Hotel background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Conectarse</h1>
            <p className="text-sm text-gray-500">Accede con tu cuenta</p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <button
                type="button"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-md font-medium"
              >
                Conectarme
              </button>
            </form>

            <div className="my-4 text-center text-sm text-gray-400">o</div>

            <div className="space-y-3">
              <button
                onClick={handleLoginGoogle}
                className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-50"
                disabled={loading}
              >
                <span className="text-lg">🔴</span>
                Continuar con Google
              </button>

              <button className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-50">
                <span className="text-lg"></span>
                Continuar con Apple
              </button>

              <button className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-50">
                <span className="text-lg">🔵</span>
                Continuar con Facebook
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              ¿Todavía no eres socio? <a href="/register" className="text-amber-600">Registrarse gratis</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
