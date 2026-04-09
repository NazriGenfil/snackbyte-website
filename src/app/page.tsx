// Halaman utama — sementara cuma stub hero buat validasi Tailwind + brand theme
// Nanti akan jadi product catalog grid

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* ── Navbar placeholder ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cream-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {/* Logo dot warna brand biar langsung ketauan ini snackbyte */}
          <span className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
            S
          </span>
          <span className="font-extrabold text-xl text-text-primary tracking-tight">
            Snack<span className="text-brand-500">Byte</span>
          </span>
        </div>

        {/* Cart icon placeholder — akan jadi CartDrawer trigger nanti */}
        <button
          id="cart-btn-placeholder"
          className="relative flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold px-4 py-2 rounded-full text-sm"
          aria-label="Keranjang belanja"
        >
          🛒 Keranjang
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center">
            0
          </span>
        </button>
      </header>

      {/* ── Hero Section ── */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-brand-50 to-cream-50">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 bg-brand-500/10 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          ✨ Camilan Pilihan Terbaik
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary leading-tight max-w-2xl mb-5">
          Snack Kesukaanmu,{" "}
          <span className="text-brand-500">Satu Klik</span> Jauhnya
        </h1>

        <p className="text-text-secondary text-lg max-w-lg mb-10 leading-relaxed">
          Pilih camilanmu, tambah ke keranjang, dan pesan langsung via WhatsApp.
          Gak ribet, gak pake lama.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            id="cta-shop-now"
            href="#katalog"
            className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-600/40 hover:-translate-y-0.5 transition-all"
          >
            Lihat Katalog →
          </a>
          <a
            id="cta-learn-more"
            href="#cara-pesan"
            className="bg-white border border-cream-200 hover:border-brand-300 text-text-secondary hover:text-brand-700 font-semibold px-8 py-3.5 rounded-full transition-all"
          >
            Cara Pesan
          </a>
        </div>

        {/* Floating pill stats — vibe premium dikit */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm">
          {[
            { icon: "🍿", label: "20+ Produk Pilihan" },
            { icon: "⚡", label: "Order via WhatsApp" },
            { icon: "❤️", label: "Dibuat dengan Cinta" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 bg-white border border-cream-200 text-text-secondary px-4 py-2 rounded-full shadow-sm"
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Catalog section placeholder — akan diisi product cards nanti ── */}
      <section
        id="katalog"
        className="px-6 py-20 max-w-7xl mx-auto w-full"
      >
        <h2 className="text-3xl font-extrabold text-text-primary mb-2">
          Katalog Produk
        </h2>
        <p className="text-text-muted mb-10">
          Product cards akan muncul di sini — coming next step!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-cream-200 rounded-2xl p-4 animate-pulse"
            >
              <div className="w-full h-36 bg-cream-100 rounded-xl mb-3" />
              <div className="h-4 bg-cream-100 rounded mb-2 w-3/4" />
              <div className="h-3 bg-cream-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-cream-200 bg-white text-center text-text-muted text-sm py-6">
        © {new Date().getFullYear()} SnackByte. Dibuat dengan 🧡 untuk tugas
        kewirausahaan.
      </footer>
    </main>
  );
}
