import { useEffect, useState } from "react";
import { adminGetAllContent, adminPutContent } from "../api/client";
import type { PageContentRow } from "../api/types";
import { useAuth } from "./AuthContext";

const PAGES = ["home", "about", "doctors", "gallery", "blog", "contact", "appointment"];
const LANGS: { suffix: "En" | "Ka" | "Ru"; label: string }[] = [
  { suffix: "En", label: "EN" },
  { suffix: "Ka", label: "GE" },
  { suffix: "Ru", label: "RU" },
];

function prettify(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function StringArrayEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="admin-array-editor">
      {value.map((item, i) => (
        <div className="admin-array-row" key={i}>
          <input
            value={item}
            onChange={(e) => {
              const next = [...value];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button type="button" className="btn-link danger" onClick={() => onChange(value.filter((_, j) => j !== i))}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn-link" onClick={() => onChange([...value, ""])}>
        + Add item
      </button>
    </div>
  );
}

function ObjectArrayEditor({ value, onChange }: { value: Record<string, string>[]; onChange: (v: Record<string, string>[]) => void }) {
  const keys = value[0] ? Object.keys(value[0]) : ["title", "desc"];
  return (
    <div className="admin-array-editor">
      {value.map((item, i) => (
        <div className="admin-array-object-row" key={i}>
          {keys.map((k) => (
            <div className="field" key={k}>
              <label>{prettify(k)}</label>
              <textarea
                rows={2}
                value={item[k] ?? ""}
                onChange={(e) => {
                  const next = value.map((v, j) => (j === i ? { ...v, [k]: e.target.value } : v));
                  onChange(next);
                }}
              />
            </div>
          ))}
          <button type="button" className="btn-link danger" onClick={() => onChange(value.filter((_, j) => j !== i))}>
            Remove item
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn-link"
        onClick={() => onChange([...value, Object.fromEntries(keys.map((k) => [k, ""]))])}
      >
        + Add item
      </button>
    </div>
  );
}

function FieldEditor({ objKey, value, onChange }: { objKey: string; value: unknown; onChange: (v: unknown) => void }) {
  if (Array.isArray(value)) {
    if (value.length === 0 || typeof value[0] === "string") {
      return <StringArrayEditor value={value as string[]} onChange={onChange} />;
    }
    return <ObjectArrayEditor value={value as Record<string, string>[]} onChange={onChange} />;
  }
  return <textarea rows={objKey.toLowerCase().includes("p1") || objKey.toLowerCase().includes("p2") || objKey.toLowerCase().includes("desc") ? 4 : 2} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />;
}

export default function ContentEditor() {
  const { isViewer } = useAuth();
  const [rows, setRows] = useState<Record<string, PageContentRow> | null>(null);
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState<"En" | "Ka" | "Ru">("En");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminGetAllContent().then((list) => {
      const map: Record<string, PageContentRow> = {};
      for (const row of list) map[row.key] = row;
      setRows(map);
    });
  }, []);

  if (!rows) return <p>Loading…</p>;

  const row = rows[page];
  const data = (row?.[`data${lang}`] as Record<string, unknown>) || {};

  function updateField(key: string, value: unknown) {
    setRows((prev) => {
      if (!prev) return prev;
      const current = prev[page] || { key: page, dataEn: {}, dataKa: {}, dataRu: {} };
      return {
        ...prev,
        [page]: {
          ...current,
          [`data${lang}`]: { ...(current[`data${lang}` as keyof PageContentRow] as object), [key]: value },
        },
      };
    });
    setSaved(false);
  }

  async function handleSave() {
    const current = rows![page];
    if (!current) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await adminPutContent(page, { dataEn: current.dataEn, dataKa: current.dataKa, dataRu: current.dataRu });
      setRows((prev) => (prev ? { ...prev, [page]: updated } : prev));
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="admin-header-row">
        <h1 className="admin-h1">Page Content</h1>
        {isViewer && <span className="admin-viewer-note">Demo account — read only</span>}
      </div>
      <div className="admin-lang-tabs" style={{ marginBottom: 8 }}>
        {PAGES.map((p) => (
          <button key={p} type="button" className={page === p ? "active" : ""} onClick={() => setPage(p)}>
            {prettify(p)}
          </button>
        ))}
      </div>
      <div className="admin-lang-tabs">
        {LANGS.map((l) => (
          <button key={l.suffix} type="button" className={lang === l.suffix ? "active" : ""} onClick={() => setLang(l.suffix)}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="admin-form-card">
        {Object.keys(data).length === 0 && <p className="admin-empty">No fields for this page/language yet.</p>}
        <div className="admin-form-grid">
          {Object.entries(data).map(([key, value]) => (
            <div className={`field full${isViewer ? " admin-readonly" : ""}`} key={key}>
              <label>{prettify(key)}</label>
              <FieldEditor objKey={key} value={value} onChange={(v) => !isViewer && updateField(key, v)} />
            </div>
          ))}
        </div>
        {error && <div className="admin-error">{error}</div>}
        {saved && <div className="admin-success">Saved.</div>}
        {!isViewer && (
          <div className="admin-form-actions">
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
