import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  FileSearch,
  Globe2,
  GraduationCap,
  Landmark,
  Menu,
  Pause,
  Play,
  Search,
  Users,
  X,
} from "lucide-react";
import css from "../../styles/websites/unicol-mayor.css?url";
import { RedesignBadge, siteHead } from "../../components/websites/RedesignBadge";

const img = (name: string) => `/websites/unicol-mayor/${name}`;

export const Route = createFileRoute("/websites/unicol-mayor")({
  head: () =>
    siteHead({
      title: "Universidad Colegio Mayor de Cundinamarca",
      description: "Rediseño del portal de la Universidad Colegio Mayor de Cundinamarca por Luis Monroy.",
      fonts:
        "https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap",
      css,
    }),
  component: UnicolMayor,
});

const quickLinks = [
  { label: "Servicios", icon: Briefcase },
  { label: "Egresados", icon: GraduationCap },
  { label: "Biblioteca", icon: BookOpen },
  { label: "Contratación", icon: FileSearch },
  { label: "Transparencia", icon: Landmark },
  { label: "Bienestar", icon: Users },
];

const programs: Record<string, string[]> = {
  Pregrado: [
    "Administración de Empresas Comerciales",
    "Bacteriología y Laboratorio Clínico",
    "Construcción y Gestión en Arquitectura",
    "Contaduría Pública",
    "Derecho",
    "Diseño Digital y Multimedia",
    "Economía",
    "Matemática Aplicada",
    "Trabajo Social",
    "Turismo",
    "Tecnología en Atención Integral a la Persona Mayor",
    "Tecnología en Delineante de Arquitectura e Ingeniería",
    "Tecnología en Gestión Administrativa y Financiera",
    "Tecnología en Gestión y Ejecución de Construcciones",
    "Tecnología en Procesos Contables",
  ],
  Posgrado: [
    "Especialización en Gerencia de Proyectos",
    "Especialización en Gestión Tributaria",
    "Especialización en Hematología",
    "Especialización en Derecho Administrativo",
    "Maestría en Ciencias Biomédicas",
  ],
  "Cursos de extensión": [
    "Inglés para todos los niveles",
    "Excel avanzado",
    "Fotografía digital",
    "Lengua de señas colombiana",
  ],
  Diplomados: [
    "Analítica de datos",
    "Docencia universitaria",
    "Gestión del riesgo en salud",
    "Marketing digital",
  ],
};

const news = [
  { title: "Boletín Institucional N.º 121", date: "26 may 2025", photo: "universidad.webp" },
  { title: "Unicolmayor en el XXIII Encuentro Regional de Semilleros", date: "26 may 2025", photo: "participa.webp" },
  { title: "Abiertas las inscripciones para el segundo semestre", date: "22 may 2025", photo: "admisiones.webp" },
];

const events = [
  { day: "9", month: "jun", title: "Diplomado en analítica de datos", place: "Sede Bogotá" },
  { day: "14", month: "jun", title: "Feria de egresados y empleabilidad", place: "Auditorio principal" },
  { day: "24", month: "jun", title: "Conversatorio: inteligencia artificial y educación", place: "Virtual" },
];

const ratings = ["Mala", "Regular", "Buena", "Excelente"];

