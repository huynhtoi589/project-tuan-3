import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number | string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (p: Product) => void;
  deleteProduct: (id: number | string) => void;
  updateProduct: (p: Product) => void;
  clearAll: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (p) =>
        set((state) => ({
          products: [p, ...state.products],
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      updateProduct: (p) =>
        set((state) => ({
          products: state.products.map((item) =>
            item.id === p.id ? p : item
          ),
        })),

      clearAll: () => set({ products: [] }),
    }),
    {
      name: "PRODUCTS_STORAGE", // ✅ Dữ liệu lưu ở localStorage
    }
  )
);
