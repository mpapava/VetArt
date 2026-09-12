import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LINKS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/content", label: "Page Content" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/doctors", label: "Doctors" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/blog", label: "Blog Posts" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/appointments", label: "Appointment Requests" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          Vet<b>Art</b> <span>Admin</span>
        </div>
        <nav className="admin-nav">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <a href="/projects/vetart/" className="admin-view-site" target="_blank" rel="noopener">
          View live site ↗
        </a>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <span>{admin?.email}</span>
          <button className="btn btn-outline" onClick={logout}>
            Log Out
          </button>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
