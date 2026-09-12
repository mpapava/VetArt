import { useEffect, useState } from "react";
import { adminGetSettings, adminPutSettings } from "../api/client";
import type { Settings } from "../api/types";

const FIELDS: { key: keyof Settings; label: string }[] = [
  { key: "phone", label: "Phone (display, e.g. 555 63 17 87)" },
  { key: "email", label: "Email" },
  { key: "addressEn", label: "Address (English)" },
  { key: "addressKa", label: "Address (Georgian)" },
  { key: "addressRu", label: "Address (Russian)" },
  { key: "facebookUrl", label: "Facebook URL" },
  { key: "mapQuery", label: "Google Maps search query" },
  { key: "followerCount", label: "Facebook follower count (e.g. 3.1K+)" },
  { key: "recommendPercent", label: "Recommend percent (e.g. 96%)" },
  { key: "reviewCount", label: "Review count (e.g. 17)" },
];

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminGetSettings().then(setSettings).catch(() => setError("Could not load settings"));
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const result = await adminPutSettings(settings);
      setSettings(result);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!settings) return <p>Loading…</p>;

  return (
    <div>
      <h1 className="admin-h1">Settings</h1>
      <div className="admin-form-card">
        <div className="admin-form-grid">
          {FIELDS.map((f) => (
            <div className="field" key={f.key}>
              <label>{f.label}</label>
              <input
                value={settings[f.key] ?? ""}
                onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        {error && <div className="admin-error">{error}</div>}
        {saved && <div className="admin-success">Saved.</div>}
        <div className="admin-form-actions">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
