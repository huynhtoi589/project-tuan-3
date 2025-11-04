import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  phone: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
  status: "pending" | "success" | "canceled";
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  deleteOrder: (id: string) => void; // ✅ thêm hàm xoá
  updateStatus: (id: string, status: Order["status"]) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        })),
    }),
    {
      name: "ORDERS_STORAGE", // ✅ Lưu LocalStorage tự động
    }
  )
);
