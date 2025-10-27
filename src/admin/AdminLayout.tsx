import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users } from "lucide-react";

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 cursor-pointer ${
      pathname === path ? "bg-gray-800 text-yellow-300" : "text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* === MENU SIDEBAR === */}
      <aside className="w-60 bg-gray-900 text-white p-4 flex flex-col gap-3">
        <h2 className="text-xl font-bold mb-4">ADMIN PANEL</h2>

        <Link to="/admin" className={linkClass("/admin")}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link to="/admin/products" className={linkClass("/admin/products")}>
          <Package size={20} /> Sản phẩm
        </Link>

        <Link to="/admin/users" className={linkClass("/admin/users")}>
          <Users size={20} /> Người dùng
        </Link>
        <Link to="/admin/orders" className="hover:bg-gray-700 p-3 rounded">
  🧾 Đơn hàng
</Link>

      </aside>

      {/* === CONTENT === */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
