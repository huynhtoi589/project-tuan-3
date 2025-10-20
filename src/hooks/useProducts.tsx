import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";

// ✅ Dữ liệu giả PNJ
const jewelryProducts: Product[] = [
  // ... thêm các sản phẩm khác tương tự
];

const STORAGE_KEY = "app_products";

// ✅ Hàm load sản phẩm từ localStorage
function loadProducts(): Product[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw) as Product[];
  return jewelryProducts;
}

// ✅ Hàm lưu sản phẩm vào localStorage
function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// -------------------- Hook useProducts --------------------
export function useProducts(options?: { admin?: boolean; featured?: boolean }) {
  const queryClient = useQueryClient();

  const query = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const products = loadProducts();
      if (products.length === 0) return jewelryProducts;
      if (options?.admin) return products;
      if (options?.featured) return products.slice(0, 4);
      return products;
    },
  });

  const addProduct = (product: Product) => {
    const products = loadProducts();
    products.push(product);
    saveProducts(products);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const updateProduct = (id: number, updated: Partial<Product>) => {
    const products = loadProducts();
    const index = products.findIndex((p) => p.id === String(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updated };
      saveProducts(products);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const deleteProduct = (id: number) => {
    let products = loadProducts();
    products = products.filter((p) => p.id !== String(id));
    saveProducts(products);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return { ...query, addProduct, updateProduct, deleteProduct };
}
