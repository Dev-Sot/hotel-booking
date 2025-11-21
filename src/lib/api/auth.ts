import { supabase } from "@/lib/supabaseClient";

// Detectar modo mock para desarrollo local (cuando la URL de Supabase es placeholder
// o cuando el desarrollador define NEXT_PUBLIC_USE_MOCK_AUTH=true)
const useMockAuth = Boolean(
  process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true" ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")
);

const MOCK_USER = {
  id: "dev-user",
  email: "dev@local",
  user_metadata: { nombre: "Desarrollador", apellido: "Local" },
  created_at: new Date().toISOString(),
};

function saveMockUser() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("mock_user", JSON.stringify(MOCK_USER));
    } catch {}
  }
}

function clearMockUser() {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("mock_user");
    } catch {}
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
    // Simular flujo: guardar usuario falso y redirigir localmente
    saveMockUser();
    if (typeof window !== "undefined" && redirectTo) {
      // pequeña pausa para simular latencia
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
    saveMockUser();
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
    if (user) return { success: true, user };
    return { success: true, user: null };
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
    clearMockUser();
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
