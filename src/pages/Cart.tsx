// src/pages/Cart.tsx
import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/productStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { CartItem } from "../types/product"; // ✅ dùng kiểu rõ ràng

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
      <p className="text-lg text-gray-800 mb-4">{message}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
);

const Cart: React.FC = () => {
  const { items, removeFromCart, decreaseQuantity, addToCart, clearCart } =
    useCartStore();
  const { products } = useProductStore();
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const askConfirm = (message: string, action: () => void) => {
    setConfirm({ message, onConfirm: action });
  };

  // => NOTE: store methods may expect number id; cast to Number(...) to be safe
  const handleDecrease = (id: string | number, quantity: number) => {
    if (quantity === 1) {
      askConfirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?",
        () => {
          decreaseQuantity(Number(id));
          toast.success("🗑️ Đã xóa sản phẩm khỏi giỏ hàng!", {
            duration: 1000,
            position: "top-center",
          });
        }
      );
    } else {
      decreaseQuantity(Number(id));
    }
  };

  const handleRemove = (id: string | number) => {
    askConfirm("Bạn có chắc chắn muốn xóa sản phẩm này không?", () => {
      removeFromCart(Number(id));
      toast.success("🗑️ Đã xóa sản phẩm!", {
        duration: 1000,
        position: "top-center",
      });
    });
  };

  const handleClearCart = () => {
    if (items.length === 0) {
      toast.info("Giỏ hàng trống rồi!", {
        duration: 1000,
        position: "top-center",
      });
      return;
    }

    askConfirm(
      "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không?",
      () => {
        clearCart();
        toast.success("🧹 Đã xóa toàn bộ giỏ hàng!", {
          duration: 1000,
          position: "top-center",
        });
      }
    );
  };

  // ✅ Hàm tăng có kiểu rõ ràng (không dùng `any`)
  const handleIncrease = (item: CartItem) => {
    const product = products.find((p) => p.id === item.id);
    const stock = product?.stock ?? 0;

    if (item.quantity >= stock) {
      toast.warning(`⚠️ Chỉ còn ${stock} sản phẩm trong kho!`, {
        duration: 1500,
        position: "top-center",
      });
      return;
    }

    // addToCart kỳ này nhận CartItem (quantity = 1) — store sẽ cộng vào nếu đã tồn tại
    addToCart({ ...item, quantity: 1 });
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Giỏ hàng trống, không thể thanh toán!", {
        duration: 1000,
        position: "top-center",
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
      <h1 className="text-2xl font-semibold mb-4">🛒 Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">
          Giỏ hàng trống.{" "}
          <Link to="/products" className="text-blue-600">
            Mua sắm ngay!
          </Link>
        </p>
      ) : (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Sản phẩm</th>
                <th className="p-2 text-center">Giá</th>
                <th className="p-2 text-center">Số lượng</th>
                <th className="p-2 text-center">Tổng</th>
                <th className="p-2 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* Ghi rõ kiểu item để TypeScript không infer thành any */}
              {items.map((item: CartItem) => {
                const product = products.find((p) => p.id === item.id);
                const stock = product?.stock ?? 0;

                return (
                  <tr key={String(item.id)} className="border-t">
                    <td className="p-2 flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <span>{item.title}</span>
                        {stock > 0 ? (
                          <p className="text-sm text-green-600">
                            Còn {stock} sản phẩm trong kho
                          </p>
                        ) : (
                          <p className="text-sm text-red-500 font-medium">
                            Hết hàng
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {Number(item.price).toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleDecrease(item.id, item.quantity)}
                          className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="px-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      ₫
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa tất cả
            </button>

            <div className="text-lg font-semibold">
              Tổng cộng:{" "}
              <span className="text-blue-600">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}

      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={() => {
            confirm.onConfirm();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
};

export default Cart;
