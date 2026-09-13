import { useState } from "react";
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
  { to: "/admin/appointments", label: "Appointment Requests", hideForViewer: true },
  { to: "/admin/messages", label: "Messages", hideForViewer: true },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  const { admin, isViewer, logout } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const links = LINKS.filter((link) => !(link.hideForViewer && isViewer));

  return (
    <div className="admin-shell">
      {navOpen && <div className="admin-nav-backdrop" onClick={() => setNavOpen(false)} />}
      <aside className={`admin-sidebar${navOpen ? " open" : ""}`}>
        <div className="admin-brand">
          Vet<b>Art</b> <span>Admin</span>
        </div>
        <nav className="admin-nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setNavOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
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
          <button className="admin-nav-toggle" aria-label="Toggle menu" onClick={() => setNavOpen((v) => !v)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <span className="admin-topbar-email">
            {admin?.email}
            {isViewer && <span className="admin-viewer-badge">Demo · read-only</span>}
          </span>
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
