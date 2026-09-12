import ResourceManager, { type FieldConfig } from "./ResourceManager";
import { adminGallery } from "../api/client";
import type { GalleryItem } from "../api/types";

const CATEGORY_OPTIONS = ["dog", "cat", "bird", "exotic", "clinic", "surgery"].map((v) => ({ value: v, label: v }));

const fields: FieldConfig[] = [
  { key: "order", label: "Order", type: "number" },
  { key: "category", label: "Category (icon shown when no photo)", type: "select", options: CATEGORY_OPTIONS },
  { key: "imageUrl", label: "Photo (optional)", type: "image" },
  { key: "label", label: "Label", type: "text", langed: true },
];

export default function GalleryManager() {
  return (
    <ResourceManager<GalleryItem>
      title="Gallery"
      api={adminGallery}
      fields={fields}
      columns={[
        { key: "order", label: "#" },
        { key: "labelEn", label: "Label (EN)" },
        { key: "category", label: "Category" },
      ]}
      emptyItem={{ order: 0, category: "clinic", labelEn: "", labelKa: "", labelRu: "" }}
    />
  );
}
