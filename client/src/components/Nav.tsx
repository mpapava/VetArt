import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLang } from "../i18n/LangContext";
import { useSettings, telHref } from "../api/SettingsContext";
import { LogoMark } from "./Icons";
import type { Lang } from "../i18n/dictionary";

const NAV_ITEMS: { to: string; key: string }[] = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/doctors", key: "nav.doctors" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/blog", key: "nav.blog" },
  { to: "/contact", key: "nav.contact" },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const settings = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
        <LogoMark />
        Vet<b>Art</b>
      </Link>
      <div className="nav-right">
        {settings && (
          <a href={telHref(settings.phone)} className="nav-phone">
            ☎ {settings.phone}
          </a>
        )}
        <div className="lang-switch">
          {(["en", "ka", "ru"] as Lang[]).map((l) => (
            <button key={l} type="button" className={lang === l ? "is-active" : ""} onClick={() => setLang(l)}>
              {l === "en" ? "EN" : l === "ka" ? "GE" : "RU"}
            </button>
          ))}
        </div>
        <div className={`nav-links${open ? " open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {t(item.key)}
            </NavLink>
          ))}
          <NavLink to="/appointment" className="nav-cta" onClick={() => setOpen(false)}>
            {t("nav.book")}
          </NavLink>
        </div>
        <button
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
