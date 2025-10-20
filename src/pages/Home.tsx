import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.tsx";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";
import { useToast } from "../context/toastCore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";

// ✅ Dùng đường dẫn public cho banner (không import trực tiếp)
const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

const Home: React.FC = () => {
  const { data: products } = useProducts();
  const featured = products ? products.slice(0, 4) : [];
  const { showToast } = useToast();

  return (
    <div className="bg-gray-50">
      {/* 💎 Banner Carousel */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-[500px] rounded-b-3xl overflow-hidden shadow-lg"
      >
        {banners.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex items-center justify-center h-full text-white text-center"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 max-w-3xl px-4">
                {index === 0 && (
                  <>
                    <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg text-yellow-300">
                      Ưu đãi ngày đôi
                    </h1>
                    <p className="text-lg mb-8 text-gray-100">
                      10 điểm phong cách – 10 phần rạng rỡ ✨
                    </p>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h1 className="text-5xl font-bold mb-6 text-yellow-200">
                      Ưu đãi đến 4 triệu 💰
                    </h1>
                    <p className="text-lg mb-8 text-gray-100">
                      Quà tặng iPhone 17 mới nhất 📱
                    </p>
                  </>
                )}
                {index === 2 && (
                  <>
                    <h1 className="text-5xl font-bold mb-6 text-yellow-200">
                      Bộ sưu tập mới 💍
                    </h1>
                    <p className="text-lg mb-8 text-gray-100">
                      Sang trọng – Thanh lịch – Quý phái
                    </p>
                  </>
                )}
                <Link
                  to="/products"
                  onClick={() => showToast("💎 Khám phá ngay ưu đãi PNJ!")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all"
                >
                  Khám phá ngay
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🌟 Sản phẩm nổi bật */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          🌟 Sản phẩm nổi bật
        </h2>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Đang tải sản phẩm...</p>
        )}
      </section>

      {/* 💎 Section Diamond */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          {/* Hình bên trái */}
          <div className="flex justify-center">
            <video
              src="/video/banner-nhanKC.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>

          {/* Nội dung bên phải */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-snug tracking-wide">
              VẺ ĐẸP VĨNH CỬU
              <br className="hidden md:block" />– TỎA SÁNG CÙNG
              <span className="text-blue-600 ml-2">DIAMOND 💎</span>
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8 text-[17px] max-w-lg mx-auto md:mx-0">
              <span className="font-semibold">Diamond Collection</span> mang đến
              sự kết hợp hoàn hảo giữa nghệ thuật và tinh hoa chế tác. Mỗi viên
              kim cương được tuyển chọn tỉ mỉ, phản chiếu ánh sáng rực rỡ và
              tinh khiết – biểu tượng của sự sang trọng, thành công và tình yêu
              bất diệt. Hãy để <span className="font-semibold">Diamond</span>{" "}
              đồng hành cùng bạn, tôn vinh vẻ đẹp riêng và khoảnh khắc đáng nhớ
              trong cuộc sống ✨
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              KHÁM PHÁ NGAY
            </button>
          </div>
        </div>

        {/* Dòng chữ KHÁM PHÁ DIAMOND */}
        <div className="text-center mt-24">
          <h3 className="text-gray-500 text-base font-semibold mb-2 tracking-wider uppercase">
            KHÁM PHÁ
          </h3>
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-wider">
            DIAMOND
          </h1>
          <p className="text-gray-400 mt-3 text-sm italic">
            Shine Your Moment – Rực sáng từng khoảnh khắc ✨
          </p>
        </div>
      </section>

      {/* 📰 Tin tức */}
      <div className="bg-gray-50">
        {/* ...Banner, sản phẩm nổi bật, video, v.v... */}

        <NewsSection />
      </div>
    </div>
  );
};

<Footer />;

export default Home;
