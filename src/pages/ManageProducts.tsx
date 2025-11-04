import React, { useState } from "react";
import { useProductStore } from "../store/productStore";
import { Trash2, Plus } from "lucide-react";

const ManageProducts: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  // ✅ State nhập liệu
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Trang sức");
  const [image, setImage] = useState("");

  // ✅ Convert ảnh sang Base64 để lưu được khi reload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string); // ✅ Base64
    };
    reader.readAsDataURL(file);
  };

  const addNewProduct = () => {
    if (!name || !price || !stock || !image || !category)
      return alert("Vui lòng nhập đầy đủ thông tin!");

    addProduct({
      id: Date.now(),
      name,
      price: Number(price),
      stock: Number(stock),
      image,
      category,
    });

    setName("");
    setPrice("");
    setStock("");
    setImage("");
    setCategory("Trang sức");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-blue-700">
        📦 Quản lý sản phẩm
      </h1>

      {/* 📌 Form thêm sản phẩm */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3 items-center">
        <input
          className="border p-2 rounded w-40"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded w-32"
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 rounded w-32"
          type="number"
          placeholder="Số lượng"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        {/* ✅ Danh mục sản phẩm */}
        <select
          className="border p-2 rounded w-40"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Trang sức">Trang sức</option>
          <option value="Vàng">Vàng</option>
          <option value="Bạc">Bạc</option>
          <option value="Kim cương">Kim cương</option>
        </select>

        {/* ✅ Upload ảnh */}
        <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded">
          Chọn ảnh
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>

        {image && <img src={image} alt="preview" className="w-12 h-12 rounded-md border" />}

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={addNewProduct}
        >
          <Plus size={18} /> Thêm
        </button>
      </div>

      {/* ✅ Danh sách sản phẩm */}
      <table className="w-full bg-white rounded-xl shadow text-center">
        <thead>
          <tr className="bg-yellow-200 text-gray-900">
            <th className="p-3">Ảnh</th>
            <th>Tên</th>
            <th>Danh Mục</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Xoá</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">
                <img src={p.image} className="w-14 h-14 rounded object-cover mx-auto" />
              </td>
              <td className="font-medium">{p.name}</td>
              <td>{p.category}</td>
              <td className="text-red-600 font-semibold">
                {p.price.toLocaleString()} đ
              </td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="text-red-600 hover:scale-110 transition"
                  onClick={() => deleteProduct(p.id)}
                >
                  <Trash2 size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
