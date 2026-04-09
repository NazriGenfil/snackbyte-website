import { create } from 'zustand';

export interface NotificationItem {
    id: string;
    message: string;
}

interface NotificationState {
    notifications: NotificationItem[];
    addNotification: (message: string) => void;
    removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    // auto-hapus biar gak menuh-menuhin layar
    addNotification: (message) => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({
            notifications: [...state.notifications, { id, message }]
        }));
        setTimeout(() => {
            set((state) => ({
                notifications: state.notifications.filter((n) => n.id !== id)
            }));
        }, 3000);
    },
    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
    }))
}));
