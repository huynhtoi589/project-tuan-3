import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-10">
        {/* Hình minh họa */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
            alt="Team"
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Nội dung giới thiệu */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            🌟 Về Nhóm 06
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Chúng tôi là <span className="font-semibold text-blue-600">nhóm 06</span>,
            hiện đang thực hiện{" "}
            <span className="font-semibold text-blue-600">Mini Project Tuần 3</span>.
            Dự án được xây dựng bằng{" "}
            <span className="font-semibold text-blue-600">
              React + TypeScript + TailwindCSS
            </span>{" "}
            với mục tiêu áp dụng toàn bộ kiến thức đã học ở tuần 1 và 2 để tạo ra
            một ứng dụng web chuẩn chỉnh, hiện đại và có tính thực tiễn cao.
          </p>

          <div className="bg-blue-100 text-blue-700 px-6 py-4 rounded-xl shadow-inner mb-6">
            💬 <span className="font-semibold">Slogan:</span>{" "}
            “Code Chắc - Giao Diện Đẹp - Làm Việc Hiệu Quả”
          </div>
          {/* Nút liên hệ nhóm */}
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
             Liên hệ nhóm
          </Link>
        </div>
      </div>
    </section>
  );
};
export default About;