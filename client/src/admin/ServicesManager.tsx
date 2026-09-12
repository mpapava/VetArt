import ResourceManager, { type FieldConfig } from "./ResourceManager";
import { adminServices } from "../api/client";
import type { Service } from "../api/types";

const ICON_OPTIONS = [
  "checkup", "vaccination", "surgery", "lab", "dental", "exotic", "microchip", "hospitalization",
].map((v) => ({ value: v, label: v }));

const fields: FieldConfig[] = [
  { key: "order", label: "Order", type: "number" },
  { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
  { key: "title", label: "Title", type: "text", langed: true },
  { key: "desc", label: "Description", type: "textarea", langed: true },
  { key: "active", label: "Active (shown on site)", type: "checkbox" },
];

export default function ServicesManager() {
  return (
    <ResourceManager<Service>
      title="Services"
      api={adminServices}
      fields={fields}
      columns={[
        { key: "order", label: "#" },
        { key: "titleEn", label: "Title (EN)" },
        { key: "icon", label: "Icon" },
        { key: "active", label: "Active" },
      ]}
      emptyItem={{ order: 0, icon: "checkup", titleEn: "", titleKa: "", titleRu: "", descEn: "", descKa: "", descRu: "", active: true }}
    />
  );
}
