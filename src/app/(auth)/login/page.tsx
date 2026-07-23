"use client";

import Image from "next/image";
import { useState } from "react";
import { signInWithGoogle, sendMagicLink } from "@/lib/api";

export default function LoginPage() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [email, setEmail] = useState("");
  const [sendingLink, setSendingLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginGoogle = async () => {
    setLoadingGoogle(true);
    setError(null);
    const result = await signInWithGoogle(window.location.origin + "/admin");
    setLoadingGoogle(false);
    if (!result.success) setError(result.error || "Error al iniciar sesión");
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingLink(true);
    setError(null);
    const result = await sendMagicLink(email);
    setSendingLink(false);
    if (result.success) {
      setLinkSent(true);
    } else {
      setError(result.error || "Error al enviar el enlace");
    }
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
            <button
              onClick={handleLoginGoogle}
              disabled={loadingGoogle}
              className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {loadingGoogle ? "Conectando..." : "Continuar con Google"}
            </button>

            <div className="my-4 text-center text-sm text-gray-400">o</div>

            {linkSent ? (
              <p className="text-sm text-green-600 text-center">
                Revisa tu correo, te enviamos un enlace de acceso.
              </p>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full border rounded-md px-3 py-2"
                />
                <button
                  type="submit"
                  disabled={sendingLink}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-md font-medium disabled:opacity-50"
                >
                  {sendingLink ? "Enviando..." : "Enviar enlace de acceso"}
                </button>
              </form>
            )}

            {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
