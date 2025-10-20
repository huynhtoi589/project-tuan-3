import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(identifier, password);

    if (ok) {
      const currentUser = useUserStore.getState().user; // lấy user mới nhất sau khi login

      if (currentUser?.role === "admin") {
        alert("Đăng nhập thành công (Admin)");
        navigate("/admin");
      } else {
        alert("Đăng nhập thành công (User)");
        navigate("/");
      }
    } else {
      setError("Thông tin đăng nhập không đúng");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
        🔐 Đăng nhập
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Email hoặc tên đăng nhập"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>

      <div
        style={{
          marginTop: 12,
          background: "#f8fafc",
          padding: 10,
          borderRadius: 6,
        }}
      >
        <strong>Tài khoản admin mặc định để truy cập trang quản trị:</strong>
        <div>
          Email: <code>admin@gmail.com</code>
        </div>
        <div>
          Mật khẩu: <code>admin123</code>
        </div>
      </div>

      <p className="mt-4 text-center text-sm">
        <Link
          to="/reset-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Quên mật khẩu?
        </Link>
      </p>
      <p className="mt-2 text-center text-sm">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </div>
  );
};

export default Login;
