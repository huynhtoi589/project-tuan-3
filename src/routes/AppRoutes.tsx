// src/routes/AppRoutes.tsx
import React from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

// 🧩 Layouts & Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserStore } from "../store/userStore";

// 🧾 Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";

// 🧠 Admin
import AdminLayout from "../admin/AdminLayout";
import DashboardHome from "../admin/DashboardHome";
import ManageProducts from "../admin/ManageProducts";
import ManageUsers from "../admin/ManageUsers";
import ManageOrders from "../admin/ManageOrders";

// ✅ Private & Admin Route wrappers
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  return user && user.role === "admin" ? children : <Navigate to="/" replace />;
};

// ✅ Layout chính của website
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

export default function AppRoutes() {
  const element = useRoutes([
    {
      element: <WebsiteLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/product/:id", element: <ProductDetail /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/cart", element: <Cart /> },
        {
          path: "/checkout",
          element: (
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      ),
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "products", element: <ManageProducts /> },
        { path: "users", element: <ManageUsers /> },
        { path: "orders", element: <ManageOrders /> },
      ],
    },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);

  return (
    <>
      <Toaster
        richColors
        position="top-center"
        duration={2500}
        toastOptions={{
          style: {
            fontSize: "15px",
            padding: "12px 18px",
            borderRadius: "10px",
          },
        }}
      />
      {element}
    </>
  );
}
