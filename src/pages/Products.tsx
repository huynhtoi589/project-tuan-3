import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/productStore";
import { useToast } from "../context/toastCore";
import type { Product } from "../store/productStore";

const Products: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  if (sort === "asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  } else if (sort === "desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-10">
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-200">
        <img
          src="/images/banner-SanPham.webp"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <h1
          className="absolute inset-0 flex items-center justify-center 
          text-4xl md:text-5xl font-bold text-white z-20"
        >
          TẤT CẢ SẢN PHẨM
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 my-6">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            className="border p-2 rounded-md w-full sm:w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="Vàng">Vàng</option>
            <option value="Bạc">Bạc</option>
            <option value="Kim cương">Kim Cương</option>
            <option value="Trang sức">Trang Sức</option>
          </select>

          <select
            className="border p-2 rounded-md"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sắp xếp</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            Không tìm thấy sản phẩm phù hợp 🥲
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => showToast("🛒 Đã thêm vào giỏ hàng!")}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
