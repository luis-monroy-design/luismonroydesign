import { CV_URLS, useLang } from "../lib/lang";

const labels = {
  en: {
    experience: "Experience",
    cases: "Case Studies",
    profile: "Profile",
    capabilities: "Capabilities",
    contact: "Contact",
    cv: "Download CV",
  },
  es: {
    experience: "Experiencia",
    cases: "Casos de Estudio",
    profile: "Perfil",
    capabilities: "Capacidades",
    contact: "Contacto",
    cv: "Descargar CV",
  },
} as const;

export function SiteNavbar() {
  const [lang, setLanguage] = useLang();
  const t = labels[lang];

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="/" className="brand-logo">
          Luis Monroy
        </a>

        <ul className="nav-menu">
          <li>
            <a href="/#experience" className="nav-link">
              {t.experience}
            </a>
          </li>
          <li>
            <a href="/#cases" className="nav-link">
              {t.cases}
            </a>
          </li>
          <li>
            <a href="/#profile" className="nav-link">
              {t.profile}
            </a>
          </li>
          <li>
            <a href="/#capabilities" className="nav-link">
              {t.capabilities}
            </a>
          </li>
          <li>
            <a href="/#contact" className="nav-link">
              {t.contact}
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href={CV_URLS[lang]} download className="btn-primary cv-btn nav-cv-btn">
            {t.cv}
          </a>
          <div className="lang-switcher">
            <button
              type="button"
              className={`lang-btn${lang === "en" ? " active" : ""}`}
              onClick={() => setLanguage("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn${lang === "es" ? " active" : ""}`}
              onClick={() => setLanguage("es")}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
