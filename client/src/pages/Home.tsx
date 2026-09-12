import { Link } from "react-router-dom";
import { useLang, useField, usePageData } from "../i18n/LangContext";
import { useSettings, telHref } from "../api/SettingsContext";
import { useApi } from "../api/hooks";
import { getContent, getServices, getBlogList, getTestimonials } from "../api/client";
import { resolveAssetUrl } from "../api/client";
import type { HomeContent, AboutContent } from "../api/types";
import { Icon, LoveIcon, ModernIcon, ExoticIcon, TransparencyIcon, DogIcon, CatIcon, BirdIcon, StarIcon, PinIcon, PhoneIcon, MailIcon, FacebookIcon, CalendarIcon } from "../components/Icons";

const ABOUT_ICONS = [LoveIcon, ModernIcon, ExoticIcon, TransparencyIcon];

export default function Home() {
  const { t } = useLang();
  const field = useField();
  const settings = useSettings();
  const { data: homeRow } = useApi(() => getContent<HomeContent>("home"), []);
  const { data: aboutRow } = useApi(() => getContent<AboutContent>("about"), []);
  const { data: services } = useApi(() => getServices(), []);
  const { data: posts } = useApi(() => getBlogList(), []);
  const { data: testimonials } = useApi(() => getTestimonials(), []);

  const h = usePageData(homeRow);
  const a = usePageData(aboutRow);

  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <div>
            {h && (
              <>
                <div className="eyebrow-pill">
                  <span className="dot"></span>
                  <span>{h.eyebrow}</span>
                </div>
                <h1>
                  {h.heroTitleBefore}
                  <span>{h.heroTitleAccent}</span>
                  {h.heroTitleAfter}
                </h1>
                <p className="lede">{h.lede}</p>
              </>
            )}
            <div className="hero-actions">
              <Link to="/appointment" className="btn btn-primary">
                <CalendarIcon size={16} />
                <span>{t("cta.book")}</span>
              </Link>
              <Link to="/services" className="btn btn-outline">
                {t("cta.services")}
              </Link>
            </div>
            {settings && (
              <div className="hero-trust">
                <div className="trust-stat">
                  <b>{settings.followerCount}</b>
                  <span>{t("hero.followers")}</span>
                </div>
                <div className="trust-stat">
                  <b>{settings.recommendPercent}</b>
                  <span>
                    {t("reviews.recommend")} ({settings.reviewCount} {t("reviews.reviewsCount")})
                  </span>
                </div>
                <div className="trust-stat">
                  <b>$$</b>
                  <span>{t("hero.pricing")}</span>
                </div>
              </div>
            )}
          </div>
          <div className="hero-art">
            <div className="brand-lockup-frame">
              <img src={`${import.meta.env.BASE_URL}brand/logo-full.png`} alt="VetArt — Veterinary Clinic" />
            </div>
          </div>
        </div>
      </header>

      {a && (
        <section id="about">
          <div className="about-grid">
            <div>
              <div className="section-label">{a.aboutLabel}</div>
              <h2 style={{ fontSize: "clamp(24px,4vw,32px)", fontWeight: 800, margin: "0 0 18px", letterSpacing: "-0.01em" }}>{a.aboutTitle}</h2>
              <p>{a.aboutP1}</p>
              <p>{a.aboutP2}</p>
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
      )}

      <section id="services">
        <div className="section-head">
          <div className="section-label">{t("services.label")}</div>
          <h2>{t("services.title")}</h2>
          <p>{t("services.desc")}</p>
        </div>
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
        <div style={{ marginTop: 32 }}>
          <Link to="/services" className="btn btn-outline">
            {t("cta.viewAllServices")}
          </Link>
        </div>
      </section>

      {h && (
        <section id="doctors-teaser">
          <div className="doctor-teaser">
            <div>
              <h3>{h.doctorsTeaserTitle}</h3>
              <p>{h.doctorsTeaserDesc}</p>
            </div>
            <Link to="/doctors" className="btn btn-primary">
              {t("cta.doctorsPage")}
            </Link>
          </div>
        </section>
      )}

      <div className="patients-band" id="patients">
        <div className="patients-inner">
          <div className="section-label">{t("patients.label")}</div>
          <h2 style={{ fontSize: "clamp(24px,4vw,32px)", fontWeight: 800, margin: 0, letterSpacing: "-0.01em" }}>{t("patients.title")}</h2>
          <div className="patients-grid">
            <div className="patient-chip">
              <DogIcon size={30} className="icon" />
              <span>{t("patients.dog")}</span>
            </div>
            <div className="patient-chip">
              <CatIcon size={30} className="icon" />
              <span>{t("patients.cat")}</span>
            </div>
            <div className="patient-chip">
              <BirdIcon size={30} className="icon" />
              <span>{t("patients.bird")}</span>
            </div>
            <div className="patient-chip">
              <ExoticIcon size={30} className="icon" />
              <span>{t("patients.exotic")}</span>
            </div>
          </div>
        </div>
      </div>

      {h && settings && (
        <section id="reviews">
          <div className="review-card">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <blockquote>&ldquo;{h.reviewsQuote}&rdquo;</blockquote>
            <div className="review-meta">
              <div>
                <b>{settings.recommendPercent}</b>
                <span>{t("reviews.recommend")}</span>
              </div>
              <div>
                <b>{settings.reviewCount}</b>
                <span>{t("reviews.reviewsCount")}</span>
              </div>
              <div>
                <b>{settings.followerCount}</b>
                <span>{t("reviews.followers")}</span>
              </div>
            </div>
          </div>

          {testimonials && testimonials.length > 0 && (
            <div className="testimonial-grid">
              {testimonials.map((tm) => (
                <div className="testimonial-card" key={tm.id}>
                  <div className="stars">
                    {[...Array(tm.rating)].map((_, i) => (
                      <StarIcon key={i} size={14} />
                    ))}
                  </div>
                  <p>&ldquo;{field(tm, "quote") || tm.quoteEn}&rdquo;</p>
                  <span className="testimonial-author">
                    {tm.authorName}
                    {tm.petName ? ` · ${tm.petName}` : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {posts && posts.length > 0 && (
        <section id="blog-preview">
          <div className="section-head">
            <div className="section-label">{t("blog.label")}</div>
            <h2>{t("blog.title")}</h2>
            <p>{t("blog.desc")}</p>
          </div>
          <div className="blog-grid">
            {posts.slice(0, 2).map((p) => (
              <Link to={`/blog/${p.slug}`} className="blog-card" key={p.id}>
                <div className="blog-card-media">
                  {p.coverImageUrl ? (
                    <img src={resolveAssetUrl(p.coverThumbUrl || p.coverImageUrl)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <ModernIcon size={30} />
                  )}
                </div>
                <div className="blog-card-body">
                  <span className="tag">{field(p, "tag")}</span>
                  <h3>{field(p, "title")}</h3>
                  <p>{field(p, "excerpt")}</p>
                  <span className="read-more">{t("cta.readMore")}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link to="/blog" className="btn btn-outline">
              {t("cta.allArticles")}
            </Link>
          </div>
        </section>
      )}

      {settings && h && (
        <section id="contact">
          <div className="section-head">
            <div className="section-label">{t("contact.label")}</div>
            <h2>{t("contact.title")}</h2>
            <p>{h.contactDescHome}</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
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
              <Link to="/contact" className="btn btn-outline" style={{ alignSelf: "flex-start" }}>
                {t("cta.fullContact")}
              </Link>
            </div>
            <div className="map-frame">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VetArt location map"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      {h && (
        <div className="final-cta">
          <h2>{h.finalCtaTitle}</h2>
          <p>{h.finalCtaDesc}</p>
          <div className="hero-actions">
            <Link to="/appointment" className="btn btn-primary">
              {t("cta.book")}
            </Link>
            {settings && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener" className="btn btn-outline">
                {t("cta.messenger")}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
