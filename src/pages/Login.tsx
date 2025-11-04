import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { toast } from "sonner";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Giả lập độ trễ nhỏ để có hiệu ứng loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = login(identifier.trim(), password);
    setLoading(false);

    if (result.ok) {
      const currentUser = useUserStore.getState().user;

      if (currentUser?.role === "admin") {
        toast.success("🎉 Đăng nhập thành công (Admin)");
        navigate("/admin");
      } else {
        toast.success("✅ Đăng nhập thành công");
        navigate("/");
      }
    } else {
      setError(result.error || "Sai thông tin đăng nhập");
      toast.error(result.error || "Sai thông tin đăng nhập");
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
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
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
