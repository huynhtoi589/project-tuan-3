import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string; // ✅ hỗ trợ Base64
  category: string; // ✅ hỗ trợ phân loại sản phẩm
}

interface ProductStore {
  products: Product[];
  addProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (p: Product) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [
        {
          id: 1,
          name: "Dây chuyền bạc PNJ",
          price: 1250000,
          stock: 10,
          image: "/images/necklace1.png",
          category: "Bạc",
        },
        {
          id: 2,
          name: "Lắc tay vàng 14K PNJ",
          price: 6750000,
          stock: 5,
          image: "/images/bracelet1.png",
          category: "Vàng",
        },
      ],

      addProduct: (p) =>
        set((state) => ({
          products: [...state.products, p],
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      updateProduct: (updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === updated.id ? updated : p
          ),
        })),
    }),
    {
      name: "PRODUCTS_STORAGE", // ✅ Lưu LocalStorage để không mất khi reload
    }
  )
);
