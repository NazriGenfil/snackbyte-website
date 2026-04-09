import { create } from 'zustand';

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface AddonItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    
    selectedAddons: AddonItem[];
    updateAddonQuantity: (addon: Omit<AddonItem, 'quantity'>, change: number) => void;
    getTotalAddonPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    // masukin ke zustand biar kesimpen pas pindah page
    addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
            return {
                cart: state.cart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
    updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
    })),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
    })),
    clearCart: () => set({ cart: [], selectedAddons: [] }),
    getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // buat simpen extra topping
    selectedAddons: [],
    updateAddonQuantity: (addon, change) => set((state) => {
        const existing = state.selectedAddons.find(a => a.id === addon.id);
        if (existing) {
            const newQty = existing.quantity + change;
            if (newQty <= 0) {
                return { selectedAddons: state.selectedAddons.filter(a => a.id !== addon.id) };
            }
            return {
                selectedAddons: state.selectedAddons.map(a => 
                    a.id === addon.id ? { ...a, quantity: newQty } : a
                )
            };
        }
        if (change > 0) {
            return { selectedAddons: [...state.selectedAddons, { ...addon, quantity: change }] };
        }
        return state;
    }),
    
    // itung total tambahan biar pas
    getTotalAddonPrice: () => {
        return get().selectedAddons.reduce((total, addon) => total + (addon.price * addon.quantity), 0);
    }
}));
