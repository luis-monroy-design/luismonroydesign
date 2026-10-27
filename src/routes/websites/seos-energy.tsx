import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Leaf, Menu, Sun, X, Zap } from "lucide-react";
import css from "../../styles/websites/seos-energy.css?url";
import { RedesignBadge, siteHead } from "../../components/websites/RedesignBadge";

const img = (name: string) => `/websites/seos-energy/${name}`;

export const Route = createFileRoute("/websites/seos-energy")({
  head: () =>
    siteHead({
      title: "SEOS Energy — Créditos para energía solar",
      description: "Rediseño del sitio web de SEOS Energy por Luis Monroy.",
      fonts:
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap",
      css,
    }),
  component: SeosEnergy,
});

const fmt = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/** Rough residential estimate: ~800 COP/kWh, a 550 W panel yields ~66 kWh/month, ~80% of the bill offset. */
function estimate(bill: number) {
  const kwh = bill / 800;
  const panels = Math.max(4, Math.ceil(kwh / 66));
  const saving = bill * 0.8;
  const co2 = (kwh * 12 * 0.126) / 1000;
  return { panels, saving, co2 };
}

const steps = [
  { title: "Simula tu ahorro", text: "Con el valor de tu factura calculamos el sistema que necesitas." },
  { title: "Pre-aprobación", text: "Solicitas el crédito en línea y te respondemos en minutos." },
  { title: "Visita técnica", text: "Un aliado instalador revisa tu techo y ajusta el diseño." },
  { title: "Instalación", text: "Desembolsamos, instalamos y conectamos tu sistema a la red." },
];

const faqs = [
  {
    q: "¿Cuánto me financian?",
    a: "Financiamos hasta el 90% del sistema, según tu perfil y el tamaño del proyecto.",
  },
  {
    q: "¿Sigo recibiendo factura de energía?",
    a: "Sí, pero mucho menor. Pagas solo la energía que tu sistema no alcanza a producir.",
  },
  {
    q: "¿Quién instala mi sistema?",
    a: "Aliados instaladores certificados que SEOS selecciona y acompaña durante todo el proyecto.",
  },
  {
    q: "¿Qué pasa si me mudo?",
    a: "El sistema se puede desmontar y trasladar. Te asesoramos en el proceso.",
  },
];

const clients = [
  { name: "Carlos Ortega", photo: "client-carlos.webp", before: 450000, after: 85063 },
  { name: "Rafael Calle", photo: "client-rafael.webp", before: 355000, after: 126370 },
];

