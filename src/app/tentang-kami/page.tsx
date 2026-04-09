"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import aboutData from "@/data/about.json";

export default function TentangKamiPage() {
    const { history, values, timeline } = aboutData;
    
    // buat slideshow otomatis biar makin keren
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // itung jumlah gambar dulu baru pasang timer
    useEffect(() => {
        if (history.images.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % history.images.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [history.images.length]);

    return (
        <main style={{ minHeight: "100vh", padding: "80px 2rem", flex: 1, backgroundColor: "#0D1117" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "6rem" }}>
                
                {/* 1. Header Section */}
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ fontSize: "3rem", fontWeight: 800, margin: "0 0 1rem 0", color: "#f8fafc" }}>
                        Tentang Kami
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto" }}>
                        Mengenal lebih dekat siapa kami dan apa yang membuat SnackByte begitu istimewa.
                    </p>
                </div>

                {/* 2. History Section (Flexbox 2 Columns) */}
                <section style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center" }}>
                    <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        <h2 style={{ fontSize: "2.5rem", fontWeight: 800, margin: 0, color: "#00CFFF" }}>
                            {history.title}
                        </h2>
                        <div style={{ color: "#cbd5e1", fontSize: "1.1rem", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                            {history.content}
                        </div>
                    </div>
                    
                    {/* Slideshow Component */}
                    <div style={{ 
                        flex: "1 1 500px", 
                        position: "relative", 
                        height: "400px", 
                        borderRadius: "2rem", 
                        overflow: "hidden",
                        boxShadow: "0 0 40px rgba(0, 207, 255, 0.15)",
                        border: "1px solid #1e2a3a"
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            >
                                {/* ganti ke webp biar file enteng banget */}
                                <Image
                                    src={history.images[currentImageIndex]}
                                    alt={`History image ${currentImageIndex + 1}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* 3. Values Section */}
                <section style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 800, textAlign: "center", margin: 0, color: "#f8fafc" }}>
                        Nilai-Nilai Kami
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                        {values.map(val => (
                            <div key={val.id} style={{ 
                                backgroundColor: "#161b22", 
                                border: `1px solid ${val.color}40`,
                                borderTop: `4px solid ${val.color}`,
                                borderRadius: "1rem", 
                                padding: "2rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                transition: "transform 0.3s ease"
                            }} className="hover:-translate-y-2">
                                <span style={{ fontSize: "3rem" }}>{val.icon}</span>
                                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "#f8fafc" }}>{val.title}</h3>
                                <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.6 }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Mission Banner */}
                <section style={{ 
                    background: "linear-gradient(135deg, #00CFFF 0%, #F9A826 100%)",
                    borderRadius: "2rem",
                    padding: "4rem 2rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3rem",
                    color: "#0D1117"
                }}>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <h2 style={{ fontSize: "3rem", fontWeight: 800, margin: "0 0 1rem 0" }}>
                            Mimpi Kami ke Depan
                        </h2>
                        <p style={{ fontSize: "1.2rem", fontWeight: 600, margin: 0, opacity: 0.9 }}>
                            Menginspirasi generasi baru dengan camilan yang inovatif, sehat, dan dapat diakses oleh siapa saja di seluruh dunia.
                        </p>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", marginTop: "1rem" }}>
                        {[
                            { icon: "🌍", text: "Ekspansi Global" },
                            { icon: "📦", text: "100+ Varian" },
                            { icon: "🥳", text: "1M+ Pelanggan" }
                        ].map((stat, idx) => (
                            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                                <span style={{ fontSize: "2.5rem" }}>{stat.icon}</span>
                                <span style={{ fontWeight: 800, fontSize: "1.2rem" }}>{stat.text}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Timeline Section */}
                {/* rapihin timeline perjalanan snackbyte */}
                <section style={{ display: "flex", flexDirection: "column", gap: "4rem", alignItems: "center" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 800, margin: 0, color: "#f8fafc" }}>
                        Perjalanan Kami
                    </h2>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "3rem", width: "100%", maxWidth: "800px", position: "relative" }}>
                        {/* Garis vertikal di tengah/kiri */}
                        <div style={{ position: "absolute", left: "40px", top: "0", bottom: "0", width: "2px", backgroundColor: "#30363d", zIndex: 0 }} className="hidden sm:block"></div>

                        {timeline.map((item, index) => (
                            <div key={index} style={{ display: "flex", gap: "2rem", alignItems: "flex-start", position: "relative", zIndex: 1 }} className="flex-col sm:flex-row">
                                
                                {/* Bulatan Tahun */}
                                <div style={{ 
                                    width: "80px", 
                                    height: "80px", 
                                    borderRadius: "50%", 
                                    backgroundColor: "#161b22", 
                                    border: `2px solid ${item.color}`,
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    boxShadow: `0 0 20px ${item.color}30`
                                }}>
                                    <span style={{ color: item.color, fontWeight: 800, fontSize: "1.1rem" }}>
                                        {item.year}
                                    </span>
                                </div>
                                
                                {/* Konten Card */}
                                <div style={{ 
                                    flex: 1, 
                                    backgroundColor: "#161b22", 
                                    padding: "2rem", 
                                    borderRadius: "1.5rem", 
                                    border: "1px solid #30363d",
                                    borderLeft: `4px solid ${item.color}`
                                }}>
                                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 0.5rem 0", color: "#f8fafc" }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.6 }}>
                                        {item.desc}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
