import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products"; // ✅ Thêm trang danh sách sản phẩm
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserStore } from "./store/userStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            {/* 🏠 Trang chủ */}
            <Route path="/" element={<Home />} />

            {/* 🛒 Sản phẩm */}
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* 📖 Thông tin */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* 🛍️ Giỏ hàng & Thanh toán */}
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />

            {/* 👤 Đăng nhập / Đăng ký */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ❌ Trang không tồn tại */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