function SeosEnergy() {
  const [bill, setBill] = useState(420000);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const result = useMemo(() => estimate(bill), [bill]);

  return (
    <div className="seos">
      <header className="seos-nav">
        <a href="#top" aria-label="SEOS Energy, inicio">
          <img src={img("logo-white.png")} alt="SEOS" className="seos-logo" />
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Principal">
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="#credito" onClick={() => setMenuOpen(false)}>Crédito</a>
          <a href="#casos" onClick={() => setMenuOpen(false)}>Casos</a>
          <a href="#preguntas" onClick={() => setMenuOpen(false)}>Preguntas</a>
          <a href="#asesoria" className="seos-btn seos-btn-sun" onClick={() => setMenuOpen(false)}>
            Solicitar asesoría
          </a>
        </nav>
        <button
          className="seos-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Hero: the real Madre Monte installation from above, with the savings simulator on top */}
      <section className="seos-hero" id="top">
        <img src={img("aerial.webp")} alt="" className="seos-hero-bg" fetchPriority="high" />
        <div className="seos-hero-shade" />
        <div className="seos-hero-inner">
          <div className="seos-hero-copy">
            <h1>Cámbiate a la energía solar</h1>
            <p>Créditos 100% digitales para instalar paneles en tu casa. Pagas la cuota con lo que ahorras en la factura.</p>
            <div className="seos-hero-proof">
              <span>Fintech de energía solar más premiada de Colombia</span>
            </div>
          </div>

          <div className="seos-sim" aria-labelledby="sim-title">
            <h2 id="sim-title">¿Cuánto pagas de luz al mes?</h2>
            <output className="seos-sim-bill" htmlFor="bill">{fmt.format(bill)}</output>
            <input
              id="bill"
              type="range"
              min={150000}
              max={1500000}
              step={10000}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              aria-label="Valor mensual de tu factura de energía"
              style={{ ["--p" as string]: `${((bill - 150000) / 1350000) * 100}%` }}
            />
            <dl className="seos-sim-out">
              <div>
                <dt>Ahorro mensual</dt>
                <dd>{fmt.format(result.saving)}</dd>
              </div>
              <div>
                <dt>Paneles</dt>
                <dd>{result.panels}</dd>
              </div>
              <div>
                <dt>CO₂ evitado al año</dt>
                <dd>{result.co2.toFixed(1)} t</dd>
              </div>
            </dl>
            <div className="seos-panels" aria-hidden="true">
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i} className={i < result.panels ? "on" : ""} style={{ transitionDelay: `${i * 18}ms` }} />
              ))}
            </div>
            <a href="#asesoria" className="seos-btn seos-btn-sun seos-btn-block">
              Quiero mi simulación completa <ArrowUpRight size={18} />
            </a>
            <small>Valores estimados. La simulación final depende de la visita técnica.</small>
          </div>
        </div>
      </section>

      <section className="seos-quote">
        <blockquote>
          “SEOS tiene una gran oportunidad para reducir las emisiones y crear empleos.”
          <cite>Forbes</cite>
        </blockquote>
      </section>

      <section className="seos-steps" id="como-funciona">
        <div className="seos-wrap">
          <h2 className="seos-h2">Financia tu sistema solar en 4 pasos</h2>
          <ol>
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="seos-step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="seos-credit" id="credito">
        <div className="seos-wrap seos-split">
          <figure className="seos-credit-media">
            <img src={img("credit.webp")} alt="Cliente de SEOS frente a su casa con paneles solares" loading="lazy" />
            <img src={img("monitor.webp")} alt="Monitoreo de consumo en la app de SEOS" className="seos-phone" loading="lazy" />
          </figure>
          <div>
            <h2 className="seos-h2">Tu crédito, 100% digital</h2>
            <ul className="seos-checks">
              <li><Check size={18} /> Hasta 20 años de energía casi gratis</li>
              <li><Check size={18} /> Financiamos hasta el 90% del sistema</li>
              <li><Check size={18} /> Sin papeleo: lo gestionamos por ti</li>
              <li><Check size={18} /> Monitoreas tu producción desde el celular</li>
            </ul>
            <a href="#top" className="seos-btn seos-btn-navy">Simula tu ahorro</a>
          </div>
        </div>
      </section>

      {/* Real numbers from the Madre Monte project */}
      <section className="seos-case" id="casos">
        <img src={img("install.webp")} alt="Instalación solar de SEOS en Madre Monte" loading="lazy" />
        <div className="seos-case-card">
          <h2>Madre Monte</h2>
          <p>4 años de energía solar</p>
          <dl>
            <div><Zap size={20} /><dt>kWh generados</dt><dd>55.500</dd></div>
            <div><Sun size={20} /><dt>ahorrados</dt><dd>+$40 M</dd></div>
            <div><Leaf size={20} /><dt>árboles equivalentes</dt><dd>3.024</dd></div>
          </dl>
        </div>
      </section>

      <section className="seos-clients">
        <div className="seos-wrap">
          <h2 className="seos-h2">Así cambió su factura</h2>
          <div className="seos-client-grid">
            {clients.map((c) => (
              <article key={c.name} className="seos-client">
                <img src={img(c.photo)} alt={c.name} loading="lazy" />
                <div className="seos-client-body">
                  <h3>{c.name}</h3>
                  <div className="seos-bar">
                    <span>Antes</span>
                    <i style={{ width: "100%" }} />
                    <b>{fmt.format(c.before)}</b>
                  </div>
                  <div className="seos-bar seos-bar-after">
                    <span>Con SEOS</span>
                    <i style={{ width: `${(c.after / c.before) * 100}%` }} />
                    <b>{fmt.format(c.after)}</b>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seos-faq" id="preguntas">
        <div className="seos-wrap seos-faq-grid">
          <h2 className="seos-h2">Preguntas frecuentes</h2>
          <div>
            {faqs.map((f, i) => (
              <div key={f.q} className={`seos-faq-item ${openFaq === i ? "open" : ""}`}>
                <button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <ChevronDown size={20} />
                </button>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seos-contact" id="asesoria">
        <div className="seos-wrap seos-split">
          <div>
            <h2 className="seos-h2">Habla con un experto</h2>
            <p className="seos-lead">Te llamamos, revisamos tu factura y te decimos cuánto puedes ahorrar.</p>
            <img src={img("engineer.png")} alt="" className="seos-engineer" loading="lazy" />
          </div>
          <form
            className="seos-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>Nombre completo<input required autoComplete="name" /></label>
            <label>Correo<input type="email" required autoComplete="email" /></label>
            <label>Teléfono<input type="tel" required autoComplete="tel" /></label>
            <label>
              Ciudad
              <select defaultValue="">
                <option value="" disabled>Selecciona</option>
                <option>Bogotá</option>
                <option>Medellín</option>
                <option>Cali</option>
                <option>Otra</option>
              </select>
            </label>
            <button type="submit" className="seos-btn seos-btn-navy seos-btn-block">Solicitar asesoría</button>
            {sent && <p className="seos-form-note" role="status">Formulario de demostración: no se envió ningún dato.</p>}
          </form>
        </div>
      </section>

      <footer className="seos-footer">
        <div className="seos-wrap">
          <img src={img("logo-white.png")} alt="SEOS" className="seos-logo" />
          <p>Cl 109 # 14B-60, Bogotá · (57) 310 321 4100</p>
          <p>© SEOS Energy</p>
        </div>
      </footer>
      <RedesignBadge />
    </div>
  );
}
