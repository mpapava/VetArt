import { useState, type FormEvent } from "react";
import { useLang, useField, usePageData } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getContent, postMessage } from "../api/client";
import { useSettings, telHref } from "../api/SettingsContext";
import type { ContactPageContent } from "../api/types";
import PageHero from "../components/PageHero";
import { PinIcon, PhoneIcon, MailIcon, FacebookIcon } from "../components/Icons";

export default function Contact() {
  const { t } = useLang();
  const field = useField();
  const settings = useSettings();
  const { data: row } = useApi(() => getContent<ContactPageContent>("contact"), []);
  const content = usePageData(row);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await postMessage({ name, phone, message });
      setStatus("sent");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (!content) return null;

  return (
    <>
      <PageHero crumbKey="nav.contact" title={t("contact.title")} desc={content.pageDesc} />

      <section>
        <div className="contact-grid">
          <div className="contact-card">
            {settings && (
              <>
                <div className="contact-row">
                  <PinIcon className="icon" size={20} />
                  <div>
                    <h4>{t("contact.address.label")}</h4>
                    <p>{field(settings, "address")}</p>
                  </div>
                </div>
                <div className="contact-row">
                  <PhoneIcon className="icon" size={20} />
                  <div>
                    <h4>{t("contact.phone.label")}</h4>
                    <a href={telHref(settings.phone)}>{settings.phone}</a>
                  </div>
                </div>
                <div className="contact-row">
                  <MailIcon className="icon" size={20} />
                  <div>
                    <h4>{t("contact.email.label")}</h4>
                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                  </div>
                </div>
                <div className="contact-row">
                  <FacebookIcon size={20} />
                  <div>
                    <h4>{t("contact.facebook.label")}</h4>
                    <a href={settings.facebookUrl} target="_blank" rel="noopener">
                      facebook.com/vetart.clinic
                    </a>
                  </div>
                </div>
              </>
            )}
            <p style={{ fontSize: 12.5, color: "var(--text-dim)", margin: 0 }}>{content.hoursNote}</p>
          </div>
          {settings && (
            <div className="map-frame">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VetArt location map"
              ></iframe>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="section-head">
          <div className="section-label">{t("contact.formLabel")}</div>
          <h2>{t("contact.formTitle")}</h2>
          <p>{t("contact.formDesc")}</p>
        </div>
        <form className="appt-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="c-name">{t("form.name")}</label>
            <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="c-phone">{t("form.phone")}</label>
            <input id="c-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="field full">
            <label htmlFor="c-message">{t("form.message")}</label>
            <textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} required />
          </div>
          {status === "sent" && <div className="appt-note">{t("contact.formSuccess")}</div>}
          {status === "error" && <div className="appt-note">Something went wrong. Please call us instead.</div>}
          <div className="submit-row">
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {t("contact.formSubmit")}
            </button>
            {settings && (
              <a href={telHref(settings.phone)} className="btn btn-outline">
                {t("cta.call")}: {settings.phone}
              </a>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
