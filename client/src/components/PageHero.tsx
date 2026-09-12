import { Link } from "react-router-dom";
import { useLang } from "../i18n/LangContext";

export default function PageHero({ crumbKey, title, desc }: { crumbKey: string; title: string; desc: string }) {
  const { t } = useLang();
  return (
    <div className="page-hero">
      <div className="page-hero-inner">
        <div className="breadcrumb">
          <Link to="/">{t("nav.home")}</Link> / {t(crumbKey)}
        </div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </div>
  );
}
