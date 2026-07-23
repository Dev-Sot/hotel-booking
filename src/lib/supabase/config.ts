/**
 * Config compartida: si no hay credenciales de Supabase, la app no debe
 * fingir una sesión — cualquier lectura/escritura real simplemente falla,
 * y las páginas deben mostrar un estado vacío honesto en vez de datos falsos.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * El modo mock solo existe para poder navegar la demo sin backend real.
 * Se activa EXCLUSIVAMENTE con esta variable explícita — nunca se infiere
 * de que falten credenciales, para que un despliegue mal configurado quede
 * bloqueado (sin sesión) en vez de mostrar una sesión falsa admitida.
 */
export const useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";

export const MOCK_SESSION_COOKIE = "mock_session";
