import { createClient } from "@/lib/supabase/client";
import { useMockAuth } from "@/lib/supabase/config";

const supabase = createClient();

const MOCK_USER = {
  id: "dev-user",
  email: "dev@local",
  user_metadata: { nombre: "Desarrollador", apellido: "Local" },
  created_at: new Date().toISOString(),
};

async function setMockSession(active: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (active) {
      localStorage.setItem("mock_user", JSON.stringify(MOCK_USER));
      await fetch("/api/mock-auth", { method: "POST" });
    } else {
      localStorage.removeItem("mock_user");
      await fetch("/api/mock-auth", { method: "DELETE" });
    }
  } catch {
    // Si el endpoint falla, la sesión mock sigue funcionando solo en el
    // cliente; el middleware simplemente no la reconocerá.
  }
}

function loadMockUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("mock_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Iniciar sesión con Google
 */
export async function signInWithGoogle(redirectTo: string) {
  if (useMockAuth) {
    await setMockSession(true);
    if (typeof window !== "undefined" && redirectTo) {
      setTimeout(() => (window.location.href = redirectTo), 400);
    }
    return { success: true, data: MOCK_USER };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Enviar magic link por correo
 */
export async function sendMagicLink(email: string) {
  if (useMockAuth) {
    await setMockSession(true);
    return { success: true, data: { message: "magic link simulated" } };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser() {
  if (useMockAuth) {
    const user = loadMockUser();
    return { success: true, user };
  }

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Cerrar sesión
 */
export async function signOut() {
  if (useMockAuth) {
    await setMockSession(false);
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
