import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useToast } from "../context/toastCore";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  address: yup.string().required("Vui lòng nhập địa chỉ"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
});

const Checkout: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (!items.length) {
      showToast("🛒 Giỏ hàng đang trống!");
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customerName: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      items: [...items],
      totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    addOrder(newOrder);
    clearCart();
    showToast("✅ Đặt hàng thành công!");
    navigate("/");
  };

  if (!items.length) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        🛒 Giỏ hàng đang trống — hãy thêm sản phẩm để tiếp tục!
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10 border">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        🧾 THÔNG TIN THANH TOÁN
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Họ tên */}
        <div>
          <input
            {...register("name")}
            placeholder="Họ và tên"
            className="w-full p-3 border rounded"
          />
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="w-full p-3 border rounded"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        {/* Địa chỉ */}
        <div>
          <input
            {...register("address")}
            placeholder="Địa chỉ"
            className="w-full p-3 border rounded"
          />
          <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
        </div>

        {/* SĐT */}
        <div>
          <input
            {...register("phone")}
            placeholder="Số điện thoại"
            className="w-full p-3 border rounded"
          />
          <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
        </div>

        {/* Nút đặt hàng */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white font-semibold rounded-lg transition ${
            isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Đang xử lý..." : "✅ ĐẶT HÀNG NGAY"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
