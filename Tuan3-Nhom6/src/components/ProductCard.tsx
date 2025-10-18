import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useToast } from "../context/toastCore";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

// ✅ Định dạng tiền VNĐ
const formatCurrency = (priceUSD: number): string => {
  const rate = 25000;
  const priceVND = priceUSD * rate;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceVND);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    showToast("✅ Đã thêm vào giỏ hàng!");
  };

  return (
    <div
      className="bg-[#f9f9f9] rounded-2xl p-5 text-center text-gray-800 
      shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]
      transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
    >
      {/* Ảnh sản phẩm */}
      <Link to={`/product/${product.id}`} className="block relative flex-1 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-3 rounded-lg transition-transform duration-300 hover:scale-105"
        />
        <h3 className="font-medium text-gray-800 text-center line-clamp-2 min-h-[3rem] leading-snug">
          {product.title}
        </h3>
      </Link>

      {/* Giá + khuyến mãi */}
      <div className="mt-auto">
        <p className="text-yellow-600 font-bold text-lg mb-1">
          {formatCurrency(product.price)}
        </p>
        

        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold 
          px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all w-full"
        >
          🛍️ Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
