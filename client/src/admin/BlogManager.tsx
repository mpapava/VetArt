import ResourceManager, { type FieldConfig } from "./ResourceManager";
import { adminBlog } from "../api/client";
import type { BlogPost } from "../api/types";

const fields: FieldConfig[] = [
  { key: "slug", label: "Slug (URL, e.g. my-article)", type: "text" },
  { key: "coverImageUrl", label: "Cover Image", type: "image" },
  { key: "tag", label: "Tag", type: "text", langed: true },
  { key: "title", label: "Title", type: "text", langed: true },
  { key: "excerpt", label: "Excerpt", type: "textarea", langed: true },
  { key: "body", label: "Body (HTML: <p>, <h2>, <ul><li> supported)", type: "html", langed: true },
  { key: "published", label: "Published (shown on site)", type: "checkbox" },
];

export default function BlogManager() {
  return (
    <ResourceManager<BlogPost>
      title="Blog Posts"
      api={adminBlog}
      fields={fields}
      columns={[
        { key: "titleEn", label: "Title (EN)" },
        { key: "slug", label: "Slug" },
        { key: "published", label: "Published" },
      ]}
      emptyItem={{
        slug: "", tagEn: "", tagKa: "", tagRu: "",
        titleEn: "", titleKa: "", titleRu: "",
        excerptEn: "", excerptKa: "", excerptRu: "",
        bodyEn: "", bodyKa: "", bodyRu: "",
        published: true,
      }}
    />
  );
}
