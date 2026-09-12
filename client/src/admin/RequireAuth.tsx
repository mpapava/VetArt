import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAuth();
  if (loading) return <div className="admin-loading">Loading…</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
