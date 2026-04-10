"use client";

import { useCartStore } from "@/store/useCartStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { motion } from "framer-motion";

// tarik data dari json biar gak ribet
import addonsData from "@/data/addons.json";

export default function KustomisasiPage() {
    const { selectedAddons, updateAddonQuantity, getTotalAddonPrice } = useCartStore();
    const addNotification = useNotificationStore(state => state.addNotification);

    const formatRupiah = (price: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
    };

    const handleSave = () => {
        // kasih notif sukses pas disimpen
        addNotification("Kustomisasi berhasil disimpan!");
    };

    return (
        <main style={{ minHeight: "100vh", padding: "80px 2rem", flex: 1, backgroundColor: "#0D1117" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                
                {/* Header */}
                {/* Header */}
                {/* judul turun dari atas cepet */}
                <motion.div 
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ textAlign: "center", marginBottom: "3rem" }}
                >
                    <h1 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
                        Kustomisasi Pesanan
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: "1.1rem", margin: 0 }}>
                        Personalisasi pesananmu dengan berbagai pilihan add-ons
                    </p>
                </motion.div>

                {/* Add-ons Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Add-ons Grid */}
                    {/* list add-ons nongol satu-satu dari bawah biar estetik */}
                    <motion.div 
                        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
                        initial="hidden"
                        animate="visible"
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: "3rem" }}
                    >
                        {/* mapping add-ons biar dinamis */}
                        {addonsData.map(addon => {
                            const selectedInfo = selectedAddons.find(a => a.id === addon.id);
                            const qty = selectedInfo ? selectedInfo.quantity : 0;

                            return (
                                <motion.div 
                                    key={addon.id} 
                                    variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 30 } }}
                                    transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                                    style={{ 
                                        backgroundColor: '#161b22', 
                                        border: '1px solid #30363d', 
                                        borderRadius: '1rem', 
                                        padding: '1.5rem',
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem"
                                    }}
                                >
                                {/* animasi halus biar kustomisasi berasa responsif */}
                                <div>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>{addon.name}</h3>
                                    <span style={{ color: "#F9A826", fontWeight: 600 }}>{formatRupiah(addon.price)}</span>
                                </div>
                                
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
                                    <button 
                                        onClick={() => updateAddonQuantity(addon, -1)}
                                        style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0D1117", border: "1px solid #30363d", color: "white", borderRadius: "0.5rem", cursor: "pointer", transition: "all 0.2s" }}
                                        className="hover:bg-slate-700 hover:border-slate-600 transition-colors"
                                    >-</button>
                                    <span style={{ fontWeight: 600, minWidth: "24px", textAlign: "center", color: "#f8fafc" }}>{qty}</span>
                                    <button 
                                        onClick={() => updateAddonQuantity(addon, 1)}
                                        style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0D1117", border: "1px solid #30363d", color: "white", borderRadius: "0.5rem", cursor: "pointer", transition: "all 0.2s" }}
                                        className="hover:bg-slate-700 hover:border-slate-600 transition-colors"
                                    >+</button>
                                </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Ringkasan Kustomisasi */}
                {selectedAddons.length > 0 && (
                    <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '1rem', padding: '2rem', maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "#f8fafc" }}>Ringkasan Kustomisasi</h2>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {selectedAddons.map(item => (
                                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", color: "#cbd5e1" }}>
                                    <span>{item.name} ({item.quantity}x)</span>
                                    <span style={{ fontWeight: 600 }}>{formatRupiah(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ height: "1px", backgroundColor: "#30363d", width: "100%" }}></div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: 600, color: "#f8fafc" }}>Total Add-ons</span>
                            <span style={{ color: "#F9A826", fontSize: "1.5rem", fontWeight: 800 }}>{formatRupiah(getTotalAddonPrice())}</span>
                        </div>

                        <button 
                            onClick={handleSave}
                            style={{
                                width: "100%",
                                backgroundColor: "#F9A826",
                                color: "#0D1117",
                                padding: "16px 0",
                                borderRadius: "99px",
                                fontWeight: 800,
                                border: "none",
                                cursor: "pointer",
                                fontSize: "1.1rem",
                                marginTop: "1rem"
                            }}
                            className="hover:brightness-110 transition-all"
                        >
                            Simpan Kustomisasi
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
