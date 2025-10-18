import React, { useState } from "react";
import { useToast } from "../context/toastCore";
import { Mail, MapPin, Phone, Send, Users } from "lucide-react";

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.message) {
      showToast("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    showToast("✅ Gửi tin nhắn thành công!");
    setForm({ name: "", email: "", address: "", message: "" });
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🌟 Form liên hệ */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            📩 Liên hệ với chúng tôi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Nhập địa chỉ email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ của bạn"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tin nhắn
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Nhập nội dung tin nhắn"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Send size={18} /> Gửi tin nhắn
            </button>
          </form>
        </div>

        {/* 💡 Thông tin nhóm (nền sáng, card tinh tế) */}
        <div className="flex flex-col justify-center bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users size={30} className="text-blue-600" /> Nhóm 06
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Dự án Mini Project Tuần 3   
            <br />
            <span className="text-blue-600 font-medium">
              “Kết nối – Học hỏi – Phát triển cùng nhau.”
            </span>
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} className="text-blue-600" />
              <span>support@nhom06.com</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={20} className="text-blue-600" />
              <span>+84 912 345 678</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={20} className="text-blue-600" />
              <span>Đại học NTTU, TP. Hồ Chí Minh</span>
            </div>
          </div>

          <div className="mt-8 border-t pt-4 text-sm text-gray-500">
            © 2025 Nhóm 06. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
