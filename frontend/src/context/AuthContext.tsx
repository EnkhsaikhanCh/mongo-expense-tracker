"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "@/utils/token";
import { useAuthStore } from "@/store/authStore";

interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setAuthStatus } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? getAccessToken() : null;
    if (token) {
      setAuthStatus("isAuth");
    } else {
      setAuthStatus("notAuth");
    }
  }, [setAuthStatus]);

  const login = (token: string) => {
    setAccessToken(token);
    setAuthStatus("isAuth");
    router.push("/dashboard");
  };

  const logout = () => {
    removeAccessToken();
    setAuthStatus("notAuth");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
