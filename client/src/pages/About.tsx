import { Link } from "react-router-dom";
import { useLang, usePageData } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getContent } from "../api/client";
import type { AboutContent } from "../api/types";
import PageHero from "../components/PageHero";
import { LoveIcon, ModernIcon, ExoticIcon, TransparencyIcon } from "../components/Icons";

const ABOUT_ICONS = [LoveIcon, ModernIcon, ExoticIcon, TransparencyIcon];

export default function About() {
  const { t } = useLang();
  const { data: row } = useApi(() => getContent<AboutContent>("about"), []);
  const a = usePageData(row);

  if (!a) return null;

  return (
    <>
      <PageHero crumbKey="nav.about" title={a.heroTitle} desc={a.heroDesc} />

      <section>
        <div className="about-grid">
          <div>
            <div className="section-label">{a.historyLabel}</div>
            <h2 style={{ fontSize: "clamp(24px,4vw,32px)", fontWeight: 800, margin: "0 0 18px", letterSpacing: "-0.01em" }}>{a.historyTitle}</h2>
            <p>{a.historyP1}</p>
            <p>{a.historyP2}</p>
            <div className="section-label" style={{ marginTop: 8 }}>
              {a.valuesLabel}
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.9 }}>
              {a.valuesItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="about-cards">
            {a.cards.map((card, i) => {
              const CardIcon = ABOUT_ICONS[i] || LoveIcon;
              return (
                <div className="about-card" key={i}>
                  <CardIcon className="icon" />
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="final-cta">
        <h2>{t("finalcta.about.title")}</h2>
        <p>{t("finalcta.about.desc")}</p>
        <div className="hero-actions">
          <Link to="/doctors" className="btn btn-primary">
            {t("cta.doctorsPage")}
          </Link>
          <Link to="/appointment" className="btn btn-outline">
            {t("cta.book")}
          </Link>
        </div>
      </div>
    </>
  );
}
