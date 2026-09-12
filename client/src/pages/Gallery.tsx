import { useState } from "react";
import { useLang, useField, usePageData } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getContent, getGallery, resolveAssetUrl } from "../api/client";
import { useSettings } from "../api/SettingsContext";
import type { GalleryPageContent } from "../api/types";
import PageHero from "../components/PageHero";
import { DogIcon, CatIcon, BirdIcon, ExoticIcon, ClinicIcon, SurgeryIcon } from "../components/Icons";

const CATEGORY_ICONS: Record<string, (p: { size?: number }) => JSX.Element> = {
  dog: DogIcon, cat: CatIcon, bird: BirdIcon, exotic: ExoticIcon, clinic: ClinicIcon, surgery: SurgeryIcon,
};

export default function Gallery() {
  const { t } = useLang();
  const field = useField();
  const settings = useSettings();
  const { data: row } = useApi(() => getContent<GalleryPageContent>("gallery"), []);
  const content = usePageData(row);
  const { data: categories } = useApi(() => getGallery(), []);

  const [openId, setOpenId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!content) return null;

  return (
    <>
      <PageHero crumbKey="nav.gallery" title={content.heroTitle} desc={content.heroDesc} />

      <section>
        <div className="gallery-grid">
          {categories?.map((cat) => {
            const TileIcon = CATEGORY_ICONS[cat.key] || ClinicIcon;
            const cover = cat.photos[0];
            const isOpen = openId === cat.id;
            return (
              <button
                type="button"
                className={`gallery-tile${isOpen ? " is-open" : ""}`}
                key={cat.id}
                onClick={() => setOpenId(isOpen ? null : cat.id)}
              >
                {cover ? (
                  <img src={resolveAssetUrl(cover.imageUrl)} alt={field(cat, "label")} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
                ) : (
                  <TileIcon size={34} />
                )}
                {!cover && <span>{field(cat, "label")}</span>}
                {cover && <span className="gallery-tile-caption">{field(cat, "label")} &middot; {cat.photos.length}</span>}
              </button>
            );
          })}
        </div>

        {openId &&
          (() => {
            const cat = categories?.find((c) => c.id === openId);
            if (!cat) return null;
            return (
              <div className="album-panel">
                <h3>{field(cat, "label")}</h3>
                {cat.photos.length === 0 ? (
                  <p className="admin-empty">No photos in this album yet.</p>
                ) : (
                  <div className="album-grid">
                    {cat.photos.map((p) => (
                      <button type="button" className="album-photo" key={p.id} onClick={() => setLightbox(resolveAssetUrl(p.imageUrl) || null)}>
                        <img src={resolveAssetUrl(p.imageUrl)} alt="" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

        <p className="appt-note" style={{ marginTop: 28, maxWidth: 640 }}>
          {content.note}
        </p>
        {settings && (
          <a href={settings.facebookUrl} target="_blank" rel="noopener" className="btn btn-outline" style={{ marginTop: 8 }}>
            {t("cta.fbGallery")}
          </a>
        )}
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" />
        </div>
      )}
    </>
  );
}
