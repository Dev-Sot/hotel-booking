import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AuthProvider, ReservaProvider } from "@/context";
import { SITE_URL } from "@/lib/utils/siteUrl";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hotel Booking — Estancias de lujo",
    template: "%s — Hotel Booking",
  },
  description:
    "Suites exclusivas, gastronomía de autor y atención personalizada. Reserva directamente con disponibilidad en tiempo real.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Hotel Booking",
    images: ["/habitacion1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <ReservaProvider>{children}</ReservaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
