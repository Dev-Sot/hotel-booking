"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  };

  const sendMagicLink = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSending(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setSending(false);
    if (error) setError(error.message);
    else {
      // Indicar al usuario que revise su correo
      alert("Revisa tu correo para completar el acceso (magic link).");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => onClose()}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl p-6 max-w-md w-full text-gray-900"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-2">Iniciar sesión</h3>
            <p className="text-sm text-gray-600 mb-4">
              Accede para completar tu reserva. Puedes usar Google o un enlace por correo.
            </p>

            <div className="space-y-3">
              <button
                onClick={signInWithGoogle}
                className="w-full bg-amber-500 text-black py-2 rounded-md font-medium"
              >
                Continuar con Google
              </button>

              <div className="text-center text-sm text-gray-500">o</div>

              <form onSubmit={sendMagicLink} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white py-2 rounded-md"
                  disabled={sending}
                >
                  {sending ? "Enviando..." : "Enviar enlace de acceso"}
                </button>
              </form>

              {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
