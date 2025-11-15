"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface LoginFormProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginForm({ open, onClose }: LoginFormProps) {
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

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setSending(false);
    if (error) setError(error.message);
    else {
      alert("Revisa tu correo para completar el acceso (magic link).");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Iniciar sesión">
      <p className="text-sm text-gray-600 mb-4">
        Accede para completar tu reserva. Puedes usar Google o un enlace por correo.
      </p>

      <div className="space-y-3">
        <Button onClick={signInWithGoogle} fullWidth>
          Continuar con Google
        </Button>

        <div className="text-center text-sm text-gray-500">o</div>

        <form onSubmit={sendMagicLink} className="space-y-2">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            label="Correo"
          />
          <Button
            type="submit"
            variant="secondary"
            fullWidth
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar enlace de acceso"}
          </Button>
        </form>

        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
      </div>
    </Modal>
  );
}
