export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  material?: string; // ✅ thêm dòng này
}

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}