function UnicolMayor() {
  const [tab, setTab] = useState("Pregrado");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [rating, setRating] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (programs[tab] ?? []).filter((p) => p.toLowerCase().includes(q));
  }, [tab, query]);

  return (
    <div className="ucm">
      <div className="ucm-gov">
        <span>GOV.CO</span>
      </div>

      <header className="ucm-nav">
        <a href="#top" className="ucm-brand" aria-label="Universidad Colegio Mayor de Cundinamarca, inicio">
          <img src={img("crest.png")} alt="" />
          <span>Universidad Colegio Mayor de Cundinamarca</span>
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Principal">
          <a href="#programas" onClick={() => setMenuOpen(false)}>Programas</a>
          <a href="#noticias" onClick={() => setMenuOpen(false)}>Noticias</a>
          <a href="#agenda" onClick={() => setMenuOpen(false)}>Agenda</a>
          <a href="#programas" className="ucm-btn ucm-btn-gold" onClick={() => setMenuOpen(false)}>Inscríbete</a>
        </nav>
        <button
          className="ucm-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="ucm-hero" id="top">
        <div className="ucm-hero-copy">
          <p className="ucm-motto">Ética · Servicio · Saber</p>
          <h1>Educación pública de calidad en Bogotá desde 1945</h1>
          <div className="ucm-hero-actions">
            <a href="#programas" className="ucm-btn ucm-btn-gold">Explora los programas</a>
            <a href="#agenda" className="ucm-btn ucm-btn-ghost">Cursos intersemestrales</a>
          </div>
        </div>
        <div className="ucm-hero-media" aria-hidden="true">
          <img src={img("universidad.webp")} alt="" className="ucm-hero-campus" fetchPriority="high" />
          <img src={img("admisiones.webp")} alt="" className="ucm-hero-students" />
          <div className="ucm-hero-seal">
            <img src={img("crest.png")} alt="" />
          </div>
        </div>
      </section>

      <nav className="ucm-quick" aria-label="Accesos directos">
        {quickLinks.map(({ label, icon: Icon }) => (
          <a key={label} href="#top">
            <Icon size={22} aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>

      {/* Programs explorer: the core task of the site, now searchable */}
      <section className="ucm-programs" id="programas">
        <div className="ucm-wrap">
          <div className="ucm-programs-head">
            <h2 className="ucm-h2">Programas</h2>
            <label className="ucm-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                placeholder="Busca un programa"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar programa"
              />
            </label>
          </div>
          <div className="ucm-tabs" role="tablist" aria-label="Nivel de formación">
            {Object.keys(programs).map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
                {t}
                <span>{programs[t]?.length}</span>
              </button>
            ))}
          </div>
          <ul className="ucm-list" role="tabpanel" aria-live="polite">
            {list.map((p) => (
              <li key={p}>
                <a href="#programas">
                  {p}
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
            {list.length === 0 && <li className="ucm-empty">No hay programas con “{query}”. Prueba con otra palabra.</li>}
          </ul>
        </div>
      </section>

      <section className="ucm-why">
        <div className="ucm-wrap">
          <h2 className="ucm-h2">¿Por qué estudiar en la Unicolmayor?</h2>
          <div className="ucm-why-grid">
            <div><Award size={28} /><h3>Acreditación de alta calidad</h3><p>Reconocimiento del Ministerio de Educación Nacional.</p></div>
            <div><Globe2 size={28} /><h3>Convenios internacionales</h3><p>Intercambios y doble titulación con universidades aliadas.</p></div>
            <div><Landmark size={28} /><h3>80 años de historia</h3><p>Una institución pública al servicio de Bogotá y Cundinamarca.</p></div>
          </div>
        </div>
      </section>

      <section className="ucm-news" id="noticias">
        <div className="ucm-wrap">
          <h2 className="ucm-h2">Mantente informado</h2>
          <div className="ucm-news-grid">
            {news.map((n, i) => (
              <a key={n.title} href="#noticias" className={`ucm-news-card ${i === 0 ? "lead" : ""}`}>
                <img src={img(n.photo)} alt="" loading="lazy" />
                <div>
                  <time>{n.date}</time>
                  <h3>{n.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="ucm-radio">
        <div className="ucm-wrap ucm-radio-inner">
          <div>
            <h2>Unicolmayor Radio Virtual</h2>
            <p>Música, ciencia y la voz de la comunidad universitaria.</p>
          </div>
          <div className="ucm-player">
            <button onClick={() => setPlaying((v) => !v)} aria-pressed={playing} aria-label={playing ? "Pausar emisora" : "Reproducir emisora"}>
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>
            <div className={`ucm-wave ${playing ? "on" : ""}`} aria-hidden="true">
              {Array.from({ length: 36 }, (_, i) => (
                <span key={i} style={{ animationDelay: `${(i % 9) * -0.12}s`, height: `${30 + ((i * 37) % 60)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ucm-agenda" id="agenda">
        <div className="ucm-wrap ucm-agenda-grid">
          <h2 className="ucm-h2">Agenda</h2>
          <ul>
            {events.map((e) => (
              <li key={e.title}>
                <div className="ucm-date"><b>{e.day}</b><span>{e.month}</span></div>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ucm-survey">
        <div className="ucm-wrap">
          <h2>¿Cómo calificas la nueva página web?</h2>
          {rating ? (
            <p role="status">Gracias. Registramos tu calificación: {rating.toLowerCase()}.</p>
          ) : (
            <div className="ucm-rating">
              {ratings.map((r) => (
                <button key={r} onClick={() => setRating(r)}>{r}</button>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="ucm-footer">
        <div className="ucm-wrap ucm-footer-inner">
          <div className="ucm-brand">
            <img src={img("crest.png")} alt="" />
            <span>Universidad Colegio Mayor de Cundinamarca</span>
          </div>
          <div>
            <p>Calle 28 # 5B-02, Bogotá D.C.</p>
            <p>Lunes a viernes, 8:00 a. m. – 5:00 p. m.</p>
            <p>Vigilada MinEducación</p>
          </div>
        </div>
        <div className="ucm-gov ucm-gov-foot"><span>GOV.CO</span></div>
      </footer>
      <RedesignBadge />
    </div>
  );
}
