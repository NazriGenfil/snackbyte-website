"use client";

// navbar failsafe — semua layout pake inline styles biar 100% jalan
// tailwind cuma buat warna, hover, dan efek visual doang

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";


const IconCart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

// tombol hamburger — switch otomatis ke X pas menu kebuka
const IconBurger = ({ isOpen }: { isOpen: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {isOpen ? (
      <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
    ) : (
      <><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" /></>
    )}
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Katalog", href: "/katalog" },
  // { label: "Tentang Kami", href: "/tentang-kami" },
  // tombol kontak langsung nembak ke wa biar admin gercep 
  { label: "Kontak Kami", href: "https://wa.me/6283161858766?text=Halo%20SnackByte!%20Saya%20mau%20tanya-tanya%20nih." },
];

export default function Navbar() {
  // sembunyiin menu desktop pas di HP, pake state buat toggle
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartStore = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Mencegah hydration mismatch error di Next.js dengan useEffect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setCartCount(cartStore.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartStore]);

  return (
    <header style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid #1e2a3a', backgroundColor: 'rgba(13, 17, 23, 0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>

      {/* ─── Main Bar ─── */}
      {/* batesin lebar biar gak bablas ke samping */}
      {/* benerin padding biar gak mepet kanan */}
      <div className="w-full max-w-[1440px] h-[80px] flex justify-between items-center px-6 lg:px-16">

        {/* ── Kiri: Logo ── */}
        <Link href="/" id="nav-logo" style={{ flexShrink: 0, textDecoration: "none", fontSize: '1.5rem', fontWeight: '800' }}
          className="tracking-tight select-none">
          <span className="text-[#00CFFF]">Snack</span>
          <span className="text-[#F9A826]">Byte</span>
        </Link>

        {/* ── Tengah: Nav Links — sembunyiin pas di HP, kasih gap gede biar gak dempetan kaya angkot ── */}
        <nav
          id="nav-desktop"
          aria-label="Navigasi utama"
          // pindah breakpoint ke lg biar ipad pake burger menu
          className="hidden lg:flex items-center gap-10"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.label === "Kontak Kami" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              className="px-4 py-1.5 rounded-md hover:text-white hover:bg-[#00CFFF]/10 transition-colors whitespace-nowrap"
            >
              {/* tambah icon chat biar sama kaya desain figma */}
              {link.label === "Kontak Kami" && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Kanan: Icons + Burger ── */}
        {/* hapus icon search & user, sisa keranjang sm burger */}
        <div className="flex items-center gap-2 lg:gap-6 shrink-0">

          {/* taro angka keranjang di pojok biar gak tumpuk */}
          {/* stop kursor gemeteran pas hover keranjang */}
          <Link href="/keranjang" id="nav-cart" aria-label="Keranjang belanja"
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            className="p-2 rounded-lg text-slate-400 hover:text-[#00CFFF] hover:bg-[#00CFFF]/10 transition-colors">
            <IconCart />
            {/* biar badge gak ganggu sensor mouse pas di-hover */}
            <span aria-label={`${mounted ? cartCount : 0} item di keranjang`} style={{
              position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#F9A826', color: '#0D1117', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', border: '2px solid #0D1117', pointerEvents: 'none'
            }}>{mounted ? cartCount : 0}</span>
          </Link>

          {/* tombol hamburger buat toggle — cuma keliatan di HP */}
          <button
            id="nav-burger"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <IconBurger isOpen={mobileOpen} />
          </button>
        </div>
      </div>

      {/* ─── Mobile Dropdown — animasi slide-down biar premium ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navigasi mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              width: "100%",
              overflow: "hidden",
              borderTop: "1px solid #1e2a3a",
              backgroundColor: "rgba(13, 17, 23, 0.97)",
            }}
          >
            <div style={{ padding: "0.75rem 1.5rem", display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((link) => (
                // tutup menu otomatis pas link diklik
                <Link key={link.label} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  {...(link.label === "Kontak Kami" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

    </header>
  );
}
