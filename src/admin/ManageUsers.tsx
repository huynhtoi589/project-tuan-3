import React, { useState } from "react";
import { useUserStore } from "../store/userStore";
import { Search, UserPlus, Pencil, Trash2, Save, X } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const ManageUsers: React.FC = () => {
  const users = useUserStore((s) => s.users);
  const { user: currentUser, deleteUser, addUser, updateUser } = useUserStore();

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ username: "", email: "", role: "user" });
  const [showAddPopup, setShowAddPopup] = useState(false);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      filterRole === "all" ? true : u.role === filterRole;

    return matchSearch && matchRole;
  });

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const startEdit = (u: any) => {
    setEditing(u.id);
    setForm({ username: u.username, email: u.email, role: u.role });
  };

  const saveEdit = () => {
    if (!editing) return;
    updateUser(editing, form);
    setEditing(null);
  };

  const addNew = () => {
    if (!form.username || !form.email) return;
    addUser(form);
    setForm({ username: "", email: "", role: "user" });
    setShowAddPopup(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">👥 Quản lý Người dùng</h2>

        <button
          onClick={() => setShowAddPopup(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <UserPlus size={18} /> Thêm người dùng
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2 text-gray-400" size={18} />
          <input
            className="border pl-8 pr-3 py-2 rounded-lg"
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          className="border px-3 py-2 rounded-lg"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-200 text-gray-900">
              <th className="py-2">Avatar</th>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => {
              const isEditing = editing === u.id;
              return (
                <tr key={u.id} className="border-b">
                  <td className="py-2">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${u.username}`}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        className="border rounded px-2"
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                      />
                    ) : (
                      u.username
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        className="border rounded px-2"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    ) : (
                      u.email
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        className="border rounded px-2"
                        value={form.role}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span
                        className={`${
                          u.role === "admin"
                            ? "text-purple-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    )}
                  </td>

                  <td className="space-x-3 py-2">
                    {isEditing ? (
                      <>
                        <button
                          className="text-green-600 hover:scale-110"
                          onClick={saveEdit}
                        >
                          <Save size={18} />
                        </button>
                        <button
                          className="text-gray-600 hover:scale-110"
                          onClick={() => setEditing(null)}
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 hover:scale-110"
                          onClick={() => startEdit(u)}
                        >
                          <Pencil size={18} />
                        </button>
                        {u.id !== currentUser?.id && u.role !== "admin" && (
                          <button
                            className="text-red-600 hover:scale-110"
                            onClick={() => deleteUser(u.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={`px-3 py-1 rounded ${
              n === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
      </div>

      {/* POPUP ADD USER */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3 shadow-lg">
            <h2 className="font-bold text-lg text-blue-700">
              ➕ Thêm người dùng mới
            </h2>

            <input
              className="border p-2 w-full rounded"
              placeholder="Tên đăng nhập"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <select
              className="border p-2 rounded w-full"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              className="bg-green-600 text-white w-full py-2 rounded"
              onClick={addNew}
            >
              ✅ Lưu
            </button>

            <button
              className="bg-gray-300 w-full py-2 rounded"
              onClick={() => setShowAddPopup(false)}
            >
              ❌ Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
