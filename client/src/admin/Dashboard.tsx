import { Link } from "react-router-dom";
import { useApi } from "../api/hooks";
import { adminServices, adminDoctors, adminGallery, adminBlog, adminGetAppointments, adminGetMessages } from "../api/client";

export default function Dashboard() {
  const { data: services } = useApi(() => adminServices.list(), []);
  const { data: doctors } = useApi(() => adminDoctors.list(), []);
  const { data: gallery } = useApi(() => adminGallery.list(), []);
  const { data: posts } = useApi(() => adminBlog.list(), []);
  const { data: appointments } = useApi(() => adminGetAppointments(), []);
  const { data: messages } = useApi(() => adminGetMessages(), []);

  const newAppointments = appointments?.filter((a) => a.status === "NEW").length ?? 0;
  const newMessages = messages?.filter((m) => m.status === "NEW").length ?? 0;

  const cards = [
    { label: "Services", count: services?.length, to: "/admin/services" },
    { label: "Doctors", count: doctors?.length, to: "/admin/doctors" },
    { label: "Gallery items", count: gallery?.length, to: "/admin/gallery" },
    { label: "Blog posts", count: posts?.length, to: "/admin/blog" },
    { label: "New appointment requests", count: newAppointments, to: "/admin/appointments", highlight: newAppointments > 0 },
    { label: "New messages", count: newMessages, to: "/admin/messages", highlight: newMessages > 0 },
  ];

  return (
    <div>
      <h1 className="admin-h1">Dashboard</h1>
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
