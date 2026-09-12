import { useState } from "react";
import { useApi } from "../api/hooks";
import { adminGetAppointments, adminSetAppointmentStatus, adminDeleteAppointment } from "../api/client";
import type { RequestStatus } from "../api/types";

export default function AppointmentsManager() {
  const { data, loading } = useApi(() => adminGetAppointments(), []);
  const [rows, setRows] = useState<typeof data>(null);
  const list = rows ?? data;

  async function refresh() {
    setRows(await adminGetAppointments());
  }

  async function setStatus(id: string, status: RequestStatus) {
    await adminSetAppointmentStatus(id, status);
    refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this request?")) return;
    await adminDeleteAppointment(id);
    refresh();
  }

  return (
    <div>
      <h1 className="admin-h1">Appointment Requests</h1>
      {loading && <p>Loading…</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Pet</th>
            <th>Service</th>
            <th>Preferred</th>
            <th>Notes</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list?.map((r) => (
            <tr key={r.id} className={r.status === "NEW" ? "admin-row-new" : ""}>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>{r.name}</td>
              <td>
                <a href={`tel:${r.phone}`}>{r.phone}</a>
              </td>
              <td>{r.petName}</td>
              <td>{r.service}</td>
              <td>
                {r.preferredDate || "–"} {r.preferredTime || ""}
              </td>
              <td>{r.notes || "–"}</td>
              <td>
                <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value as RequestStatus)}>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="DONE">Done</option>
                </select>
              </td>
              <td>
                <button className="btn-link danger" onClick={() => remove(r.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {list?.length === 0 && (
            <tr>
              <td colSpan={9} className="admin-empty">
                No requests yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
