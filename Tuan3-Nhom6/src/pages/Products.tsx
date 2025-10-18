import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import { useToast } from "../context/toastCore";
import { Link } from "react-router-dom";

const Products: React.FC = () => {
  const { data, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const { showToast } = useToast();

  if (isLoading) return <Loading />;
  if (!data) return <p className="text-center mt-8">Không có sản phẩm</p>;

  // 👉 Lấy danh mục tự động từ dữ liệu
  const categories = ["all", ...new Set(data.map((p: Product) => p.category))];

  // 👉 Lọc sản phẩm theo từ khóa + danh mục
  let filteredProducts = data
    .filter((p: Product) =>
      p.title.toLowerCase().includes(search.toLowerCase().trim())
    )
    .filter(
      (p: Product) =>
        category === "all" ||
        p.category.toLowerCase().trim() === category.toLowerCase().trim()
    );

  // 👉 Sắp xếp theo giá
  if (sortOrder === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* 🌟 Banner đầu trang */}
      <div className="relative w-full h-[300px] md:h-[380px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center">
        <img
          src="/images/banner-SanPham.webp" // 👉 thay bằng banner thật của bạn
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 text-center text-gray-900">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            TẤT CẢ SẢN PHẨM BÁN CHẠY 2025
          </h1>
          <p className="text-gray-700 font-medium">
            Gợi ý top các sản phẩm được yêu thích nhất ✨
          </p>
        </div>
      </div>

      {/* 🧭 Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition">
          Trang chủ
        </Link>{" "}
        <span className="mx-2">{">"}</span>
        <span className="text-blue-700 font-semibold">
          Danh sách sản phẩm
        </span>
      </div>

      {/* 🌟 Bộ lọc PNJ style */}
<div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mb-10 max-w-6xl mx-auto">
  <div className="flex flex-wrap justify-center items-center gap-4">
    {/* 🔍 Thanh tìm kiếm */}
    <div className="relative w-full sm:w-64 md:w-72">
      <input
        type="text"
        placeholder="🔍 Tìm kiếm sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-3 top-3 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
    </div>

    {/* 🧭 Nút danh mục */}
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => {
            setCategory(c);
            showToast(`📦 Lọc theo danh mục: ${c === "all" ? "Tất cả" : c}`);
          }}
          className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 whitespace-nowrap ${
            category === c
              ? "bg-yellow-400 text-white border-yellow-400 shadow-md"
              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {c === "all" ? "Tất cả" : c}
        </button>
      ))}
    </div>

    {/* ⚙️ Bộ chọn sắp xếp */}
    <div className="flex items-center gap-2">
      <label className="font-medium text-gray-600">Sắp xếp:</label>
      <select
        value={sortOrder}
        onChange={(e) => {
          setSortOrder(e.target.value);
          if (e.target.value === "asc") showToast("⬆️ Giá tăng dần");
          else if (e.target.value === "desc") showToast("⬇️ Giá giảm dần");
        }}
        className="border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
      >
        <option value="none">Mặc định</option>
        <option value="asc">⬆ Giá tăng dần</option>
        <option value="desc">⬇ Giá giảm dần</option>
      </select>
    </div>
  </div>
</div>


      {/* 🧩 Danh sách sản phẩm */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Không tìm thấy sản phẩm phù hợp 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
            {filteredProducts.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
