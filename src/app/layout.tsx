import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnackByte — Camilan Favoritmu, Mudah Dipesan",
  description:
    "Catalog camilan premium pilihan. Pilih, tambah ke keranjang, dan pesan langsung via WhatsApp — cepat, gampang, enak!",
  keywords: ["snack", "camilan", "jajan", "order wa", "snackbyte"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang="id" karena ini project buat pasar Indonesia
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
