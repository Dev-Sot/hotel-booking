import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider, ReservaProvider } from "@/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Colina Campestre",
  description:
    "Reserva tu experiencia de lujo en Hotel Booking: suites exclusivas, atención personalizada y confort de clase mundial.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0b0b0b] text-white relative">
        {/* Fondo decorativo con brillo dorado sutil */}
        <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0b0b0b] to-[#000] opacity-95 -z-10" />
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(198,169,114,0.05),transparent_60%)] -z-10" />

        {/* Contenido principal */}
        <AuthProvider>
          <ReservaProvider>{children}</ReservaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
