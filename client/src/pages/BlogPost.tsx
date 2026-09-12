import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLang, useField } from "../i18n/LangContext";
import { getBlogPost } from "../api/client";
import { useSettings, telHref } from "../api/SettingsContext";
import type { BlogPost as BlogPostType } from "../api/types";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLang();
  const field = useField();
  const settings = useSettings();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setPost(null);
    setNotFound(false);
    getBlogPost(slug)
      .then(setPost)
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="article-wrap">
        <Link to="/blog" className="article-back">
          {t("cta.back")}
        </Link>
        <h1>404</h1>
        <p>This article could not be found.</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="article-wrap">
      <Link to="/blog" className="article-back">
        {t("cta.back")}
      </Link>
      <span className="tag">{field(post, "tag")}</span>
      <h1>{field(post, "title")}</h1>
      <div className="article-meta">VetArt Team</div>
      <div className="article-body" dangerouslySetInnerHTML={{ __html: field(post, "body") }} />
      <div className="hero-actions" style={{ marginTop: 12 }}>
        <Link to="/appointment" className="btn btn-primary">
          {t("cta.book")}
        </Link>
        {settings && (
          <a href={telHref(settings.phone)} className="btn btn-outline">
            {t("cta.call")}: {settings.phone}
          </a>
        )}
      </div>
    </div>
  );
}
