import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCartStore } from "../store/cartStore";
import { axiosClient } from "../api/axiosClient";


type FormData = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

const schema = yup
  .object({
    name: yup.string().required("Vui lòng nhập tên"),
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
  })
  .required();

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCartStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Gửi đơn hàng giả lập
      await axiosClient.post("/carts", { user: data, items: cart });
      clearCart();
      alert("🎉 Đặt hàng thành công!");
    } catch {
      alert("❌ Lỗi khi gửi đơn hàng, vui lòng thử lại.");
    }
  };

  if (cart.length === 0) {
    return <p className="text-center mt-8 text-gray-600">🛒 Giỏ hàng trống</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Thanh toán</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name")}
            placeholder="Họ và tên"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
        </div>

        <div>
          <input
            {...register("address")}
            placeholder="Địa chỉ"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
        </div>

        <div>
          <input
            {...register("phone")}
            placeholder="Số điện thoại"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded text-white transition ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Đang gửi..." : "Đặt hàng"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
