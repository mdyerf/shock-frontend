// app/api/auth.ts
import api from "./index";

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login/", { username, password });
  const { access, refresh } = res.data;

  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }

  return res.data;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
};
