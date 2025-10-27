import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useToast } from "../context/toastCore";
import ProductCard from "../components/ProductCard";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === Number(id));

  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="text-center text-xl mt-20">
        ❌ Không tìm thấy sản phẩm
      </div>
    );
  }

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const increaseQty = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleAdd = () => {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
    });
    showToast(`🛒 Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link to="/products" className="text-sm text-gray-600 hover:text-black mb-6 inline-block">
        ← Quay lại
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hình Ảnh */}
        <div className="rounded-xl shadow p-4 bg-white flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>

        {/* Thông Tin */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-red-600 text-2xl font-bold">
            {product.price.toLocaleString()} đ
          </p>

          <div className="text-gray-600">
            <p>💎 Chất liệu: <span className="font-medium">{product.category}</span></p>
            <p>📦 Tồn kho: {product.stock} sản phẩm</p>
          </div>

          {/* Chọn số lượng */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={decreaseQty}
              className="w-10 h-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-bold"
            >
              -
            </button>

            <span className="text-xl font-semibold">{qty}</span>

            <button
              onClick={increaseQty}
              className="w-10 h-10 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-full text-lg font-bold"
            >
              +
            </button>

            <button
              disabled={product.stock === 0}
              onClick={handleAdd}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition text-white ${
                product.stock > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "🛒 Thêm vào giỏ hàng" : "Hết hàng"}
            </button>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4">🔗 Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
