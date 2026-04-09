"use client";

import Image from "next/image";

import { useState } from "react";
import { useCartStore, Product } from "@/store/useCartStore";
import { useNotificationStore } from "@/store/useNotificationStore";
// import langsung aja biar gak drama fetch error 404
import productsData from "@/data/products.json";

export default function KatalogPage() {
    // pastiin data produk sinkron sama UI
    const [products] = useState<Product[]>(productsData as Product[]);
    const [filter, setFilter] = useState("Semua");
    const addToCart = useCartStore(state => state.addToCart);
    const addNotification = useNotificationStore(state => state.addNotification);

    // filter data biar user gak pusing nyari
    const filteredProducts = products.filter(p => filter === "Semua" ? true : p.category === filter);

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
    };

    // tombol gaspol langsung ke wa, biar user gak ribet masuk keranjang dulu
    const handleQuickBuy = (product: Product) => {
        const phone = "6281234567890";
        const text = `Halo SnackByte! Saya mau pesan ${product.name} langsung nih. Harganya ${formatRupiah(product.price)} kan? Mohon info pembayarannya ya!`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <main style={{ minHeight: "100vh", padding: "80px 2rem", flex: 1, backgroundColor: "#0D1117" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
                        Katalog Produk
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: "1.1rem", margin: 0 }}>
                        Pilih snack favoritmu dan tambahkan ke keranjang
                    </p>
                </div>

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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredProducts.map(product => (
                        // UI kartu produk sesuai figma
                        <div key={product.id} style={{
                            backgroundColor: "#161b22",
                            borderRadius: "1.5rem",
                            border: "1px solid #30363d",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column"
                        }}>
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
                                            // tombol gaspol langsung ke wa, biar user gak ribet masuk keranjang dulu
                                            onClick={() => handleQuickBuy(product)}
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
                                            // tambah ke cart zustand dengan icon juga
                                            onClick={() => {
                                                addToCart(product);
                                                addNotification(`${product.name} ditambahkan!`);
                                                // trigger dua kali biar efek tumpuknya langsung kelihatan estetik
                                                // setTimeout(() => addNotification(`Jangan lupa checkout di keranjang ya!`), 100);
                                            }}
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
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
