import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, MOCK_SESSION_COOKIE, supabaseAnonKey, supabaseUrl, useMockAuth } from "./config";

const PROTECTED_PREFIXES = ["/admin", "/reservas"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * Refresca la sesión de Supabase en cada request y bloquea rutas protegidas
 * cuando no hay sesión. El modo mock SOLO se acepta si NEXT_PUBLIC_USE_MOCK_AUTH
 * es exactamente "true" en el entorno del servidor — nunca por falta de
 * configuración, que es justamente el escenario que debe quedar bloqueado.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  let hasSession = false;

  if (isSupabaseConfigured) {
    const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    hasSession = Boolean(user);
  }

  if (!hasSession && useMockAuth) {
    hasSession = request.cookies.get(MOCK_SESSION_COOKIE)?.value === "1";
  }

  if (!hasSession && isProtectedPath(request.nextUrl.pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}
