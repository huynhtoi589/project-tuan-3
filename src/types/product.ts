export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  material?: string;
  stock?: number; // ✅ số lượng tồn kho
}

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}
