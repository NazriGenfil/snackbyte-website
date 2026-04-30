"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function KeranjangPage() {
    const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice, selectedAddons, getTotalAddonPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // form data diri sebelum checkout
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [orderType, setOrderType] = useState("Ambil di Market Day");

    useEffect(() => {
        // benerin hydration biar gak error pas render
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
    };

    // gas ke whatsapp buat jualan
    const handleCheckoutClick = () => {
        setIsCheckoutModalOpen(true);
    };

    const processWhatsAppOrder = () => {
        if (!customerName || !customerPhone) return;

        const phone = "6283161858766";
        // kumpulin data buat WA
        let text = `Halo Min, konfirmasi pesanan:\n\n`;
        text += `Nama: ${customerName}\n`;
        text += `No: ${customerPhone}\n`;
        text += `Tipe: ${orderType}\n\n`;
        text += `Pesanan:\n`;

        cart.forEach(item => {
            text += `- ${item.quantity}x ${item.name} (${formatRupiah(item.price * item.quantity)})\n`;
        });

        if (selectedAddons.length > 0) {
            text += `\nTambahan:\n`;
            selectedAddons.forEach(addon => {
                text += `- ${addon.quantity}x ${addon.name} (${formatRupiah(addon.price * addon.quantity)})\n`;
            });
        }

        const grandTotal = getTotalPrice() + getTotalAddonPrice();
        text += `\nTotal: ${formatRupiah(grandTotal)}\n`;
        text += `(Bukti bayar terlampir)`;

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
        setIsCheckoutModalOpen(false);
    };

    if (!mounted) return <div style={{ minHeight: "100vh", backgroundColor: "#0D1117" }}></div>;

    // kalo kosong kasih semangat buat belanja
    if (cart.length === 0) {
        return (
            <main style={{ minHeight: "100vh", padding: "100px 2rem", flex: 1, backgroundColor: "#0D1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#30363d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    <div>
                        <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
                            Keranjang Belanja Kosong
                        </h1>
                        <p style={{ color: "#94a3b8", fontSize: "1.1rem", margin: 0 }}>
                            Belum ada produk di keranjang. Yuk mulai belanja!
                        </p>
                    </div>
                    <Link href="/katalog" style={{
                        backgroundColor: "#00CFFF",
                        color: "#0D1117",
                        padding: "16px 32px",
                        borderRadius: "9999px",
                        fontWeight: 700,
                        display: "inline-flex",
                        textDecoration: "none",
                        marginTop: "1rem"
                    }}>
                        Lihat Katalog
                    </Link>
                </div>
            </main>
        );
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <main style={{ minHeight: "100vh", padding: "80px 2rem", flex: 1, backgroundColor: "#0D1117" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

                <h1 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 2rem 0", color: "#f8fafc" }}>
                    Keranjang Belanja
                </h1>

                <div
                    style={{
                        display: "grid",
                        gap: "2rem",
                        width: "100%"
                    }}
                    className="grid-cols-1 md:grid-cols-[1fr_400px]"
                >
                    {/* Kiri: Daftar Items */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {cart.map(item => (
                            <div key={item.id} style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1.5rem",
                                padding: "1.5rem",
                                backgroundColor: "#161b22",
                                borderRadius: "1rem",
                                border: "1px solid #30363d",
                                flexWrap: "wrap"
                            }}>
                                <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "0.75rem", overflow: "hidden", flexShrink: 0 }}>
                                    {/* pake next/image biar loading secepat kilat */}
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="80px" />
                                </div>

                                <div style={{ flex: 1, minWidth: "200px" }}>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>{item.name}</h3>
                                    <span style={{ color: "#F9A826", fontWeight: 600 }}>{formatRupiah(item.price)}</span>

                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0D1117", border: "1px solid #30363d", color: "white", borderRadius: "0.5rem", cursor: "pointer" }}
                                        >-</button>
                                        <span style={{ fontWeight: 600, minWidth: "24px", textAlign: "center" }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0D1117", border: "1px solid #30363d", color: "white", borderRadius: "0.5rem", cursor: "pointer" }}
                                        >+</button>
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
                                    <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>{formatRupiah(item.price * item.quantity)}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ backgroundColor: "transparent", border: "none", color: "#f87171", cursor: "pointer", padding: "0.5rem", display: "flex", alignItems: "center" }}
                                        aria-label="Hapus item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Kanan: Ringkasan */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{
                            padding: "2rem",
                            backgroundColor: "#161b22",
                            borderRadius: "1rem",
                            border: "1px solid #30363d",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem"
                        }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#f8fafc" }}>Ringkasan Pesanan</h2>

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                                <span>Jumlah Item</span>
                                <span style={{ color: "#f8fafc", fontWeight: 600 }}>{totalItems}</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                                <span>Subtotal</span>
                                <span style={{ color: "#f8fafc", fontWeight: 600 }}>{formatRupiah(getTotalPrice())}</span>
                            </div>

                            {/* tampilin detail tambahan biar user gak bingung */}
                            {selectedAddons.length > 0 ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    <span style={{ color: "#94a3b8" }}>Add-ons Kustom:</span>
                                    {selectedAddons.map(addon => (
                                        <div key={addon.id} style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.9rem", paddingLeft: "1rem" }}>
                                            <span>- {addon.name} ({addon.quantity}x)</span>
                                            <span style={{ color: "#f8fafc", fontWeight: 500 }}>{formatRupiah(addon.price * addon.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                                    <span>Add-ons Kustom</span>
                                    <span style={{ color: "#64748b", fontWeight: 500 }}>Tidak ada</span>
                                </div>
                            )}

                            <div style={{ height: "1px", backgroundColor: "#30363d", width: "100%" }}></div>

                            {/* itung total biar bener harganya */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontWeight: 600 }}>Total Harga</span>
                                <span style={{ color: "#F9A826", fontSize: "1.5rem", fontWeight: 800 }}>{formatRupiah(getTotalPrice() + getTotalAddonPrice())}</span>
                            </div>

                            <button
                                onClick={handleCheckoutClick}
                                style={{
                                    width: "100%",
                                    backgroundColor: "#00CFFF",
                                    color: "#0D1117",
                                    padding: "16px 0",
                                    borderRadius: "99px",
                                    fontWeight: 800,
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "1.05rem",
                                    marginTop: "0.5rem"
                                }}
                            >
                                Proses Pesanan
                            </button>

                            <button
                                onClick={clearCart}
                                style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    color: "#f87171",
                                    padding: "12px 0",
                                    borderRadius: "99px",
                                    fontWeight: 600,
                                    border: "1px solid rgba(248, 113, 113, 0.4)",
                                    cursor: "pointer"
                                }}
                            >
                                Kosongkan Keranjang
                            </button>

                            <p style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center", margin: 0, marginTop: "0.5rem" }}>
                                Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Checkout Modal */}
            <AnimatePresence>
                {isCheckoutModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 1000,
                            backgroundColor: "rgba(13, 17, 23, 0.8)",
                            backdropFilter: "blur(4px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem"
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{
                                backgroundColor: "#161b22",
                                width: "100%",
                                maxWidth: "500px",
                                borderRadius: "1.5rem",
                                border: "1px solid #30363d",
                                padding: "2rem",
                                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                                maxHeight: "90vh",
                                overflowY: "auto"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#f8fafc" }}>Data Pesanan</h2>
                                <button
                                    onClick={() => setIsCheckoutModalOpen(false)}
                                    style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "1.5rem" }}
                                >
                                    &times;
                                </button>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Masukkan nama..."
                                        style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #30363d", backgroundColor: "#0D1117", color: "white" }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>Nomor WhatsApp</label>
                                    <input
                                        type="text"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        placeholder="08..."
                                        style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #30363d", backgroundColor: "#0D1117", color: "white" }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#cbd5e1", fontSize: "0.9rem" }}>Tipe Pesanan</label>
                                    {/* dropdown pre-order atau market day */}
                                    <select
                                        value={orderType}
                                        onChange={(e) => setOrderType(e.target.value)}
                                        style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid #30363d", backgroundColor: "#0D1117", color: "white" }}
                                    >
                                        <option value="Ambil di Market Day">Ambil di Market Day</option>
                                        <option value="Pre-order">Pre-order</option>
                                    </select>
                                </div>

                                <div style={{ width: "100%", padding: "1rem", backgroundColor: "#ffffff", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Image
                                        src="/images/qris.jpeg"
                                        alt="QRIS Pembayaran SnackByte"
                                        width={250}
                                        height={250}
                                        style={{ objectFit: "contain", borderRadius: "0.25rem" }}
                                    />
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #30363d" }}>
                                    <span style={{ color: "#94a3b8" }}>Total Bayar</span>
                                    <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#F9A826" }}>{formatRupiah(getTotalPrice() + getTotalAddonPrice())}</span>
                                </div>

                                <button
                                    onClick={processWhatsAppOrder}
                                    disabled={!customerName || !customerPhone}
                                    style={{
                                        width: "100%",
                                        padding: "1rem",
                                        borderRadius: "99px",
                                        backgroundColor: (!customerName || !customerPhone) ? "#30363d" : "#00CFFF",
                                        color: (!customerName || !customerPhone) ? "#94a3b8" : "#0D1117",
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                        border: "none",
                                        cursor: (!customerName || !customerPhone) ? "not-allowed" : "pointer",
                                        transition: "all 0.2s",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        marginTop: "0.5rem"
                                    }}
                                    className={(!customerName || !customerPhone) ? "" : "hover:brightness-110"}
                                >
                                    Konfirmasi via WA
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
