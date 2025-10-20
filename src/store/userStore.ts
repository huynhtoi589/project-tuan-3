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

  // auth
  register: (username: string, password: string, email: string) => boolean;
  login: (identifier: string, password: string) => boolean;
  logout: () => void;

  // admin / management
  addUser: (data: Omit<User, "id">) => User;
  updateUser: (id: string, patch: Partial<User>) => User | null;
  deleteUser: (id: string) => boolean;
  loadUsers: () => void;

  // ensure admin exists
  ensureAdmin: () => void;
}

const USERS_KEY = "users";
const SESSION_KEY = "session";

const loadUsersFromStorage = (): User[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const useUserStore = create<UserStore>((set, get) => {
  // load users
  const stored = loadUsersFromStorage();

  // ensure admin exists
  if (!stored.find((u) => u.email === "admin@gmail.com")) {
    const admin: User = {
      id: "admin-1",
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

    register: (username: string, password: string, email: string) => {
      // chỉ cần có @ là hợp lệ
      if (!email.includes("@")) return false;

      const users = get().users;
      if (users.find((u) => u.username === username || u.email === email)) {
        return false;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        password,
        role: "user", // 🔥 mặc định role user
      };
      const updated = [...users, newUser];
      saveUsersToStorage(updated);
      set({ users: updated });
      return true;
    },

    login: (identifier: string, password: string) => {
      const users = get().users;
      const found = users.find(
        (u) =>
          (u.username === identifier || u.email === identifier) &&
          u.password === password
      );
      if (!found) return false;
      localStorage.setItem(SESSION_KEY, JSON.stringify(found));
      set({ user: found });
      return true;
    },

    logout: () => {
      localStorage.removeItem(SESSION_KEY);
      set({ user: null });
    },

    addUser: (data: Omit<User, "id">) => {
      const users = get().users;
      const newUser: User = { ...data, id: `user-${Date.now()}` };
      const updated = [newUser, ...users];
      saveUsersToStorage(updated);
      set({ users: updated });
      return newUser;
    },

    updateUser: (id: string, patch: Partial<User>) => {
      const users = get().users.slice();
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return null;

      users[idx] = { ...users[idx], ...patch };
      saveUsersToStorage(users);
      set({ users });

      // nếu user hiện tại bị sửa, update session
      const sessionRaw2 = localStorage.getItem(SESSION_KEY);
      if (sessionRaw2) {
        const s = JSON.parse(sessionRaw2) as User;
        if (s.id === id) {
          const updatedSession = { ...s, ...patch };
          localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
          set({ user: updatedSession });
        }
      }
      return users[idx];
    },

    deleteUser: (id: string) => {
      const users = get().users.filter((u) => u.id !== id);
      saveUsersToStorage(users);
      set({ users });

      // nếu user hiện tại bị xóa → logout
      const sessionRaw2 = localStorage.getItem(SESSION_KEY);
      if (sessionRaw2) {
        const s = JSON.parse(sessionRaw2) as User;
        if (s.id === id) {
          localStorage.removeItem(SESSION_KEY);
          set({ user: null });
        }
      }
      return true;
    },

    loadUsers: () => {
      const fresh = loadUsersFromStorage();
      set({ users: fresh });
    },

    ensureAdmin: () => {
      const users = get().users;
      if (!users.find((u) => u.email === "admin@gmail.com")) {
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
