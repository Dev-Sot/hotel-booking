import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin - Hotel Booking",
  description: "Panel de administración de Hotel Booking",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
