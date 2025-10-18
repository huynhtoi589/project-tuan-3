import React from "react";

const NewsSection: React.FC = () => {
  const newsList = [
    {
      id: 1,
      category: "Tin tức PNJ",
      title:
        "RA MẮT TRANG SỨC DOREMON . PNJ",
      desc: "PNJ chính thức ra mắt thương hiệu trang sức Doraemon | PNJ. Đây là lần đầu tiên một thương hiệu trang sức của Việt Nam hợp tác cùng Doraemon, mang đến những thiết kế độc đáo và đầy cảm hứng.",
      image:
        "/images/DoremonPNJ.jpg",
      link: "https://www.pnj.com.vn/blog/chinh-thuc-ra-mat-dong-san-pham-trang-suc-doraemon-pnj-2025/",
    },
    {
      id: 2,
      category: "Tin tức",
      title: "Nguồn gốc tạo nên tinh hoa của đá quý & những điều bạn chưa biết về đá quý",
      desc: "Để sở hữu vẻ đẹp không gì sánh bằng, những viên đá quý phải trải qua một quá trình dài. Hãy cùng PNJ khám...",
      image:
        "/images/DaQuy.jpg",
      link: "https://www.pnj.com.vn/blog/nguon-goc-tao-nen-tinh-hoa-cua-da-quy-nhung-dieu-ban-chua-biet-ve-da-quy/",
    },
    {
      id: 3,
      category: "Tin thị trường vàng",
      title: "Kim cương rời là gì? Có nên mua kim cương rời tại PNJ?",
      desc: "Là người yêu thích trang sức, ít nhiều gì bạn cũng từng nghe đến thuật ngữ “kim cương rời. Vậy kim cương rời là...",
      image:
        "/images/TinTucKC.webp",
      link: "https://www.pnj.com.vn/blog/kim-cuong-roi-la-gi-co-nen-mua-kim-cuong-roi-tai-pnj/",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-14">
          Tin tức - Sự kiện
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 flex flex-col justify-between h-[260px]">
                <p className="text-yellow-600 text-sm font-medium mb-2">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.desc}
                </p>

                <a
                  href={item.link}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                >
                  Xem thêm →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
