import React from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";
import { useToast } from "../context/toastCore";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import NewsSection from "../components/NewsSection";
import Footer from "../components/Footer";

// ✅ Banner dùng file public
const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

const Home: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const featured = products.slice(0, 4); // ✅ Lấy 4 sp nổi bật từ store
  const { showToast } = useToast();

  return (
    <div className="bg-gray-50">
      {/* 💎 Banner */}
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
              className="relative flex items-center justify-center h-full text-center text-white"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-300">
                  {index === 0 && "Ưu đãi ngày đôi ✨"}
                  {index === 1 && "Ưu đãi đến 4 triệu 💰"}
                  {index === 2 && "Bộ sưu tập mới 💍"}
                </h1>
                <Link
                  to="/products"
                  className="bg-yellow-400 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition"
                  onClick={() => showToast("✨ Khám phá ngay ưu đãi PNJ!")}
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
  <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">
    🌟 Sản phẩm nổi bật
  </h2>

  {featured.length === 0 ? (
    <p className="text-center text-gray-500">Chưa có sản phẩm nổi bật.</p>
  ) : (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      spaceBetween={20}
      loop
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 },
      }}
      className="pb-10"
    >
      {featured.map((p) => (
        <SwiperSlide key={p.id}>
          <ProductCard product={p} />
        </SwiperSlide>
      ))}
    </Swiper>
  )}
</section>


      {/* 💎 Section Diamond */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

          {/* Video */}
          <video
            src="/video/banner-nhanKC.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-w-md rounded-xl shadow-lg"
          />

          {/* Text */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              VẺ ĐẸP VĨNH CỬU ✨
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bộ sưu tập Diamond Collection mang đến sang trọng – thanh lịch –
              quý phái, giúp bạn tỏa sáng mọi khoảnh khắc.
            </p>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              KHÁM PHÁ NGAY
            </Link>
          </div>
        </div>
      </section>

      {/* 📰 Tin tức */}
      <NewsSection />

     
    </div>
  );
};

export default Home;
