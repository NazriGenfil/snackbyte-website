// layout utama — base HTML shell yang bersih
// next/font handle self-hosting otomatis, gak perlu CDN Google lagi
import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
// import pake path relatif setelah folder dipindah ke app/components
import Navbar from "./components/Navbar";
import NotificationToast from "./components/NotificationToast";

// subset latin cukup biar bundle ringan, swap biar gak FOUT
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SnackByte — Snack Kekinian untuk Gen-Z",
  description:
    "Temukan camilan premium pilihan Gen-Z. Pesan langsung via WhatsApp — cepat, gampang, anti ribet!",
  keywords: ["snack", "camilan", "jajan kekinian", "order wa", "snackbyte", "gen-z snack"],
  openGraph: {
    title: "SnackByte — Snack Kekinian untuk Gen-Z",
    description: "Pesan camilan favorit kamu sekarang via WhatsApp!",
    siteName: "SnackByte",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // background dipastiin #0D1117 lewat CSS var, bukan hardcode di sini
    <html lang="id" data-scroll-behavior="smooth" className={`${plusJakartaSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0D1117] text-slate-200 antialiased">
        <Navbar />
        <NotificationToast />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// footer simpel aja biar clean
function Footer() {
  return (
    <footer style={{ padding: '40px 2rem', textAlign: 'center', backgroundColor: '#0D1117', borderTop: '1px solid #1e2a3a' }}>
      <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#f8fafc' }}>
        © 2026 <span className="text-[#00CFFF]">Snack</span><span className="text-[#F9A826]">Byte</span> - Snack Kekinian untuk Gen-Z
      </p>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>
        Dibuat dengan ❤️ untuk pecinta snack di Indonesia
      </p>
    </footer>
  );
}
