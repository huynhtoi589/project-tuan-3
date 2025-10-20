export interface Product {
  id: string;
  title: string;
  price: number;
  image: string; // link ảnh nhập từ Admin
  description: string;
  category?: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
