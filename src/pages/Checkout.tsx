// src/pages/Checkout.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import type { Order } from "../store/orderStore";
import { useToast } from "../context/toastCore";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
  payment: string;
};

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  payment: yup.string().required("Chọn phương thức thanh toán"),
});

const Checkout: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const onSubmit = async (data: FormData) => {
    if (!items.length) {
      showToast("🛒 Giỏ hàng đang trống!");
      return;
    }

    setIsProcessing(true);

    // Giả lập quá trình thanh toán 2s
    await new Promise((r) => setTimeout(r, 2000));

    const orderItems = items.map((i) => ({
      id: i.id,
      name: i.title,
      price: i.price,
      quantity: i.quantity,
      image: i.image ?? "",
    }));

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerName: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      items: orderItems,
      totalPrice: total,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    addOrder(newOrder);
    clearCart();

    setIsProcessing(false);
    setShowSuccess(true);
    showToast("🎉 Thanh toán thành công! Cảm ơn bạn đã mua hàng.");

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 3000);
  };

  if (!items.length) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        🛒 Giỏ hàng đang trống — hãy thêm sản phẩm để tiếp tục!
      </p>
    );
  }

  return (
    <>
      {/* === Popup cảm ơn === */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto">
            <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Đặt hàng thành công!
            </h2>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã mua sắm tại <span className="font-semibold">T.Store</span>
            </p>
            <p className="text-sm text-gray-500">
              Bạn sẽ được chuyển về trang chủ sau ít giây...
            </p>
          </div>
        </div>
      )}

      {/* === Giao diện chính === */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden border relative">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-40">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-600 font-medium">Đang xử lý thanh toán...</p>
          </div>
        )}

        <div className="grid md:grid-cols-2">
          {/* === Form thông tin === */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
              🧾 Thông tin thanh toán
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="font-medium text-gray-700">Họ và tên</label>
                <input
                  {...register("name")}
                  placeholder="Nguyễn Văn A"
                  className="w-full p-3 border rounded-md mt-1"
                />
                <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
              </div>

              <div>
                <label className="font-medium text-gray-700">Email</label>
                <input
                  {...register("email")}
                  placeholder="email@example.com"
                  type="email"
                  className="w-full p-3 border rounded-md mt-1"
                />
                <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
              </div>

              <div>
                <label className="font-medium text-gray-700">Địa chỉ giao hàng</label>
                <input
                  {...register("address")}
                  placeholder="123 Đường ABC, Quận 1, TP.HCM"
                  className="w-full p-3 border rounded-md mt-1"
                />
                <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
              </div>

              <div>
                <label className="font-medium text-gray-700">Số điện thoại</label>
                <input
                  {...register("phone")}
                  placeholder="0123456789"
                  className="w-full p-3 border rounded-md mt-1"
                />
                <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
              </div>

              <div>
                <label className="font-medium text-gray-700">Phương thức thanh toán</label>
                <select
                  {...register("payment")}
                  className="w-full p-3 border rounded-md mt-1"
                >
                  <option value="">-- Chọn phương thức --</option>
                  <option value="cod">💵 Thanh toán khi nhận hàng (COD)</option>
                  <option value="bank">🏦 Chuyển khoản ngân hàng</option>
                </select>
                <p className="text-red-500 text-sm mt-1">{errors.payment?.message}</p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 text-white font-semibold rounded-lg transition mt-6 ${
                  isProcessing ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isProcessing ? "Đang xử lý..." : "✅ ĐẶT HÀNG NGAY"}
              </button>
            </form>

            <Link
              to="/cart"
              className="block text-center text-blue-500 hover:underline mt-4"
            >
              ← Quay lại giỏ hàng
            </Link>
          </div>

          {/* === Tóm tắt đơn hàng === */}
          <div className="p-8 bg-white border-l">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
              🛍️ Đơn hàng của bạn
            </h2>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      SL: {item.quantity} × {item.price.toLocaleString()}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-lg font-semibold text-gray-700">
                <span>Tổng cộng:</span>
                <span className="text-green-600">{total.toLocaleString()} ₫</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                (Đã bao gồm VAT nếu có)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
