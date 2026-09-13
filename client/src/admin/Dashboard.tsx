import { Link } from "react-router-dom";
import { useApi } from "../api/hooks";
import { adminServices, adminDoctors, adminListGalleryPhotos, adminBlog, adminGetAppointments, adminGetMessages } from "../api/client";
import { useAuth } from "./AuthContext";

export default function Dashboard() {
  const { isViewer } = useAuth();
  const { data: services } = useApi(() => adminServices.list(), []);
  const { data: doctors } = useApi(() => adminDoctors.list(), []);
  const { data: photos } = useApi(() => adminListGalleryPhotos(), []);
  const { data: posts } = useApi(() => adminBlog.list(), []);
  const { data: appointments } = useApi(() => (isViewer ? Promise.resolve(null) : adminGetAppointments()), [isViewer]);
  const { data: messages } = useApi(() => (isViewer ? Promise.resolve(null) : adminGetMessages()), [isViewer]);

  const newAppointments = appointments?.filter((a) => a.status === "NEW").length ?? 0;
  const newMessages = messages?.filter((m) => m.status === "NEW").length ?? 0;

  const cards = [
    { label: "Services", count: services?.length, to: "/admin/services" },
    { label: "Doctors", count: doctors?.length, to: "/admin/doctors" },
    { label: "Gallery photos", count: photos?.length, to: "/admin/gallery" },
    { label: "Blog posts", count: posts?.length, to: "/admin/blog" },
    ...(isViewer
      ? []
      : [
          { label: "New appointment requests", count: newAppointments, to: "/admin/appointments", highlight: newAppointments > 0 },
          { label: "New messages", count: newMessages, to: "/admin/messages", highlight: newMessages > 0 },
        ]),
  ];

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-h1">Dashboard</h1>
      </div>
      {isViewer && (
        <div className="admin-viewer-banner">
          You're viewing a live, read-only demo account. Appointments and messages (real customer data) are hidden, and all edits are disabled.
        </div>
      )}
      <div className="admin-cards">
        {cards.map((c) => (
          <Link to={c.to} className={`admin-stat-card${c.highlight ? " highlight" : ""}`} key={c.label}>
            <b>{c.count ?? "–"}</b>
            <span>{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
