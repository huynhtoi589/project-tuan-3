import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import { useState } from "react";

function Header() {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* 🛍️ Logo */}
        <Link to="/" className="text-2xl font-semibold text-blue-600">
          🛍️ Mini Shop - Nhóm 06
        </Link>

        {/* 🔗 Navbar */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <Link to="/products" className="hover:text-blue-600">
            Sản phẩm
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            Giới thiệu
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Liên hệ
          </Link>

          {/* 🛒 Giỏ hàng */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-blue-600 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 👤 Tài khoản */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm text-gray-700">{user.username}</span>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40 py-2 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm transition"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
