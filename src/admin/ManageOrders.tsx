import React from "react";
import { useOrderStore } from "../store/orderStore";
import { Trash2, Eye, CheckCircle, XCircle } from "lucide-react";

const ManageOrders: React.FC = () => {
  const { orders, deleteOrder, updateStatus } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-blue-700">
        🧾 Quản lý đơn hàng
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 mt-4">📭 Chưa có đơn hàng nào.</p>
      ) : (
        <table className="w-full bg-white rounded-xl shadow text-center">
          <thead>
            <tr className="bg-blue-200">
              <th className="p-3">Mã đơn</th>
              <th>Khách hàng</th>
              <th>Số sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-2 font-semibold text-blue-600">{o.id}</td>
                <td>{o.customerName}</td>
                <td>{o.items.length}</td>
                <td className="text-red-600 font-bold">
                  {o.totalPrice.toLocaleString()} đ
                </td>
                <td className="font-medium">
                  {o.status === "pending" && "⏳ Chờ xử lý"}
                  {o.status === "success" && "✅ Hoàn tất"}
                  {o.status === "canceled" && "❌ Đã hủy"}
                </td>

                <td className="flex justify-center gap-3 py-2">
                  <button
                    className="text-blue-600 hover:scale-110"
                    onClick={() => setSelectedOrder(o)}
                  >
                    <Eye size={18} />
                  </button>

                  {o.status === "pending" && (
                    <>
                      <button
                        className="text-green-600 hover:scale-110"
                        onClick={() => updateStatus(o.id, "success")}
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        className="text-yellow-600 hover:scale-110"
                        onClick={() => updateStatus(o.id, "canceled")}
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  )}

                  <button
                    className="text-red-600 hover:scale-110"
                    onClick={() => deleteOrder(o.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Popup Chi Tiết Đơn */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[450px] shadow-xl">
            <h2 className="text-lg font-bold text-blue-700 mb-3">
              🧾 Chi tiết đơn hàng
            </h2>

            {selectedOrder.items.map((item: any) => (
              <div key={item.id} className="border p-2 rounded mb-2 flex gap-3">
                <img src={item.image} alt="" className="w-14 h-14 rounded" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Giá: {item.price.toLocaleString()} đ</p>
                </div>
              </div>
            ))}

            <p className="mt-3 font-semibold">
              Tổng tiền:{" "}
              <span className="text-red-600">
                {selectedOrder.totalPrice.toLocaleString()} đ
              </span>
            </p>

            <button
              onClick={() => setSelectedOrder(null)}
              className="bg-black text-white px-3 py-2 rounded mt-4 w-full"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
