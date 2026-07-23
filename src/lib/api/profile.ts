import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured, useMockAuth } from "@/lib/supabase/config";

const supabase = createClient();

/**
 * Rol del usuario actual (tabla `profiles`, ver supabase/schema.sql).
 * En modo demo (sin Supabase, o mock auth) siempre es "admin" para poder
 * navegar el panel de administración sin backend real.
 */
export async function getMyRole(userId: string): Promise<"admin" | "user"> {
  if (!isSupabaseConfigured || useMockAuth) return "admin";

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    if (error || !data) return "user";
    return data.role === "admin" ? "admin" : "user";
  } catch {
    return "user";
  }
}
