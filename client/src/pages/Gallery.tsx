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
  const { data: items } = useApi(() => getGallery(), []);

  if (!content) return null;

  return (
    <>
      <PageHero crumbKey="nav.gallery" title={content.heroTitle} desc={content.heroDesc} />

      <section>
        <div className="gallery-grid">
          {items?.map((item) => {
            const TileIcon = CATEGORY_ICONS[item.category] || ClinicIcon;
            return (
              <div className="gallery-tile" key={item.id}>
                {item.imageUrl ? (
                  <img src={resolveAssetUrl(item.imageUrl)} alt={field(item, "label")} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
                ) : (
                  <>
                    <TileIcon size={34} />
                    <span>{field(item, "label")}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <p className="appt-note" style={{ marginTop: 28, maxWidth: 640 }}>
          {content.note}
        </p>
        {settings && (
          <a href={settings.facebookUrl} target="_blank" rel="noopener" className="btn btn-outline" style={{ marginTop: 8 }}>
            {t("cta.fbGallery")}
          </a>
        )}
      </section>
    </>
  );
}
