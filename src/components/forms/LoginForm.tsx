"use client";
import { useState } from "react";
import { signInWithGoogle, sendMagicLink } from "@/lib/api";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LoginFormProps } from "@/types";

export default function LoginForm({ open, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignInWithGoogle = async () => {
    const result = await signInWithGoogle(window.location.origin);
    if (!result.success) setError(result.error || "Error al iniciar sesión");
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const result = await sendMagicLink(email);
    setSending(false);
    if (result.success) {
      alert("Revisa tu correo para completar el acceso (magic link).");
      onClose();
    } else {
      setError(result.error || "Error al enviar enlace");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Iniciar sesión">
      <p className="text-sm text-gray-600 mb-4">
        Accede para completar tu reserva. Puedes usar Google o un enlace por correo.
      </p>

      <div className="space-y-3">
        <Button onClick={handleSignInWithGoogle} fullWidth>
          Continuar con Google
        </Button>

        <div className="text-center text-sm text-gray-500">o</div>

        <form onSubmit={handleSendMagicLink} className="space-y-2">
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
