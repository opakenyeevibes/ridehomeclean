import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Ride N Care — Care datang ke lokasi kamu", description: "Platform layanan care panggilan untuk rumah, area luar, kantor, dan kendaraan." };
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2FA084" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
