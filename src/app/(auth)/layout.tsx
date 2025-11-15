import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión - Hotel Booking",
  description: "Accede a tu cuenta de Hotel Booking",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
