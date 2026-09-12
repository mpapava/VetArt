import { useLang } from "../i18n/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">
          Vet<b>Art</b>
        </div>
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
