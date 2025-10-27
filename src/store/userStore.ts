import { create } from "zustand";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface UserStore {
  user: User | null;
  users: User[];

  register: (username: string, password: string, email: string) => boolean;
  login: (identifier: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;

  addUser: (data: Omit<User, "id">) => User;
  updateUser: (id: string, patch: Partial<User>) => User | null;
  deleteUser: (id: string) => boolean;

  loadUsers: () => void;
  ensureAdmin: () => void;
}

const USERS_KEY = "users";
const SESSION_KEY = "session";

const loadUsersFromStorage = (): User[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const useUserStore = create<UserStore>((set, get) => {
  let stored = loadUsersFromStorage();

  // ✅ Luôn đảm bảo có Admin mặc định
  if (!stored.some((u) => u.email === "admin@gmail.com")) {
    const admin: User = {
      id: `admin-${Date.now()}`,
      username: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    };
    stored.unshift(admin);
    saveUsersToStorage(stored);
  }

  const sessionRaw = localStorage.getItem(SESSION_KEY);
  const sessionUser: User | null = sessionRaw ? JSON.parse(sessionRaw) : null;

  return {
    user: sessionUser,
    users: stored,

    register: (username, password, email) => {
      const users = get().users;

      if (!email.includes("@")) return false;
      if (users.some((u) => u.email === email || u.username === username)) return false;

      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        role: "user",
      };

      const updated = [...users, newUser];
      saveUsersToStorage(updated);
      set({ users: updated });

      return true;
    },

    login: (identifier, password) => {
      const found = get().users.find(
        (u) => u.email === identifier || u.username === identifier
      );

      if (!found) return { ok: false, error: "Tài khoản không tồn tại!" };
      if (found.password !== password)
        return { ok: false, error: "Mật khẩu không chính xác!" };

      localStorage.setItem(SESSION_KEY, JSON.stringify(found));
      set({ user: found });

      return { ok: true };
    },

    logout: () => {
      localStorage.removeItem(SESSION_KEY);
      set({ user: null });
    },

    addUser: (data) => {
      const newUser: User = { id: `user-${Date.now()}`, ...data };
      const updated = [newUser, ...get().users];

      saveUsersToStorage(updated);
      set({ users: updated });

      return newUser;
    },

    updateUser: (id, patch) => {
      const users = [...get().users];
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return null;

      const updated = { ...users[index], ...patch };
      users[index] = updated;

      saveUsersToStorage(users);
      set({ users });

      // ✅ Nếu đang đăng nhập tài khoản đó → update session luôn
      const s = get().user;
      if (s && s.id === id) {
        set({ user: updated });
        localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      }

      return updated;
    },

    deleteUser: (id) => {
      const users = get().users.filter((u) => u.id !== id);
      saveUsersToStorage(users);
      set({ users });

      // ✅ Xoá phiên nếu là chính user đó
      const s = get().user;
      if (s && s.id === id) {
        localStorage.removeItem(SESSION_KEY);
        set({ user: null });
      }

      return true;
    },

    loadUsers: () => {
      const fresh = loadUsersFromStorage();
      set({ users: fresh });
    },

    ensureAdmin: () => {
      const users = get().users;
      if (!users.some((u) => u.role === "admin")) {
        const admin: User = {
          id: `admin-${Date.now()}`,
          username: "admin",
          email: "admin@gmail.com",
          password: "admin123",
          role: "admin",
        };
        const updated = [admin, ...users];
        saveUsersToStorage(updated);
        set({ users: updated });
      }
    },
  };
});
