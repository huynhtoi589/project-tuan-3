import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// ✅ Website Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

import { Toaster } from "sonner";
import { useUserStore } from "./store/userStore";

// ✅ Admin Pages
import AdminLayout from "./admin/AdminLayout";
import DashboardHome from "./admin/DashboardHome";
import ManageProducts from "./admin/ManageProducts";
import ManageUsers from "./admin/ManageUsers";
import ManageOrders from "./admin/ManageOrders"; // ✅ thêm import


// ✅ Chỉ cho user login
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" replace />;
};

// ✅ Chỉ cho Admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user && user.role === "admin" ? children : <Navigate to="/" replace />;
};


// ✅ WEBSITE LAYOUT
const WebsiteLayout = () => (
  <>
    <Header />
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
);


const App: React.FC = () => {
  return (
    <>
      <Toaster richColors position="top-center" duration={2000} />

      <Routes>

        {/* ✅ WEBSITE Routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>


        {/* ✅ ADMIN Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="orders" element={<ManageOrders />} /> {/* ✅ THÊM NÈ */}
        </Route>


        {/* ❌ 404 → Redirect Home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
};

export default App;
