import { useState } from "react";
import ResourceManager, { type FieldConfig } from "./ResourceManager";
import { adminGalleryCategories, adminListGalleryPhotos, adminCreateGalleryPhoto, adminDeleteGalleryPhoto, adminUpload, resolveAssetUrl } from "../api/client";
import { useApi } from "../api/hooks";
import type { GalleryCategoryAdmin, GalleryPhoto } from "../api/types";

const categoryFields: FieldConfig[] = [
  { key: "key", label: "Key (e.g. dog, cat, bird)", type: "text" },
  { key: "order", label: "Order", type: "number" },
  { key: "label", label: "Label", type: "text", langed: true },
];

function CategoriesTab() {
  return (
    <ResourceManager<GalleryCategoryAdmin>
      title="Gallery Albums"
      api={adminGalleryCategories}
      fields={categoryFields}
      columns={[
        { key: "order", label: "#" },
        { key: "key", label: "Key" },
        { key: "labelEn", label: "Label (EN)" },
        { key: "_count", label: "Photos" },
      ]}
      emptyItem={{ key: "", order: 0, labelEn: "", labelKa: "", labelRu: "" }}
    />
  );
}

function PhotosTab() {
  const { data: categories } = useApi(() => adminGalleryCategories.list(), []);
  const [selected, setSelected] = useState<string>("");
  const activeCategoryId = selected || categories?.[0]?.id || "";
  const { data: photos, loading } = useApi(() => (activeCategoryId ? adminListGalleryPhotos(activeCategoryId) : Promise.resolve([])), [activeCategoryId]);
  const [refreshTick, setRefreshTick] = useState(0);
  const [list, setList] = useState<GalleryPhoto[] | null>(null);
  const shown = list ?? photos;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    if (!activeCategoryId) return;
    setList(await adminListGalleryPhotos(activeCategoryId));
    setRefreshTick((t) => t + 1);
  }

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length || !activeCategoryId) return;
    setUploading(true);
    setError(null);
    try {
      let order = (shown?.length ?? 0) + 1;
      for (const file of Array.from(files)) {
        const { url, thumbUrl } = await adminUpload(file);
        await adminCreateGalleryPhoto({ categoryId: activeCategoryId, imageUrl: url, thumbUrl, order: order++ });
      }
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo?")) return;
    await adminDeleteGalleryPhoto(id);
    await refresh();
  }

  return (
    <div key={refreshTick}>
      <h1 className="admin-h1">Gallery Photos</h1>
      <div className="admin-form-card">
        <div className="admin-form-grid">
          <div className="field">
            <label>Album</label>
            <select value={activeCategoryId} onChange={(e) => setSelected(e.target.value)}>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.labelEn} ({c._count.photos})
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Add photos (select multiple at once)</label>
            <input type="file" accept="image/*" multiple disabled={uploading || !activeCategoryId} onChange={(e) => handleFiles(e.target.files)} />
            {uploading && <span className="admin-uploading">Uploading…</span>}
          </div>
        </div>
        {error && <div className="admin-error">{error}</div>}
      </div>

      {loading && <p>Loading…</p>}
      <div className="admin-photo-grid">
        {shown?.map((p) => (
          <div className="admin-photo-tile" key={p.id}>
            <img src={resolveAssetUrl(p.thumbUrl || p.imageUrl)} alt="" />
            <button className="btn-link danger" onClick={() => handleDelete(p.id)}>
              Delete
            </button>
          </div>
        ))}
        {shown?.length === 0 && <p className="admin-empty">No photos in this album yet.</p>}
      </div>
    </div>
  );
}

export default function GalleryManager() {
  const [tab, setTab] = useState<"categories" | "photos">("photos");
  return (
    <div>
      <div className="admin-lang-tabs" style={{ marginBottom: 20 }}>
        <button type="button" className={tab === "photos" ? "active" : ""} onClick={() => setTab("photos")}>
          Photos
        </button>
        <button type="button" className={tab === "categories" ? "active" : ""} onClick={() => setTab("categories")}>
          Albums
        </button>
      </div>
      {tab === "photos" ? <PhotosTab /> : <CategoriesTab />}
    </div>
  );
}
