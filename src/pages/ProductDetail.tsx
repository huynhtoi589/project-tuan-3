import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useToast } from "../context/toastCore";
import type { Product } from "../types/product";

const STORAGE_KEY = "app_products";

const formatCurrency = (priceUSD: number): string => {
  const rate = 25000;
  const priceVND = priceUSD * rate;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceVND);
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  const handleBack = () => navigate(-1);

  const data: Product[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const product = data.find((p) => p.id === id);

  if (!product) {
    return (
      <p className="text-center py-8 text-red-600">Không tìm thấy sản phẩm!</p>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    showToast("✅ Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
      >
        ⬅ Quay lại
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-md p-6 rounded-lg">
        {/* Ảnh sản phẩm */}
        <div className="flex-1 flex flex-col items-center">
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className="max-w-xs w-full object-contain rounded-md mb-4"
            />
          )}
          {product.category && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              {product.category}
            </span>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600">{product.description}</p>

          <p className="text-lg font-bold text-blue-600">
            {formatCurrency(product.price)}
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
