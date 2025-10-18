import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

// 💰 Hàm định dạng tiền tệ VNĐ
const formatCurrency = (priceUSD: number): string => {
  const rate = 25000; // 1 USD ≈ 25,000 VNĐ
  const priceVND = priceUSD * rate;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceVND);
};

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <div className="text-center py-12">
        <h2 className="text-xl mb-4">🛒 Giỏ hàng trống</h2>
        <Link to="/" className="text-blue-600 underline hover:text-blue-800">
          Tiếp tục mua sắm
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Giỏ hàng của bạn
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item.title}</p>
              {/* 💰 Hiển thị giá tiền VNĐ */}
              <p className="text-blue-600 font-semibold">
                {formatCurrency(item.price)}
              </p>
            </div>

            {/* ✅ Nút tăng giảm số lượng */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-200 hover:bg-gray-300 px-2 rounded-md"
              >
                −
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-200 hover:bg-gray-300 px-2 rounded-md"
              >
                +
              </button>
            </div>

            {/* ❌ Xóa sản phẩm */}
            <button
              className="text-red-500 hover:text-red-600 ml-4 font-medium"
              onClick={() => removeFromCart(item.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* 💵 Tổng cộng */}
      <div className="text-right mt-8">
        <p className="font-semibold text-xl mb-3 text-blue-600">
          Tổng cộng: {formatCurrency(total)}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
          >
            Xóa giỏ
          </button>
          <Link
            to="/checkout"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
