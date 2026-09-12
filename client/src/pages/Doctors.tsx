import { Link } from "react-router-dom";
import { useLang, useField, usePageData } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getContent, getDoctors, resolveAssetUrl } from "../api/client";
import { useSettings, telHref } from "../api/SettingsContext";
import type { DoctorsPageContent } from "../api/types";
import PageHero from "../components/PageHero";
import { CheckupIcon, SurgeryIcon, ExoticIcon } from "../components/Icons";

const ROLE_ICONS = [CheckupIcon, SurgeryIcon, ExoticIcon];

export default function Doctors() {
  const { t } = useLang();
  const field = useField();
  const settings = useSettings();
  const { data: row } = useApi(() => getContent<DoctorsPageContent>("doctors"), []);
  const content = usePageData(row);
  const { data: doctors } = useApi(() => getDoctors(), []);

  if (!content) return null;

  return (
    <>
      <PageHero crumbKey="nav.doctors" title={content.heroTitle} desc={content.heroDesc} />

      <section>
        <div className="doctors-grid">
          {doctors?.map((doc, i) => {
            const RoleIcon = ROLE_ICONS[i % ROLE_ICONS.length];
            return (
              <div className="doctor-card" key={doc.id}>
                <div className="doctor-avatar">
                  {doc.photoUrl ? (
                    <img src={resolveAssetUrl(doc.photoUrl)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  ) : (
                    <RoleIcon size={30} />
                  )}
                </div>
                <div className="role">{field(doc, "role")}</div>
                <h3>{field(doc, "title")}</h3>
                <p>{field(doc, "desc")}</p>
              </div>
            );
          })}
          <div className="doctor-note">{content.note}</div>
        </div>
      </section>

      <div className="final-cta">
        <h2>{t("finalcta.doctors.title")}</h2>
        <p>{t("finalcta.doctors.desc")}</p>
        <div className="hero-actions">
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
    </>
  );
}
