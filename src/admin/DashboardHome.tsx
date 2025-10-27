// src/admin/DashboardHome.tsx
import React, { useMemo } from "react";
import { useProductStore } from "../store/productStore";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

// Nếu bạn đã có util formatCurrency thì import vào thay vì dùng hàm nhỏ này
const VND = (n: number) =>
  (n || 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + " đ";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#8A2BE2", "#00C49F"];

const DashboardHome: React.FC = () => {
  const products = useProductStore((s) => s.products);

  // === KPIs ===
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValue = products.reduce(
    (sum, p) => sum + (p.stock || 0) * (p.price || 0),
    0
  );

  // === Phân bổ theo danh mục (Pie) ===
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      const key = p.category || "Khác";
      map[key] = (map[key] || 0) + 1;
    }
    return Object.entries(map).map(([category, value]) => ({ category, value }));
  }, [products]);

  // === Tồn kho theo sản phẩm (Bar) - lấy Top 8 theo stock ===
  const stockBarData = useMemo(() => {
    const list = [...products]
      .sort((a, b) => (b.stock || 0) - (a.stock || 0))
      .slice(0, 8)
      .map((p) => ({
        name: p.name.length > 14 ? p.name.slice(0, 12) + "…" : p.name,
        stock: p.stock || 0,
      }));
    return list;
  }, [products]);

  // === Doanh thu ảo 8 tuần gần đây (Line) ===
  // (Để có biểu đồ đẹp khi chưa có dữ liệu đơn hàng)
  const revenueLineData = useMemo(() => {
    const weeks = 8;
    const now = new Date();
    const arr: { week: string; revenue: number }[] = [];
    for (let i = weeks - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i * 7);
      // Tạo số giả định dựa trên tổng giá trị + “hạt giống” id
      const seed =
        products.reduce((s, p) => s + ((p.id % 10) + 1) * (p.price || 0), 0) /
        1000000;
      const revenue =
        Math.max(1, Math.round(seed / (i + 2))) * (1000000 + (i % 3) * 200000);
      arr.push({ week: `W${getWeek(d)}`, revenue });
    }
    return arr;
  }, [products]);

  // === Low stock & Top value tables ===
  const lowStockList = useMemo(
    () =>
      [...products]
        .filter((p) => (p.stock || 0) <= 3)
        .sort((a, b) => (a.stock || 0) - (b.stock || 0))
        .slice(0, 6),
    [products]
  );

  const topValueList = useMemo(
    () =>
      [...products]
        .map((p) => ({
          ...p,
          total: (p.stock || 0) * (p.price || 0),
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 6),
    [products]
  );

  return (
    <div className="px-6 py-5">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">📊 Dashboard Admin</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500">Sản phẩm</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500">Số lượng tồn</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{totalStock}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500">Giá trị hàng hóa</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {VND(totalValue)}
          </p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Pie by category */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            📌 Phân loại theo danh mục
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock bar */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            📦 Tồn kho theo sản phẩm (Top 8)
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockBarData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue line (fake) */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            💸 Doanh thu 8 tuần gần đây (ước tính)
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis tickFormatter={(v) => (v / 1_000_000).toFixed(0) + "tr"} />
                <Tooltip
                  formatter={(v: any) => VND(Number(v))}
                  labelFormatter={(l) => `Tuần ${l}`}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low stock */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            🚨 Sản phẩm sắp hết hàng (≤ 3)
          </h3>
          {lowStockList.length === 0 ? (
            <p className="text-gray-500">Không có sản phẩm nào sắp hết.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Sản phẩm</th>
                    <th className="py-2">Danh mục</th>
                    <th className="py-2">Tồn</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockList.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="py-2">{p.name}</td>
                      <td>{p.category || "—"}</td>
                      <td className="text-red-600 font-semibold">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top value */}
        <div className="bg-white shadow p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            🏆 Top sản phẩm giá trị cao
          </h3>
          {topValueList.length === 0 ? (
            <p className="text-gray-500">Chưa có dữ liệu.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2">Sản phẩm</th>
                    <th className="py-2">Danh mục</th>
                    <th className="py-2">Giá</th>
                    <th className="py-2">Tồn</th>
                    <th className="py-2">Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {topValueList.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="py-2">{p.name}</td>
                      <td>{p.category || "—"}</td>
                      <td>{VND(p.price)}</td>
                      <td>{p.stock}</td>
                      <td className="font-semibold text-blue-600">
                        {VND((p.stock || 0) * (p.price || 0))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper: tuần trong năm (đơn giản)
function getWeek(d: Date) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  const millis = d.getTime() - onejan.getTime();
  return Math.ceil((millis / 86400000 + onejan.getDay() + 1) / 7);
}

export default DashboardHome;
