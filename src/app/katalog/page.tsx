"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useCartStore, Product } from "@/store/useCartStore";
import { useNotificationStore } from "@/store/useNotificationStore";
// import langsung aja biar gak drama fetch error 404
import productsData from "@/data/products.json";
import addonsData from "@/data/addons.json";

export default function KatalogPage() {
    // pastiin data produk sinkron sama UI
    const [products] = useState<Product[]>(productsData as Product[]);
    const [filter, setFilter] = useState("Semua");
    const addToCart = useCartStore(state => state.addToCart);
    const updateAddonQuantity = useCartStore(state => state.updateAddonQuantity);
    const addNotification = useNotificationStore(state => state.addNotification);

    const router = useRouter();
    const [isAddonModalOpen, setIsAddonModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedAddonsLocal, setSelectedAddonsLocal] = useState<string[]>([]);
    const [modalIntent, setModalIntent] = useState<'cart' | 'buy_now'>('cart');

    const handleToggleAddon = (id: string) => {
        setSelectedAddonsLocal(prev => 
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const handleProductAction = (product: Product, intent: 'cart' | 'buy_now') => {
        // cek minuman skip addon
        if (product.category !== "Makanan") {
            addToCart(product);
            addNotification(`${product.name} ditambahkan!`);
            if (intent === 'buy_now') {
                router.push("/keranjang");
            }
        } else {
            // simpen intent beli langsung
            setSelectedProduct(product);
            setSelectedAddonsLocal([]);
            setModalIntent(intent);
            setIsAddonModalOpen(true);
        }
    };

    const handleConfirmAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct);
            // masukin addon ke keranjang
            selectedAddonsLocal.forEach(addonId => {
                const addon = addonsData.find(a => a.id === addonId);
                if (addon) {
                    updateAddonQuantity(addon, 1);
                }
            });
            addNotification(`${selectedProduct.name} ditambahkan!`);
            setIsAddonModalOpen(false);
            setSelectedProduct(null);
            setSelectedAddonsLocal([]);

            if (modalIntent === 'buy_now') {
                router.push("/keranjang");
            }
        }
    };

    // filter data biar user gak pusing nyari
    const filteredProducts = products.filter(p => filter === "Semua" ? true : p.category === filter);

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
    };

    return (
        <main style={{ minHeight: "100vh", padding: "80px 2rem", flex: 1, backgroundColor: "#0D1117" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

                {/* Header */}
                {/* Header */}
                {/* notif header nongol dari atas cepet */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ textAlign: "center", marginBottom: "3rem" }}
                >
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
                        Katalog Produk
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: "1.1rem", margin: 0 }}>
                        Pilih snack favoritmu dan tambahkan ke keranjang
                    </p>
                </motion.div>

                {/* Filters */}
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                    {["Semua", "Makanan", "Minuman"].map((cat) => {
                        const isActive = filter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: "8px 24px",
                                    borderRadius: "9999px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    backgroundColor: isActive ? "#00CFFF" : "transparent",
                                    color: isActive ? "#0D1117" : "#cbd5e1",
                                    border: isActive ? "2px solid #00CFFF" : "2px solid #30363d"
                                }}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Product Grid */}
                <motion.div
                    variants={{ visible: { opacity: 1, transition: { staggerChildren: 0.15 } }, hidden: { opacity: 0 } }}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
                >
                    {/* pasang logic staggered biar produk muncul satu-satu gantian */}
                    {filteredProducts.map(product => (
                        // UI kartu produk sesuai figma
                        <motion.div
                            key={product.id}
                            variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 40 } }}
                            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                            style={{
                                backgroundColor: "#161b22",
                                borderRadius: "1.5rem",
                                border: "1px solid #30363d",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {/* animasi smooth premium anti kaku */}
                            {/* Image Setup */}
                            <div style={{ position: "relative", width: "100%", height: "200px" }}>
                                {/* pake gambar lokal biar gak lemot loadingnya */}
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* Content */}
                            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1, gap: "1rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <div>
                                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.25rem 0", color: "#f8fafc" }}>{product.name}</h3>
                                        <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0, lineHeight: 1.5 }}>
                                            {product.description}
                                        </p>
                                    </div>
                                    <span style={{
                                        backgroundColor: "rgba(0,207,255,0.1)",
                                        color: "#00CFFF",
                                        padding: "4px 10px",
                                        borderRadius: "99px",
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        whiteSpace: "nowrap",
                                        marginLeft: "1rem"
                                    }}>
                                        {product.category}
                                    </span>
                                </div>

                                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <span style={{ color: "#F9A826", fontSize: "1.25rem", fontWeight: 800 }}>
                                        {formatRupiah(product.price)}
                                    </span>

                                    <div style={{ display: "flex", gap: "0.75rem" }}>
                                        <button
                                            onClick={() => handleProductAction(product, 'buy_now')}
                                            style={{
                                                flex: 1,
                                                backgroundColor: "#F9A826",
                                                color: "#0D1117",
                                                border: "none",
                                                borderRadius: "99px",
                                                padding: "10px 0",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                transition: "filter 0.2s"
                                            }}
                                            className="hover:brightness-110"
                                        >
                                            Beli
                                        </button>
                                        <button
                                            onClick={() => handleProductAction(product, 'cart')}
                                            style={{
                                                backgroundColor: "#00CFFF",
                                                color: "#0D1117",
                                                border: "none",
                                                borderRadius: "99px",
                                                width: "44px",
                                                height: "44px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                transition: "filter 0.2s"
                                            }}
                                            className="hover:brightness-110"
                                            aria-label="Add to cart"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Add-on Modal */}
                <AnimatePresence>
                    {isAddonModalOpen && selectedProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // modal di tengah layar
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                            onClick={() => setIsAddonModalOpen(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                onClick={(e) => e.stopPropagation()}
                                // lebarin box modal biar lebih lega
                                className="w-full max-w-xl bg-[#161b22] rounded-2xl p-6 border border-slate-800 shadow-2xl relative"
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                    <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#f8fafc" }}>Tambah Kustomisasi</h2>
                                    <button 
                                        onClick={() => setIsAddonModalOpen(false)}
                                        style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.5rem" }}
                                    >
                                        &times;
                                    </button>
                                </div>
                                
                                <p style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
                                    Pilih tambahan untuk <strong style={{ color: "#00CFFF" }}>{selectedProduct.name}</strong> kamu:
                                </p>

                                {/* ubah list ke grid card biar ga kopong */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 mb-4">
                                    {addonsData.map(addon => {
                                        const isSelected = selectedAddonsLocal.includes(addon.id);
                                        return (
                                            /* card bisa diklik semua biar UX enak */
                                            <div 
                                                key={addon.id}
                                                onClick={() => handleToggleAddon(addon.id)}
                                                className={`relative flex flex-col justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${isSelected ? 'border-[#00CFFF] bg-[#00CFFF]/10' : 'border-slate-800 bg-[#0D1117] hover:border-slate-600'}`}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                                    <div style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "4px",
                                                        border: isSelected ? "none" : "2px solid #64748b",
                                                        backgroundColor: isSelected ? "#00CFFF" : "transparent",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0
                                                    }}>
                                                        {isSelected && (
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D1117" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="20 6 9 17 4 12" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span style={{ color: "#f8fafc", fontWeight: 500 }}>{addon.name}</span>
                                                </div>
                                                <div className="text-[#F9A826] font-semibold mt-3">
                                                    {addon.price > 0 ? `+${formatRupiah(addon.price)}` : "Gratis"}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={handleConfirmAddToCart}
                                    style={{
                                        width: "100%",
                                        padding: "1rem",
                                        borderRadius: "99px",
                                        backgroundColor: "#00CFFF",
                                        color: "#0D1117",
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "filter 0.2s",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "0.5rem"
                                    }}
                                    className="hover:brightness-110"
                                >
                                    Masukkan ke Keranjang
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </main>
    );
}
