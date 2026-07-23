"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Cliente de Supabase para componentes de cliente. Usa cookies (no
 * localStorage) para que la sesión también sea visible en el servidor
 * (middleware, server components) — ver src/lib/supabase/server.ts.
 */
export function createClient() {
  if (!isSupabaseConfigured) {
    console.warn(
      "[supabase] Variables de entorno faltantes (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY). " +
        "La app funciona en modo lectura limitada; configura Supabase para persistencia real."
    );
  }

  return createBrowserClient(supabaseUrl ?? "http://localhost:54321", supabaseAnonKey ?? "public-anon-key");
}
