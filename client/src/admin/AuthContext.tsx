import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { adminLogin, adminMe, getToken, setToken, clearToken } from "../api/client";

interface AdminInfo {
  id: string;
  email: string;
}

interface AuthContextValue {
  admin: AdminInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    adminMe()
      .then(setAdmin)
      .catch(() => {
        clearToken();
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await adminLogin(email, password);
    setToken(res.token);
    setAdmin(res.admin);
  }

  function logout() {
    clearToken();
    setAdmin(null);
  }

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
