import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Si las variables de entorno no están presentes, no lanzamos un error
// para que la app pueda cargarse en modo local; exportamos un cliente
// 'dummy' con una API mínima para evitar fallos en tiempo de import.
let supabase: any;
if (!supabaseUrl || !supabaseAnonKey) {
  // Advertencia en consola para desarrolladores
  // eslint-disable-next-line no-console
  console.warn(
    "[supabaseClient] Variables de entorno de Supabase faltantes. Exportando cliente dummy para desarrollo."
  );

  // Cliente dummy con la forma básica usada por el proyecto
  supabase = {
    auth: {
      signInWithOAuth: async () => ({ data: null, error: new Error("Supabase no configurado") }),
      signInWithOtp: async () => ({ data: null, error: new Error("Supabase no configurado") }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: new Error("Supabase no configurado") }),
    },
  } as any;
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
