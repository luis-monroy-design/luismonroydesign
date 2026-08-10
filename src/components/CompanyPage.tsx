import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export type CompanyProject = {
  name: string;
  summary: string;
  highlights: string[];
};

export type CompanyContent = {
  role: string;
  period: string;
  intro: string;
  tags: string[];
  impact: string;
  projects: CompanyProject[];
  /** Optional extra narrative blocks (e.g. UX architecture, design system). */
  blocks?: { title: string; body: string; points?: string[] }[];
};

export type GalleryItem = {
  url: string;
  title: { en: string; es: string };
  caption: { en: string; es: string };
};

export type CompanyPageProps = {
  company: string;
  en: CompanyContent;
  es: CompanyContent;
  gallery?: GalleryItem[];
  galleryTag?: { en: string; es: string };
  galleryTitle?: { en: string; es: string };
};

const ui = {
  en: {
    back: "← Back to portfolio",
    overview: "// CASE OVERVIEW",
    projectsTag: "// ASSOCIATED PROJECTS",
    projects: "Projects",
    impact: "Key Impact:",
    gallery: "// INTERFACE DESIGN",
    galleryTitle: "UI Screens",
  },
  es: {
    back: "← Volver al portafolio",
    overview: "// RESUMEN DEL CASO",
    projectsTag: "// PROYECTOS ASOCIADOS",
    projects: "Proyectos",
    impact: "Impacto Clave:",
    gallery: "// DISEÑO DE INTERFAZ",
    galleryTitle: "Pantallas UI",
  },
} as const;

export function CompanyPage({
  company,
  en,
  es,
  gallery,
  galleryTag,
  galleryTitle,
}: CompanyPageProps) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const c = lang === "en" ? en : es;
  const t = ui[lang];

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px 96px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <Link to="/" className="tech-tag" style={{ textDecoration: "none", display: "inline-block" }}>
          {t.back}
        </Link>
        <div className="lang-switcher">
          <button
            type="button"
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
          <button
            type="button"
            className={`lang-btn${lang === "es" ? " active" : ""}`}
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
          >
            ES
          </button>
        </div>
      </div>

      <div className="section-header" style={{ marginBottom: 24 }}>
        <span className="section-tag">{t.overview}</span>
        <h1 className="section-title" style={{ margin: 0 }}>
          {company}
        </h1>
      </div>

      <div className="company-header" style={{ marginBottom: 16 }}>
        <div className="company-info">
          <div className="company-role">{c.role}</div>
        </div>
        <span className="company-period">{c.period}</span>
      </div>

      <p className="company-desc" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
        {c.intro}
      </p>

      <div className="tag-cloud" style={{ marginTop: 20 }}>
        {c.tags.map((tag) => (
          <span className="tech-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="company-impact" style={{ marginTop: 28 }}>
        <div className="impact-text">
          <strong>{t.impact}</strong> {c.impact}
        </div>
      </div>

      {c.blocks && c.blocks.length > 0 && (
        <div style={{ display: "grid", gap: 20, marginTop: 40 }}>
          {c.blocks.map((b) => (
            <article className="company-card tech-bracket" key={b.title}>
              <h3 style={{ margin: "0 0 8px" }}>{b.title}</h3>
              <p className="company-desc">{b.body}</p>
              {b.points && (
                <div className="projects-subgrid">
                  {b.points.map((p) => (
                    <div className="project-item" key={p}>
                      <span className="project-item-text">{p}</span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <div className="section-header" style={{ marginTop: 56, marginBottom: 16 }}>
        <span className="section-tag">{t.projectsTag}</span>
        <h2 className="section-title" style={{ margin: 0 }}>
          {t.projects}
        </h2>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {c.projects.map((p) => (
          <article className="company-card tech-bracket" key={p.name}>
            <h3 style={{ margin: "0 0 8px" }}>{p.name}</h3>
            <p className="company-desc">{p.summary}</p>
            <div className="projects-subgrid">
              {p.highlights.map((h) => (
                <div className="project-item" key={h}>
                  <span className="project-item-text">{h}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {gallery && gallery.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: 56, marginBottom: 16 }}>
            <span className="section-tag">{(galleryTag ?? ui[lang])[lang] ?? t.gallery}</span>
            <h2 className="section-title" style={{ margin: 0 }}>
              {galleryTitle ? galleryTitle[lang] : t.galleryTitle}
            </h2>
          </div>
          <div style={{ display: "grid", gap: 28 }}>
            {gallery.map((g) => (
              <figure key={g.url} style={{ margin: 0 }}>
                <img
                  src={g.url}
                  alt={g.title[lang]}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: 12,
                    border: "1px solid var(--border-color)",
                  }}
                />
                <figcaption className="company-desc" style={{ marginTop: 10 }}>
                  <strong>{g.title[lang]}</strong> — {g.caption[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export const companyHeadLinks = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
  { rel: "stylesheet", href: "/site/portfolio.css" },
];
