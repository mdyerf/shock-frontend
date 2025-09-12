// app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, FC } from "react";
import { isAuthenticated, logout } from "../api/auth";

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
