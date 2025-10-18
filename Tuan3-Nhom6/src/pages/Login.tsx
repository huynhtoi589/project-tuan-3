import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) navigate("/");
    else setError("Tên đăng nhập hoặc mật khẩu không đúng!");
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
        🔐 Đăng nhập
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <p className="mt-4 text-center text-sm">
        Chưa có tài khoản?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
};

export default Login;
