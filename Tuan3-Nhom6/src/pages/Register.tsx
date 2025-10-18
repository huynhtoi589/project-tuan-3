import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useUserStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    const success = register(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Tên đăng nhập đã tồn tại!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4 text-green-600">
        📝 Đăng ký tài khoản
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Đăng ký
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Đã có tài khoản?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
};

export default Register;
