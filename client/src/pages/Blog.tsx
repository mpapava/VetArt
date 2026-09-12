import { Link } from "react-router-dom";
import { useField, usePageData } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getContent, getBlogList, resolveAssetUrl } from "../api/client";
import { useSettings } from "../api/SettingsContext";
import type { BlogPageContent } from "../api/types";
import PageHero from "../components/PageHero";
import { ModernIcon } from "../components/Icons";

export default function Blog() {
  const field = useField();
  const settings = useSettings();
  const { data: row } = useApi(() => getContent<BlogPageContent>("blog"), []);
  const content = usePageData(row);
  const { data: posts } = useApi(() => getBlogList(), []);

  if (!content) return null;

  return (
    <>
      <PageHero crumbKey="nav.blog" title={content.heroTitle} desc={content.heroDesc} />

      <section>
        <div className="blog-grid">
          {posts?.map((p) => (
            <Link to={`/blog/${p.slug}`} className="blog-card" key={p.id}>
              <div className="blog-card-media">
                {p.coverImageUrl ? (
                  <img src={resolveAssetUrl(p.coverImageUrl)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <ModernIcon size={30} />
                )}
              </div>
              <div className="blog-card-body">
                <span className="tag">{field(p, "tag")}</span>
                <h3>{field(p, "title")}</h3>
                <p>{field(p, "excerpt")}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="appt-note" style={{ marginTop: 32, maxWidth: 640 }}>
          {content.moreComingNote}{" "}
          {settings && (
            <a href={settings.facebookUrl} target="_blank" rel="noopener" style={{ color: "var(--accent)", fontWeight: 700 }}>
              Facebook
            </a>
          )}
        </p>
      </section>
    </>
  );
}
