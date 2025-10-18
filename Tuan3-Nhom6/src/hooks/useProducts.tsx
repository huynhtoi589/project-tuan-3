import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";

// ✅ Dữ liệu giả PNJ
const jewelryProducts: Product[] = [
  {
    id: 1,
    title: "Nhẫn vàng 18K PNJ đính đá Swarovski",
    price: 8950000 / 25000,
    category: "Vàng",
    description: "Nhẫn vàng 18K PNJ đính đá Swarovski sang trọng, tinh tế.",
    image: "/images/NhanKC14k.png",
  },
  {
    id: 2,
    title: "Dây chuyền bạc PNJ đính đá trắng",
    price: 1250000 / 25000,
    category: "Bạc",
    description: "Dây chuyền bạc PNJ cao cấp đính đá trắng, phong cách hiện đại.",
    image: "/images/NhanVang18k.png",
  },
  {
    id: 3,
    title: "Lắc tay vàng trắng 14K PNJ nữ",
    price: 6750000 / 25000,
    category: "Vàng trắng",
    description: "Lắc tay vàng trắng 14K PNJ, thiết kế nữ tính, thanh lịch.",
    image: "/images/LacVang18k.png",
  },
  {
    id: 4,
    title: "Bông tai bạc PNJ hình hoa đính đá",
    price: 890000 / 25000,
    category: "Bạc",
    description: "Bông tai bạc PNJ hình hoa đính đá trắng tinh khôi.",
    image: "/images/LacBac_VoSo.png",
  },
  {
    id: 5,
    title: "Vòng cổ vàng 24K PNJ đính ngọc trai",
    price: 15900000 / 25000,
    category: "Vàng",
    description: "Vòng cổ vàng 24K PNJ đính ngọc trai thật sang trọng.",
    image: "/images/NhanBac_HinhNo.png",
  },
  {
    id: 6,
    title: "Nhẫn bạc PNJ nữ đá Aquamarine",
    price: 950000 / 25000,
    category: "Bạc",
    description: "Nhẫn bạc PNJ nữ đính đá Aquamarine phong cách dịu dàng.",
    image: "/images/NhanBac_HinhTym.png",
  },
  {
    id: 7,
    title: "Dây chuyền PNJ nữ đá Got Nước",
    price: 1050000 / 25000,
    category: "Bạc",
    description: "Dây chuyền PNJ nữ đá Got Nước tinh tế.",
    image: "/images/DayChuyen_GotNuoc.png",
  },
  {
    id: 8,
    title: "Bông tai vàng trắng PNJ sang trọng",
    price: 1950000 / 25000,
    category: "Vàng trắng",
    description: "Bông tai vàng trắng PNJ thiết kế tinh xảo, thanh lịch.",
    image: "/images/BongTai_VangTrang.png",
  },
];

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => jewelryProducts,
  });
}
