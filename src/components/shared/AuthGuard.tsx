"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context";

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [loading, user, router, redirectTo]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink" role="status" aria-label="Cargando">
        <div className="h-10 w-10 animate-spin rounded-full border border-gold/30 border-t-gold" />
      </div>
    );
  }
  if (!user) return null;
  return <>{children}</>;
}
