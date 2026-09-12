import ResourceManager, { type FieldConfig } from "./ResourceManager";
import { adminTestimonials } from "../api/client";
import type { Testimonial } from "../api/types";

const fields: FieldConfig[] = [
  { key: "order", label: "Order", type: "number" },
  { key: "authorName", label: "Author Name", type: "text" },
  { key: "petName", label: "Pet Name (optional)", type: "text" },
  { key: "rating", label: "Rating (1-5)", type: "number" },
  { key: "quote", label: "Quote", type: "textarea", langed: true },
  { key: "published", label: "Published (shown on site)", type: "checkbox" },
];

export default function TestimonialsManager() {
  return (
    <ResourceManager<Testimonial>
      title="Testimonials"
      api={adminTestimonials}
      fields={fields}
      columns={[
        { key: "authorName", label: "Author" },
        { key: "rating", label: "Rating" },
        { key: "published", label: "Published" },
      ]}
      emptyItem={{ order: 0, authorName: "", petName: "", rating: 5, quoteEn: "", quoteKa: "", quoteRu: "", published: true }}
    />
  );
}
