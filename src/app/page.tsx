"use client";

// Step 2.2 — Hero Section (Failsafe)
// semua layout pake inline styles, tailwind cuma buat warna dan efek visual

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <HeroSection />
      <FeaturesSection />
      <CTABanner />
    </main>
  );
}

// ─────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
    }}>

      {/* Ambient glow blobs — bikin vibes sci-fi dark mode */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-160px", left: "-160px",
        width: "480px", height: "480px", borderRadius: "9999px",
        background: "radial-gradient(circle, rgba(0,207,255,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, right: 0,
        width: "420px", height: "420px", borderRadius: "9999px",
        background: "radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Inner Container ── */}
      {/* bagi 2 kolom biar teks kiri gambar kanan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4rem',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '80px 2rem',
        position: 'relative',
        zIndex: 1
      }} className="flex-col md:flex-row">

        {/* ── Kiri: Copy ── */}
        {/* bikin tulisan nongol dari kiri alus banget */}
        {/* animasi cinematic biar dosen terpukau */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.175, 0.885, 0.32, 1.275] }}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem", flex: 1 }}
        >

          {/* Badge */}
          <span style={{
            display: "inline-flex", width: "fit-content",
            alignItems: "center", gap: "6px",
            borderRadius: "9999px",
            border: "1px solid rgba(0,207,255,0.3)",
            backgroundColor: "rgba(0,207,255,0.08)",
            padding: "4px 12px",
            fontSize: "11px", fontWeight: 700,
            color: "#00CFFF", letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            ✦ Camilan Kekinian Gen-Z
          </span>

          {/* Headline — split brand colors persis kayak desain */}
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            <span className="text-slate-50">Selamat Datang di </span>
            <span className="text-[#00CFFF]">Snack</span>
            <span className="text-[#F9A826]">Byte</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: "1.0625rem",
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: "420px",
            margin: 0,
          }}>
            Temukan camilan premium pilihanmu, tambah ke keranjang, dan pesan
            langsung via{" "}
            <span style={{ color: "#e2e8f0", fontWeight: 500 }}>WhatsApp</span>
            {" "}— cepat, gampang, anti nunggu lama.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", paddingTop: "0.5rem" }}>

            {/* Primary — solid cyan */}
            <Link
              id="hero-cta-katalog"
              href="#katalog"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "#00CFFF", color: "#0D1117",
                fontWeight: 700, padding: "12px 24px",
                borderRadius: "9999px", textDecoration: "none",
                boxShadow: "0 4px 24px rgba(0,207,255,0.3)",
                transition: "all 0.18s ease",
              }}
              className="hover:brightness-110 hover:-translate-y-0.5"
            >
              Lihat Katalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Secondary — gradient border pink */}
            <Link
              id="hero-cta-tentang"
              href="#tentang"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontWeight: 600, padding: "12px 24px",
                borderRadius: "9999px", textDecoration: "none",
                color: "#f472b6",
                background: "linear-gradient(#0D1117, #0D1117) padding-box, linear-gradient(135deg, #FF2D78, #f472b6) border-box",
                border: "1.5px solid transparent",
                transition: "color 0.18s ease",
              }}
              className="hover:text-white"
            >
              Tentang Kami
            </Link>
          </div>

          {/* Stats pills kecil */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", paddingTop: "0.5rem" }}>
            {[
              { label: "20+ Produk", color: "#00CFFF" },
              { label: "Order via WA", color: "#F9A826" },
              { label: "Harga Terjangkau", color: "#f472b6" },
            ].map(({ label, color }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", fontWeight: 500, color }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "9999px", backgroundColor: "currentColor", opacity: 0.7, display: "inline-block" }} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Kanan: Hero Image dengan glow effect ── */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {/* hero image fade-in belakangan biar dramatis */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "linear" }}
            style={{ width: '100%', maxWidth: '420px', position: 'relative', borderRadius: '2rem', overflow: 'hidden', border: '2px solid rgba(0, 207, 255, 0.2)', boxShadow: '0 0 60px rgba(0, 207, 255, 0.15)' }}
          >
            <img
              src="/images/hero-food.webp"
              alt="SnackByte — aneka camilan kekinian pilihan Gen-Z"
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      id: "feat-snack",
      icon: "🍿",
      title: "Snack Kekinian",
      description: "Koleksi camilan terkurasi yang selalu update mengikuti tren. Dari lokal hits sampai imported favorites.",
      borderColor: "#F9A826", // Amber
    },
    {
      id: "feat-kustom",
      icon: "✨",
      title: "Kustomisasi",
      description: "Mau bikin hamper snack custom? Pilih sendiri isiannya, bungkusnya, dan pesannya. Cocok buat hadiah!",
      borderColor: "#FF2D78", // Pink
    },
    {
      id: "feat-order",
      icon: "📱",
      title: "Pesan Online",
      description: "Checkout langsung via WhatsApp — gak perlu daftar, gak perlu masukin kartu kredit. Semudah itu.",
      borderColor: "#00CFFF", // Cyan
    },
  ];

  return (
    <section id="tentang" style={{ padding: '80px 2rem', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* animasi nongol pas di-scroll biar mantap */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center" }}
      >
        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, margin: "0 0 1rem 0" }}>
          <span className="text-slate-50">Mengapa Memilih </span>
          <span className="text-[#00CFFF]">Snack</span>
          <span className="text-[#F9A826]">Byte</span>
          <span className="text-slate-50">?</span>
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
          Kami menyediakan snack berkualitas dengan harga terjangkau dan pelayanan terbaik untuk kamu.
        </p>
      </motion.div>

      {/* grid otomatis biar responsif tanpa media query ribet */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
        {features.map((feat, index) => (
          <motion.div 
            key={feat.id} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{
              backgroundColor: '#161b22',
              padding: '2rem',
              borderRadius: '1.5rem',
              border: `1px solid ${feat.borderColor}`
            }}
          >
            {/* kasih efek staggered biar munculnya gantian */}
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{feat.icon}</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: feat.borderColor, marginBottom: "0.5rem" }}>
              {feat.title}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
              {feat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────────────────
function CTABanner() {
  return (
    // gradasi mentereng biar mata user seger
    // banner bawah fade-in halus
    <motion.section 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ width: '100%', padding: '60px 2rem', background: 'linear-gradient(90deg, #00CFFF 0%, #F9A826 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.5rem', color: '#0D1117' }}
    >
      <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
        Siap Memesan? 🛒
      </h2>
      <p style={{ fontSize: "1.1rem", fontWeight: 500, maxWidth: "500px", margin: 0, opacity: 0.9 }}>
        Pilih snack favoritmu sekarang dan checkout langsung via WhatsApp. Gak ribet, langsung diproses!
      </p>

      <Link href="#katalog" style={{ backgroundColor: '#0D1117', color: 'white', padding: '12px 32px', borderRadius: '99px', fontWeight: '600', border: 'none', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        Mulai Belanja
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.section>
  );
}
