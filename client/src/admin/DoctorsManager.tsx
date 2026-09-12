import ResourceManager, { type FieldConfig } from "./ResourceManager";
import { adminDoctors } from "../api/client";
import type { Doctor } from "../api/types";

const fields: FieldConfig[] = [
  { key: "order", label: "Order", type: "number" },
  { key: "photoUrl", label: "Photo", type: "image", thumbKey: "photoThumbUrl" },
  { key: "role", label: "Role / Specialty", type: "text", langed: true },
  { key: "title", label: "Title", type: "text", langed: true },
  { key: "desc", label: "Description", type: "textarea", langed: true },
  { key: "active", label: "Active (shown on site)", type: "checkbox" },
];

export default function DoctorsManager() {
  return (
    <ResourceManager<Doctor>
      title="Doctors"
      api={adminDoctors}
      fields={fields}
      columns={[
        { key: "order", label: "#" },
        { key: "titleEn", label: "Title (EN)" },
        { key: "roleEn", label: "Role (EN)" },
        { key: "active", label: "Active" },
      ]}
      emptyItem={{ order: 0, roleEn: "", roleKa: "", roleRu: "", titleEn: "", titleKa: "", titleRu: "", descEn: "", descKa: "", descRu: "", photoUrl: null, photoThumbUrl: null, active: true }}
    />
  );
}
