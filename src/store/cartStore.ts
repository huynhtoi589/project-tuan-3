import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/product";
import { useProductStore } from "./productStore";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  decreaseQuantity: (id: number | string) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
  syncCartWithProducts: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Thêm kiểm tra tồn kho
      addToCart: (item) =>
        set((state) => {
          const products = useProductStore.getState().products;
          const product = products.find((p) => p.id === item.id);

          if (!product) {
            toast.error("❌ Sản phẩm không tồn tại!");
            return state;
          }

          const exist = state.items.find((i) => i.id === item.id);
          if (exist) {
            // ⚠️ Kiểm tra vượt tồn kho
            if (exist.quantity + item.quantity > product.stock) {
              toast.warning(`Chỉ còn ${product.stock} sản phẩm trong kho!`);
              return state;
            }

            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // ⚠️ Kiểm tra ngay từ đầu khi thêm mới
          if (item.quantity > product.stock) {
            toast.warning(`Chỉ có ${product.stock} sản phẩm trong kho!`);
            return state;
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
