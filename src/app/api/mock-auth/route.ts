import { NextResponse } from "next/server";
import { MOCK_SESSION_COOKIE, useMockAuth } from "@/lib/supabase/config";

/**
 * Únicamente existe para que el modo demo (NEXT_PUBLIC_USE_MOCK_AUTH=true)
 * tenga una cookie visible por el middleware. Si la variable no está en
 * "true", ambos métodos son no-op: no hay forma de "activar" una sesión
 * falsa desde afuera aunque alguien llame a este endpoint directamente.
 */
export async function POST() {
  if (!useMockAuth) {
    return NextResponse.json({ success: false, error: "Mock auth deshabilitado" }, { status: 403 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set(MOCK_SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(MOCK_SESSION_COOKIE);
  return response;
}
