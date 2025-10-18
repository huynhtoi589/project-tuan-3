import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import pnjLogo from "/images/logoPNJ.png"; // ✅ thay đường dẫn đúng nếu logo nằm chỗ khác

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {/* --- Cột 1: VỀ PNJ --- */}
  <div>
    <img src={pnjLogo} alt="PNJ Logo" className="h-16 mb-4" />
    <h3 className="text-lg font-bold text-gray-800 mb-4">VỀ PNJ</h3>
    <ul className="space-y-2 text-gray-600 text-sm">
      <li><a href="#" className="hover:text-blue-600">Quan hệ cổ đông (IR)</a></li>
      <li><a href="#" className="hover:text-blue-600">Tuyển dụng</a></li>
      <li><a href="#" className="hover:text-blue-600">Xuất khẩu</a></li>
      <li><a href="#" className="hover:text-blue-600">Kinh doanh sỉ</a></li>
      <li><a href="#" className="hover:text-blue-600">Kiểm định kim cương</a></li>
      <li><a href="#" className="hover:text-blue-600">Quà tặng doanh nghiệp</a></li>
    </ul>
  </div>

  {/* --- Cột 2: DỊCH VỤ KHÁCH HÀNG --- */}
  <div className="pt-[5.4rem]"> {/* ⬅️ đẩy cột xuống cùng hàng với “VỀ PNJ” */}
    <h3 className="text-lg font-bold text-gray-800 mb-4">
      DỊCH VỤ KHÁCH HÀNG
    </h3>
    <ul className="space-y-2 text-gray-600 text-sm">
      <li><a href="#" className="hover:text-blue-600">Hướng dẫn đo size trang sức</a></li>
      <li><a href="#" className="hover:text-blue-600">Mua hàng trả góp</a></li>
      <li><a href="#" className="hover:text-blue-600">Hướng dẫn mua hàng và thanh toán</a></li>
      <li><a href="#" className="hover:text-blue-600">Hướng dẫn tra cứu giá</a></li>
      <li><a href="#" className="hover:text-blue-600">Cẩm nang sử dụng trang sức</a></li>
      <li><a href="#" className="hover:text-blue-600">Câu hỏi thường gặp</a></li>
    </ul>
  </div>

  {/* --- Cột 3: KẾT NỐI VỚI CHÚNG TÔI --- */}
  <div className="pt-[5.4rem]"> {/* ⬅️ đẩy cột này xuống bằng luôn */}
    <h3 className="text-lg font-bold text-gray-800 mb-4">
      KẾT NỐI VỚI CHÚNG TÔI
    </h3>
    <div className="flex space-x-5 mb-5">
      <a href="#" className="text-blue-600 hover:scale-110 transition-transform">
        <FaFacebook size={26} />
      </a>
      <a href="#" className="text-pink-500 hover:scale-110 transition-transform">
        <FaInstagram size={26} />
      </a>
      <a href="#" className="text-red-600 hover:scale-110 transition-transform">
        <FaYoutube size={26} />
      </a>
      <a href="#" className="text-gray-600 hover:scale-110 transition-transform">
        <FaEnvelope size={26} />
      </a>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">
      Theo dõi chúng tôi để nhận tin tức và ưu đãi mới nhất ✨
    </p>
  </div>
</div>


      {/* --- Dòng bản quyền --- */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t pt-4">
        © 2025 PNJ. Tất cả quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;