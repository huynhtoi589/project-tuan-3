import { create } from "zustand";

interface User {
  username: string;
  password: string;
}

interface UserStore {
  user: User | null;
  register: (username: string, password: string) => boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),

  register: (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.find((u: User) => u.username === username);
    if (exists) return false; // username đã tồn tại

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));

    set({ user: newUser });
    return true;
  },

  login: (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u: User) => u.username === username && u.password === password
    );
    if (!found) return false;

    localStorage.setItem("user", JSON.stringify(found));
    set({ user: found });
    return true;
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
