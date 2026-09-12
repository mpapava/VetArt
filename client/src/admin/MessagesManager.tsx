import { useState } from "react";
import { useApi } from "../api/hooks";
import { adminGetMessages, adminSetMessageStatus, adminDeleteMessage } from "../api/client";
import type { RequestStatus } from "../api/types";

export default function MessagesManager() {
  const { data, loading } = useApi(() => adminGetMessages(), []);
  const [rows, setRows] = useState<typeof data>(null);
  const list = rows ?? data;

  async function refresh() {
    setRows(await adminGetMessages());
  }

  async function setStatus(id: string, status: RequestStatus) {
    await adminSetMessageStatus(id, status);
    refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await adminDeleteMessage(id);
    refresh();
  }

  return (
    <div>
      <h1 className="admin-h1">Messages</h1>
      {loading && <p>Loading…</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list?.map((m) => (
            <tr key={m.id} className={m.status === "NEW" ? "admin-row-new" : ""}>
              <td data-label="Date">{new Date(m.createdAt).toLocaleString()}</td>
              <td data-label="Name">{m.name}</td>
              <td data-label="Phone">
                <a href={`tel:${m.phone}`}>{m.phone}</a>
              </td>
              <td data-label="Message">{m.message}</td>
              <td data-label="Status">
                <select value={m.status} onChange={(e) => setStatus(m.id, e.target.value as RequestStatus)}>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Read</option>
                  <option value="DONE">Done</option>
                </select>
              </td>
              <td className="admin-row-actions">
                <button className="btn-link danger" onClick={() => remove(m.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {list?.length === 0 && (
            <tr>
              <td colSpan={6} className="admin-empty">
                No messages yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
