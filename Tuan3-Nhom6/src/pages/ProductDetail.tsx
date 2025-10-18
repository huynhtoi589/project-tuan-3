import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { useToast } from "../context/toastCore";

// 💰 Hàm định dạng tiền tệ VNĐ
const formatCurrency = (priceUSD: number): string => {
  const rate = 25000; // 1 USD ≈ 25,000 VNĐ
  const priceVND = priceUSD * rate;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceVND);
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { showToast } = useToast();

  const handleBack = () => navigate(-1);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return res.data;
    },
  });

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    showToast("✅ Đã thêm vào giỏ hàng!");
  };

  if (isLoading) return <p className="text-center py-8">Đang tải...</p>;
  if (isError)
    return (
      <p className="text-center py-8 text-red-600">
        Lỗi tải sản phẩm!
      </p>
    );

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
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-xs w-full object-contain"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600">{product.description}</p>

          {/* 💰 Hiển thị giá VNĐ */}
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
}

export default ProductDetail;
