import { useState } from "react";
import { useNavigate } from "react-router-dom";

function genCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [shown, setShown] = useState("");
  const [newPw, setNewPw] = useState("");
  const nav = useNavigate();

  function handleRequest(e: any) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const u = users.find((x: any) => x.email === email);
    if (!u) return alert("Không tìm thấy tài khoản");
    const c = genCode();
    const resets = JSON.parse(localStorage.getItem("resets") || "{}");
    resets[email] = c;
    localStorage.setItem("resets", JSON.stringify(resets));
    setShown(c);
    setStep(2);
  }

  function handleVerify(e: any) {
    e.preventDefault();
    const resets = JSON.parse(localStorage.getItem("resets") || "{}");
    if (resets[email] !== code) return alert("Mã không hợp lệ");
    setStep(3);
  }

  function handleReset(e: any) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const idx = users.findIndex((x: any) => x.email === email);
    if (idx === -1) return alert("Không tìm thấy tài khoản");
    users[idx].password = newPw;
    localStorage.setItem("users", JSON.stringify(users));
    const resets = JSON.parse(localStorage.getItem("resets") || "{}");
    delete resets[email];
    localStorage.setItem("resets", JSON.stringify(resets));
    alert("Đặt lại mật khẩu thành công");
    nav("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h2>
      {step === 1 && (
        <form onSubmit={handleRequest}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Gửi mã
          </button>
        </form>
      )}
      {step === 2 && (
        <div>
          <p>
            Mã đã được gửi (demo): <strong>{shown}</strong>
          </p>
          <form onSubmit={handleVerify}>
            <input
              placeholder="Nhập mã"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Xác minh
            </button>
          </form>
        </div>
      )}
      {step === 3 && (
        <form onSubmit={handleReset}>
          <input
            placeholder="Mật khẩu mới"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Đặt lại
          </button>
        </form>
      )}
    </div>
  );
}
