"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signInWithGoogle, sendMagicLink } from "@/lib/api";
import { Logo } from "@/components/shared/Navbar";
import GoogleMark from "@/components/ui/GoogleMark";
import Icon from "@/components/ui/Icon";

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
    <div className="flex min-h-screen bg-ink">
      <div className="relative hidden w-1/2 lg:block">
        <Image src="/habitacion1.jpg" alt="Suite del hotel" fill priority sizes="50vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/40" />
        <div className="absolute bottom-14 left-14 right-14">
          <span className="hairline block" />
          <p className="mt-6 max-w-md font-display text-4xl italic leading-snug text-white">
            “El verdadero lujo es sentirse en casa, lejos de casa.”
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-10 sm:px-12">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sand-muted transition hover:text-gold">
            <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
            Volver
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-16">
          <div className="w-full max-w-sm">
            <p className="eyebrow">Acceso huéspedes</p>
            <h1 className="mt-4 text-5xl">Bienvenido</h1>
            <p className="mt-4 text-sm leading-relaxed text-sand-muted">
              Inicia sesión para reservar, consultar tus estancias y gestionar tus preferencias.
            </p>

            <button
              onClick={handleLoginGoogle}
              disabled={loadingGoogle}
              className="mt-10 flex w-full items-center justify-center gap-3 bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-sand disabled:opacity-50"
            >
              <GoogleMark />
              {loadingGoogle ? "Conectando..." : "Continuar con Google"}
            </button>

            <div className="my-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-sand-dim">
              <span className="h-px flex-1 bg-white/10" />o<span className="h-px flex-1 bg-white/10" />
            </div>

            {linkSent ? (
              <div role="status" className="flex items-start gap-3 border border-gold/40 bg-gold/[0.06] p-5 text-sm text-gold-100">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Revisa tu correo, te enviamos un enlace de acceso.
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="field-label">Correo electrónico</label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="field"
                  />
                </div>
                <button type="submit" disabled={sendingLink} className="btn-ghost w-full">
                  {sendingLink ? "Enviando..." : "Enviar enlace de acceso"}
                </button>
              </form>
            )}

            {error && <p className="mt-4 text-center text-sm text-red-300">{error}</p>}

            <p className="mt-10 flex items-center gap-2 text-xs text-sand-dim">
              <Icon name="shield" className="h-3.5 w-3.5" />
              Autenticación segura con Supabase. No almacenamos contraseñas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
