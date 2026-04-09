"use client";

import { useState } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationToast() {
    const notifications = useNotificationStore(state => state.notifications);
    const [isHovered, setIsHovered] = useState(false);

    // notif numpuk estetik kaya figma
    // mekar pas di-hover jadi list
    return (
        <div 
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 9999,
                width: "320px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                paddingBottom: "20px",
                // biar kontainer notif gak ngeblock navbar
                pointerEvents: "none"
            }}
            // biar parent bisa handle hover kalau anak-anaknya di hover (karna pointer-events auto di anak tetep tembus event bubble)
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ position: "relative", width: "100%", height: isHovered ? `${notifications.length * 80}px` : "70px", transition: "height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                <AnimatePresence>
                    {notifications.map((notif, index) => {
                        const reversedIndex = notifications.length - 1 - index;
                        
                        const ty = isHovered ? reversedIndex * 80 : reversedIndex * 16;
                        const scale = isHovered ? 1 : Math.max(1 - (reversedIndex * 0.05), 0.85);
                        const zIndex = 100 - reversedIndex;
                        const opacity = isHovered 
                            ? 1 
                            : reversedIndex > 3 
                                ? 0
                                : 1 - reversedIndex * 0.2;

                        return (
                            <motion.div 
                                key={notif.id}
                                layout
                                // biar munculnya halus gak kaget
                                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                // gabungin state animasinya sama efek tumpuk
                                animate={{ 
                                    opacity: opacity, 
                                    y: ty, 
                                    scale: scale, 
                                    x: 0 
                                }}
                                // efek blur pas ilang biar makin pro
                                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex,
                                    backgroundColor: "#15803d",
                                    color: "white",
                                    padding: "12px 16px",
                                    borderRadius: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                                    border: "1px solid #166534",
                                    height: "68px",
                                    // tembusin sensor mouse ke bawah kalo gak kena kotak notif
                                    pointerEvents: "auto"
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                    <span style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.2 }}>Sukses!</span>
                                    {/* kasih waktu lebih lama biar user bisa baca */}
                                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#dcfce3", lineHeight: 1.2 }}>
                                        {notif.message}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
