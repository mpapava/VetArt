import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { admin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-logo">
          Vet<b>Art</b> Admin
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className="admin-error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={busy} style={{ width: "100%", justifyContent: "center" }}>
          {busy ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
