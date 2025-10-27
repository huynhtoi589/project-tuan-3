import React, { useState } from "react";
import { useProductStore } from "../store/productStore";
import { Trash2, Plus, Pencil } from "lucide-react";
import type { Product } from "../store/productStore";

const ManageProducts: React.FC = () => {
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Trang sức");
  const [image, setImage] = useState("");

  const [editing, setEditing] = useState<Product | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addNewProduct = () => {
    if (!name || !price || !stock || !image)
      return alert("⚠️ Nhập đầy đủ thông tin!");

    addProduct({
      id: Date.now(),
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      image,
    });

    setName("");
    setPrice("");
    setStock("");
    setCategory("Trang sức");
    setImage("");
  };

  const saveEdit = () => {
    if (!editing) return;
    updateProduct(editing);
    setEditing(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-blue-700">
        📦 Quản lý sản phẩm
      </h1>

      {/* ✅ FORM THÊM SẢN PHẨM */}
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

        <select
          className="border p-2 rounded w-36"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Trang sức">Trang sức</option>
          <option value="Vàng">Vàng</option>
          <option value="Bạc">Bạc</option>
          <option value="Kim cương">Kim cương</option>
        </select>

        <label className="cursor-pointer bg-gray-300 px-3 py-2 rounded">
          📁 Ảnh
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>

        {image && (
          <img src={image} className="w-12 h-12 rounded border object-cover" />
        )}

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-1"
          onClick={addNewProduct}
        >
          <Plus size={18} /> Thêm
        </button>
      </div>

      {/* ✅ DANH SÁCH */}
      <table className="w-full bg-white rounded-xl shadow text-center">
        <thead>
          <tr className="bg-yellow-200 text-gray-900">
            <th className="p-3">Ảnh</th>
            <th>Tên</th>
            <th>Danh Mục</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">
                <img
                  src={p.image}
                  className="w-14 h-14 rounded object-cover mx-auto"
                />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td className="text-red-600">{p.price.toLocaleString()} đ</td>
              <td>{p.stock}</td>
              <td className="flex justify-center gap-3 py-2">
                <button
                  className="text-blue-600 hover:scale-110"
                  onClick={() => setEditing(p)}
                >
                  <Pencil size={18} />
                </button>

                <button
                  className="text-red-600 hover:scale-110"
                  onClick={() => deleteProduct(p.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ POPUP SỬA */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[380px] rounded-xl shadow-xl animate-fadeIn">
            <h2 className="text-blue-700 font-semibold mb-4">
              ✏️ Sửa sản phẩm
            </h2>

            <input
              className="border p-2 rounded w-full mb-2"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
            />

            <input
              className="border p-2 rounded w-full mb-2"
              type="number"
              value={editing.price}
              onChange={(e) =>
                setEditing({ ...editing, price: Number(e.target.value) })
              }
            />

            <input
              className="border p-2 rounded w-full mb-2"
              type="number"
              value={editing.stock}
              onChange={(e) =>
                setEditing({ ...editing, stock: Number(e.target.value) })
              }
            />

            {/* ✅ Sửa danh mục */}
            <select
              className="border p-2 rounded w-full mb-2"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            >
              <option value="Trang sức">Trang sức</option>
              <option value="Vàng">Vàng</option>
              <option value="Bạc">Bạc</option>
              <option value="Kim cương">Kim cương</option>
            </select>

            {/* ❌ Nút */}
            <div className="flex gap-3 mt-5">
              <button
                className="flex-1 bg-green-600 text-white py-2 rounded-md"
                onClick={saveEdit}
              >
                ✅ Lưu thay đổi
              </button>

              <button
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md"
                onClick={() => setEditing(null)}
              >
                ❌ Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
