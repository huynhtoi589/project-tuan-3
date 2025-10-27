import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/product"; 
import { useProductStore } from "./productStore"; 

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  syncCartWithProducts: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const exist = state.items.find((i) => i.id === item.id);
          if (exist) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          if (item.quantity === 1) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      syncCartWithProducts: () => {
        const products = useProductStore.getState().products;
        set((state) => ({
          items: state.items
            .map((i) => {
              const product = products.find((p) => p.id === i.id);
              if (!product) return null;
              return { ...i, price: product.price };
            })
            .filter(Boolean) as CartItem[],
        }));
      },
    }),
    {
      name: "CART_STORAGE",
    }
  )
);
