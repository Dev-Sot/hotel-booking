import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Hotel Booking",
  description: "Sistema profesional de reservas para hostelería",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="pt-20">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
