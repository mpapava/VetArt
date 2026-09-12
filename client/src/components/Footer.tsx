import { useLang } from "../i18n/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="footer-inner">
        <img src={`${import.meta.env.BASE_URL}brand/logo-full.png`} alt="VetArt" className="footer-logo-img" />
        <div className="footer-note">
          &copy; 2026 {t("footer.rights")} &middot; {t("footer.builtBy")}{" "}
          <a href="https://www.papava.ge" target="_blank" rel="noopener">
            Mikheil Papava
          </a>
        </div>
      </div>
    </footer>
  );
}
