import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import type { Product, User } from "../types/product";

const PRODUCT_KEY = "app_products";
const CATEGORIES = ["Vàng", "Bạc", "Vàng trắng"];

// -------------------- helper --------------------
const loadProducts = (): Product[] => {
  try {
    const raw = localStorage.getItem(PRODUCT_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
};

const saveProducts = (arr: Product[]) =>
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(arr));

export default function Admin() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const users = useUserStore((s) => s.users);

  const addUser = useUserStore((s) => s.addUser);
  const updateUser = useUserStore((s) => s.updateUser);
  const deleteUser = useUserStore((s) => s.deleteUser);

  // -------------------- Tabs --------------------
  const [tab, setTab] = useState<"products" | "users">("products");

  // -------------------- Products state --------------------
  const [items, setItems] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // -------------------- Users state --------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // -------------------- Load --------------------
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    setItems(loadProducts());
  }, [user, navigate]);

  // -------------------- Product functions --------------------
  function resetForm() {
    setTitle("");
    setPrice("");
    setImage("");
    setDesc("");
    setCategory(CATEGORIES[0]);
    setEditingId(null);
  }

  function handleAddOrUpdate() {
    if (!title.trim()) return alert("Nhập tên sản phẩm");

    const list = loadProducts();

    if (editingId) {
      const index = list.findIndex((p) => String(p.id) === String(editingId));
      if (index !== -1) {
        list[index] = {
          ...list[index],
          title,
          price: Number(price || 0),
          image,
          description: desc,
          category,
        };
      }
    } else {
      const newItem: Product = {
        id: `p-${Date.now()}`,
        title,
        price: Number(price || 0),
        image,
        description: desc,
        category,
        createdAt: new Date().toISOString(),
      };
      list.unshift(newItem);
    }

    saveProducts(list);
    window.dispatchEvent(new Event("app_products_updated"));
    setItems(list);
    resetForm();
  }

  function onEdit(p: Product) {
    setEditingId(String(p.id));
    setTitle(p.title);
    setPrice(p.price?.toString() || "");
    setImage(p.image || "");
    setDesc(p.description || "");
    setCategory(p.category || CATEGORIES[0]);
  }

  function onDelete(id: string) {
    if (!confirm("Xác nhận xóa sản phẩm?")) return;
    const arr = loadProducts().filter((x) => String(x.id) !== String(id));
    saveProducts(arr);
    window.dispatchEvent(new Event("app_products_updated"));
    setItems(arr);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // -------------------- User functions --------------------
  function resetUserForm() {
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("user");
    setEditingUserId(null);
  }

  function onEditUser(u: User) {
    setEditingUserId(u.id);
    setUsername(u.username);
    setEmail(u.email);
    setPassword(u.password);
    setRole(u.role);
  }

  function onDeleteUserHandler(id: string) {
    if (!confirm("Xác nhận xóa tài khoản?")) return;
    deleteUser(id);
    if (editingUserId === id) resetUserForm();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Trang Quản Trị
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded ${
            tab === "products" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          🛍️ Quản lý sản phẩm
        </button>
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded ${
            tab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          👥 Quản lý tài khoản
        </button>
      </div>

      {/* -------------------- PRODUCTS -------------------- */}
      {tab === "products" && (
        <div>
          <div className="bg-white p-4 rounded shadow mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrUpdate();
              }}
              className="grid grid-cols-1 md:grid-cols-4 gap-3"
            >
              <input
                className="border px-3 py-2 rounded col-span-2"
                placeholder="Tên sản phẩm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="border px-3 py-2 rounded"
                placeholder="Giá"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <select
                className="border px-3 py-2 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="md:col-span-4 max-h-48 object-contain"
                />
              )}
              <textarea
                className="border px-3 py-2 rounded md:col-span-4"
                placeholder="Mô tả"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="md:col-span-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editingId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Ảnh</th>
                  <th className="p-3">Tiêu đề</th>
                  <th className="p-3">Giá</th>
                  <th className="p-3">Danh mục</th>
                  <th className="p-3">Mô tả</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={String(p.id)} className="border-b">
                    <td className="p-3">
                      {p.image && (
                        <img
                          src={p.image}
                          className="w-16 h-16 object-contain"
                        />
                      )}
                    </td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.price ?? "-"}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">
                      {(p.description || "").slice(0, 120)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onEdit(p)}
                        className="px-3 py-1 mr-2 bg-blue-500 text-white rounded"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => onDelete(String(p.id))}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td className="p-3" colSpan={6}>
                      Chưa có sản phẩm
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------- USERS -------------------- */}
      {tab === "users" && (
        <div>
          {/* Form */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!username || !email || !password)
                  return alert("Nhập đầy đủ thông tin");
                if (editingUserId) {
                  updateUser(editingUserId, {
                    username,
                    email,
                    password,
                    role,
                  });
                } else {
                  addUser({ username, email, password, role });
                }
                resetUserForm();
              }}
              className="grid grid-cols-1 md:grid-cols-4 gap-3"
            >
              <input
                className="border px-3 py-2 rounded col-span-2"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="border px-3 py-2 rounded"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border px-3 py-2 rounded"
                placeholder="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                className="border px-3 py-2 rounded"
                value={role}
                onChange={(e) => setRole(e.target.value as "admin" | "user")}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="md:col-span-4">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editingUserId ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Tên người dùng</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b">
                    <td className="p-3">{u.username}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">
                      <button
                        onClick={() => onEditUser(u)}
                        className="px-3 py-1 mr-2 bg-blue-500 text-white rounded"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => onDeleteUserHandler(u.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
