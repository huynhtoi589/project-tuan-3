import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import type { Product } from "../types/product";
import { useToast } from "../context/toastCore";
import { Link } from "react-router-dom";

const STORAGE_KEY = "app_products";

const loadFromStorage = (): Product[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const Products: React.FC = () => {
  // Hooks luôn ở top level
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const { showToast } = useToast();

  // Load dữ liệu
  useEffect(() => {
    setData(loadFromStorage());

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setData(loadFromStorage());
    };
    const onCustom = () => setData(loadFromStorage());

    window.addEventListener("storage", onStorage);
    window.addEventListener("app_products_updated", onCustom as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(
        "app_products_updated",
        onCustom as EventListener
      );
    };
  }, []);

  // Categories từ data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map((p) => p.category || "khác")));
    return ["all", ...cats];
  }, [data]);

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let items = data.filter((p) =>
      (p.title || "").toLowerCase().includes(search.toLowerCase().trim())
    );

    items = items.filter((p) =>
      category === "all"
        ? true
        : (p.category || "").toLowerCase().trim() ===
          category.toLowerCase().trim()
    );

    if (sortOrder === "asc")
      items = [...items].sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortOrder === "desc")
      items = [...items].sort((a, b) => (b.price || 0) - (a.price || 0));

    return items;
  }, [data, search, category, sortOrder]);

  // Loading nếu chưa có data
  if (!data) return <Loading />;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[380px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center">
        <img
          src="/images/banner-SanPham.webp"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 text-center text-gray-900">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            TẤT CẢ SẢN PHẨM
          </h1>
          <p className="text-gray-700 font-medium">
            Gợi ý top các sản phẩm được yêu thích
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600 transition">
          Trang chủ
        </Link>{" "}
        <span className="mx-2">{">"}</span>
        <span className="text-blue-700 font-semibold">Danh sách sản phẩm</span>
      </div>

      {/* Filter panel */}
      <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 mb-10 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-64 md:w-72">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  showToast(
                    `📦 Lọc theo danh mục: ${c === "all" ? "Tất cả" : c}`
                  );
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

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-600">Sắp xếp:</label>
            <select
              value={sortOrder}
              onChange={(e) => {
                const v = e.target.value as "none" | "asc" | "desc";
                setSortOrder(v);
                if (v === "asc") showToast("⬆️ Giá tăng dần");
                else if (v === "desc") showToast("⬇️ Giá giảm dần");
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

      {/* Product list */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Không tìm thấy sản phẩm phù hợp 😢
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fadeIn">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
