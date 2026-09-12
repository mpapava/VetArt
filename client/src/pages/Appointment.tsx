import { useState, type FormEvent } from "react";
import { useLang, usePageData } from "../i18n/LangContext";
import { useApi } from "../api/hooks";
import { getContent, postAppointment } from "../api/client";
import { useSettings, telHref } from "../api/SettingsContext";
import type { AppointmentPageContent } from "../api/types";
import PageHero from "../components/PageHero";

export default function Appointment() {
  const { t } = useLang();
  const settings = useSettings();
  const { data: row } = useApi(() => getContent<AppointmentPageContent>("appointment"), []);
  const content = usePageData(row);

  const [form, setForm] = useState({ name: "", phone: "", petName: "", service: t("appt.opt1"), preferredDate: "", preferredTime: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await postAppointment(form);
      setStatus("sent");
      setForm({ name: "", phone: "", petName: "", service: t("appt.opt1"), preferredDate: "", preferredTime: "", notes: "" });
    } catch {
      setStatus("error");
    }
  }

  if (!content) return null;

  const serviceOptions = ["appt.opt1", "appt.opt2", "appt.opt3", "appt.opt4", "appt.opt5", "appt.opt6", "appt.opt7", "appt.opt8", "appt.opt9"];

  return (
    <>
      <PageHero crumbKey="nav.book" title={content.heroTitle} desc={content.heroDesc} />

      <section>
        <div className="section-head">
          <div className="section-label">{content.stepsLabel}</div>
          <h2>{content.stepsTitle}</h2>
        </div>
        <div className="steps-list">
          {content.steps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="num">{i + 1}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <form className="appt-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="a-name">{t("form.name")}</label>
            <input id="a-name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="a-phone">{t("form.phone")}</label>
            <input id="a-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="a-pet">{t("appt.pet")}</label>
            <input id="a-pet" placeholder={t("appt.petPlaceholder")} value={form.petName} onChange={(e) => update("petName", e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="a-service">{t("appt.service")}</label>
            <select id="a-service" value={form.service} onChange={(e) => update("service", e.target.value)}>
              {serviceOptions.map((key) => (
                <option key={key} value={t(key)}>
                  {t(key)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="a-date">{t("appt.date")}</label>
            <input id="a-date" type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="a-time">{t("appt.time")}</label>
            <input id="a-time" type="time" value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} />
          </div>
          <div className="field full">
            <label htmlFor="a-notes">{t("appt.notes")}</label>
            <textarea id="a-notes" placeholder={t("appt.notesPlaceholder")} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
          </div>
          <div className="appt-note">{content.note}</div>
          {status === "sent" && <div className="appt-note">{t("appt.success")}</div>}
          {status === "error" && <div className="appt-note">Something went wrong. Please call us instead.</div>}
          <div className="submit-row">
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {t("appt.submit")}
            </button>
            {settings && (
              <a href={telHref(settings.phone)} className="btn btn-outline">
                {t("cta.orCall")}: {settings.phone}
              </a>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
