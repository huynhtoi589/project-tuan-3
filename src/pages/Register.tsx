import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { toast } from "sonner"; // ✅ thêm thư viện sonner để hiển thị thông báo

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useUserStore();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Kiểm tra email hợp lệ
    if (!email.includes("@")) {
      setError("Email không hợp lệ, phải chứa ký tự '@'!");
      toast.error("📧 Email không hợp lệ, phải chứa ký tự '@'!");
      return;
    }

    // ✅ Kiểm tra mật khẩu xác nhận
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp!");
      toast.error("🔒 Mật khẩu xác nhận không khớp!");
      return;
    }

    // ✅ Gọi hàm register từ Zustand
    const ok = register(username, password, email);
    if (ok) {
      toast.success("🎉 Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } else {
      setError("Tên đăng nhập hoặc email đã tồn tại!");
      toast.error("⚠️ Tên đăng nhập hoặc email đã tồn tại!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4 text-green-600">
        📝 Đăng ký tài khoản
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          placeholder="Email (phải chứa @)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
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
