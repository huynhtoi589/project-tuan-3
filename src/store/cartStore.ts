import { create } from "zustand";
import type { Product } from "../types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === item.id);
      if (exists) {
        return {
          cart: state.cart.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((p) => p.id !== id) })),

  clearCart: () => set({ cart: [] }),

  increaseQty: (id) =>
    set((state) => ({
      cart: state.cart.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      ),
    })),

  decreaseQty: (id) =>
    set((state) => ({
      cart: state.cart
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
        )
        .filter((p) => p.quantity > 0),
    })),
}));
