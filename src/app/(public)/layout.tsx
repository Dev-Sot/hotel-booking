import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Booking - Reserva tu experiencia",
  description:
    "Reserva tu experiencia de lujo en Hotel Booking: suites exclusivas, atención personalizada y confort de clase mundial.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
