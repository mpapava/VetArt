import { useState } from "react";
import { useApi } from "../api/hooks";
import { adminUpload, resolveAssetUrl } from "../api/client";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select" | "image" | "html";
  langed?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface CrudApi<T> {
  list: () => Promise<T[]>;
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

interface ColumnConfig {
  key: string;
  label: string;
}

interface Props<T extends { id: string }> {
  title: string;
  api: CrudApi<T>;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  emptyItem: Record<string, unknown>;
}

const LANGS: { suffix: "En" | "Ka" | "Ru"; label: string }[] = [
  { suffix: "En", label: "EN" },
  { suffix: "Ka", label: "GE" },
  { suffix: "Ru", label: "RU" },
];

export default function ResourceManager<T extends { id: string }>({ title, api, fields, columns, emptyItem }: Props<T>) {
  const { data: items, loading, error: loadError } = useApi(() => api.list(), [title]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [items2, setItems2] = useState<T[] | null>(null);
  const list = items2 ?? items;

  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<"En" | "Ka" | "Ru">("En");

  async function refresh() {
    const fresh = await api.list();
    setItems2(fresh);
    setRefreshKey((k) => k + 1);
  }

  function startCreate() {
    setEditing({ ...emptyItem });
    setError(null);
  }

  function startEdit(item: T) {
    setEditing({ ...item } as Record<string, unknown>);
    setError(null);
  }

  function cancelEdit() {
    setEditing(null);
  }

  function updateField(key: string, value: unknown) {
    setEditing((e) => (e ? { ...e, [key]: value } : e));
  }

  async function handleUpload(key: string, file: File) {
    setUploadingKey(key);
    try {
      const { url } = await adminUpload(file);
      updateField(key, url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingKey(null);
    }
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const id = editing.id as string | undefined;
      if (id) {
        await api.update(id, editing as Partial<T>);
      } else {
        await api.create(editing as Partial<T>);
      }
      setEditing(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: T) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      await api.remove(item.id);
      await refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div key={refreshKey}>
      <div className="admin-header-row">
        <h1 className="admin-h1">{title}</h1>
        {!editing && (
          <button className="btn btn-primary" onClick={startCreate}>
            + Add New
          </button>
        )}
      </div>

      {editing && (
        <div className="admin-form-card">
          {fields.some((f) => f.langed) && (
            <div className="admin-lang-tabs">
              {LANGS.map((l) => (
                <button key={l.suffix} type="button" className={activeLang === l.suffix ? "active" : ""} onClick={() => setActiveLang(l.suffix)}>
                  {l.label}
                </button>
              ))}
            </div>
          )}
          <div className="admin-form-grid">
            {fields.map((f) => {
              if (f.langed) {
                const key = `${f.key}${activeLang}`;
                return (
                  <div className={`field${f.type === "textarea" || f.type === "html" ? " full" : ""}`} key={key}>
                    <label>
                      {f.label} ({activeLang})
                    </label>
                    {f.type === "html" || f.type === "textarea" ? (
                      <textarea
                        rows={f.type === "html" ? 10 : 3}
                        value={(editing[key] as string) ?? ""}
                        onChange={(e) => updateField(key, e.target.value)}
                        placeholder={f.placeholder}
                      />
                    ) : (
                      <input value={(editing[key] as string) ?? ""} onChange={(e) => updateField(key, e.target.value)} placeholder={f.placeholder} />
                    )}
                  </div>
                );
              }

              const value = editing[f.key];
              if (f.type === "checkbox") {
                return (
                  <div className="field" key={f.key}>
                    <label>
                      <input type="checkbox" checked={Boolean(value)} onChange={(e) => updateField(f.key, e.target.checked)} /> {f.label}
                    </label>
                  </div>
                );
              }
              if (f.type === "select") {
                return (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <select value={(value as string) ?? ""} onChange={(e) => updateField(f.key, e.target.value)}>
                      {f.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              if (f.type === "image") {
                const url = resolveAssetUrl(value as string | undefined);
                return (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    {url && <img src={url} alt="" className="admin-image-preview" />}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(f.key, file);
                      }}
                    />
                    {uploadingKey === f.key && <span className="admin-uploading">Uploading…</span>}
                  </div>
                );
              }
              if (f.type === "number") {
                return (
                  <div className="field" key={f.key}>
                    <label>{f.label}</label>
                    <input type="number" value={(value as number) ?? 0} onChange={(e) => updateField(f.key, Number(e.target.value))} />
                  </div>
                );
              }
              return (
                <div className={`field${f.type === "textarea" ? " full" : ""}`} key={f.key}>
                  <label>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea rows={3} value={(value as string) ?? ""} onChange={(e) => updateField(f.key, e.target.value)} placeholder={f.placeholder} />
                  ) : (
                    <input value={(value as string) ?? ""} onChange={(e) => updateField(f.key, e.target.value)} placeholder={f.placeholder} />
                  )}
                </div>
              );
            })}
          </div>
          {error && <div className="admin-error">{error}</div>}
          <div className="admin-form-actions">
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button className="btn btn-outline" onClick={cancelEdit} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading…</p>}
      {loadError && <p className="admin-error">{loadError}</p>}

      {list && (
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                {columns.map((c) => (
                  <td key={c.key}>{String((item as Record<string, unknown>)[c.key] ?? "")}</td>
                ))}
                <td className="admin-row-actions">
                  <button className="btn-link" onClick={() => startEdit(item)}>
                    Edit
                  </button>
                  <button className="btn-link danger" onClick={() => handleDelete(item)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="admin-empty">
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
