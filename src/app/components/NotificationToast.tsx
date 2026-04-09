"use client";

import { useState } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";

export default function NotificationToast() {
    const notifications = useNotificationStore(state => state.notifications);
    const [isHovered, setIsHovered] = useState(false);

    if (notifications.length === 0) return null;

    // biar notifnya numpuk estetik, pas di-hover langsung muncul semua
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
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ position: "relative", width: "100%", height: isHovered ? `${notifications.length * 68}px` : "60px", transition: "height 0.3s ease" }}>
                {notifications.map((notif, index) => {
                    const reversedIndex = notifications.length - 1 - index;
                    const ty = isHovered ? reversedIndex * 68 : reversedIndex * 12;
                    const scale = isHovered ? 1 : Math.max(1 - (reversedIndex * 0.05), 0.85);
                    const zIndex = 100 - reversedIndex;
                    const opacity = (!isHovered && reversedIndex > 2) ? 0 : 1;

                    return (
                        <div 
                            key={notif.id}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                transform: `translateY(${ty}px) scale(${scale})`,
                                zIndex,
                                opacity,
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                backgroundColor: "#064e3b",
                                color: "white",
                                padding: "16px",
                                borderRadius: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                                border: "1px solid #047857"
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>{notif.message}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
