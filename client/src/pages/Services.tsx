import { Link } from "react-router-dom";
import { useLang, useField } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getServices } from "../api/client";
import { useSettings, telHref } from "../api/SettingsContext";
import PageHero from "../components/PageHero";
import { Icon } from "../components/Icons";

export default function Services() {
  const { t } = useLang();
  const field = useField();
  const settings = useSettings();
  const { data: services } = useApi(() => getServices(), []);

  return (
    <>
      <PageHero crumbKey="nav.services" title={t("services.title")} desc={t("services.desc")} />

      <section>
        <div className="services-grid">
          {services?.map((s) => (
            <div className="service-card" key={s.id}>
              <div className="service-icon">
                <Icon name={s.icon} />
              </div>
              <h3>{field(s, "title")}</h3>
              <p>{field(s, "desc")}</p>
            </div>
          ))}
        </div>
        <p className="appt-note" style={{ marginTop: 32, maxWidth: 640 }}>
          {t("services.priceNote")}
        </p>
      </section>

      <div className="final-cta">
        <h2>{t("finalcta.services.title")}</h2>
        <p>{t("finalcta.services.desc")}</p>
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
