import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Car, Cpu, HardHat, Menu, Smartphone, Stethoscope, X } from "lucide-react";
import css from "../../styles/websites/rentek.css?url";
import { RedesignBadge, siteHead } from "../../components/websites/RedesignBadge";

const img = (name: string) => `/websites/rentek/${name}`;

export const Route = createFileRoute("/websites/rentek")({
  head: () =>
    siteHead({
      title: "Rentek — Renting de activos productivos",
      description: "Rediseño del sitio web de Rentek por Luis Monroy.",
      fonts: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
      css,
    }),
  component: Rentek,
});

const fmt = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const assets = [
  { id: "computadores", label: "Computadores", icon: Cpu },
  { id: "celulares", label: "Celulares", icon: Smartphone },
  { id: "maquinaria", label: "Maquinaria", icon: HardHat },
  { id: "vehiculos", label: "Vehículos", icon: Car },
  { id: "medicos", label: "Equipos médicos", icon: Stethoscope },
];

/** Reference monthly factor per term (illustrative, the real rate depends on the credit study). */
const terms: Record<number, number> = { 12: 0.0985, 24: 0.0545, 36: 0.0405 };

const services = [
  { title: "Renting de activos productivos", text: "Los activos que tu operación necesita, sin comprarlos.", photo: "svc-machinery.webp" },
  { title: "Alquiler de computadores", text: "Equipos nuevos desde 3 meses, con soporte incluido.", photo: "svc-computers.webp" },
  { title: "Alquiler de celulares", text: "Entrega rápida, garantía extendida y soporte.", photo: "svc-phones.webp" },
  { title: "Crédito para empresas", text: "Capital de trabajo de libre inversión.", photo: "svc-credit.webp" },
  { title: "Rentek Asset Management", text: "El primer vehículo de inversión de renting en el país.", photo: "svc-assets.webp" },
];

const stats = [
  { n: "+25", label: "años de experiencia" },
  { n: "+1.000", label: "empresas atendidas" },
  { n: "+25.000", label: "activos alquilados" },
  { n: "7", label: "sectores económicos" },
];

const clients = ["bold", "Cafam", "Compensar", "Bia"];

function Rentek() {
  const [asset, setAsset] = useState("computadores");
  const [amount, setAmount] = useState(80_000_000);
  const [term, setTerm] = useState(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const fee = amount * (terms[term] ?? 0);
  const assetLabel = assets.find((a) => a.id === asset)?.label ?? "";

  return (
    <div className="rtk">
      <header className="rtk-nav">
        <a href="#top" aria-label="Rentek, inicio">
          <img src={img("logo.svg")} alt="Rentek" className="rtk-logo" />
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
          <a href="#clientes" onClick={() => setMenuOpen(false)}>Clientes</a>
          <a href="#contacto" className="rtk-btn rtk-btn-yellow" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
        <button
          className="rtk-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Hero: the promise on the left, the renting simulator (from the Simulador Rentek flow) on the right */}
      <section className="rtk-hero" id="top">
        <div className="rtk-hero-copy">
          <h1>Nosotros compramos los equipos. Tú los usas.</h1>
          <p>Renting y crédito para que tu empresa crezca sin inmovilizar capital.</p>
          <div className="rtk-hero-photo">
            <img src={img("hero.webp")} alt="Empresaria cliente de Rentek" fetchPriority="high" />
          </div>
        </div>

        <div className="rtk-sim" aria-labelledby="rtk-sim-title">
          <h2 id="rtk-sim-title">Simula tu arrendamiento</h2>
          <fieldset>
            <legend>1. ¿Qué necesitas?</legend>
            <div className="rtk-chips">
              {assets.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={asset === id}
                  className={asset === id ? "on" : ""}
                  onClick={() => setAsset(id)}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>2. Valor de los activos</legend>
            <output className="rtk-amount">{fmt.format(amount)}</output>
            <input
              type="range"
              min={10_000_000}
              max={500_000_000}
              step={5_000_000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label="Valor de los activos"
              style={{ ["--p" as string]: `${((amount - 10_000_000) / 490_000_000) * 100}%` }}
            />
          </fieldset>
          <fieldset>
            <legend>3. Plazo</legend>
            <div className="rtk-terms">
              {Object.keys(terms).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={term === Number(t)}
                  className={term === Number(t) ? "on" : ""}
                  onClick={() => setTerm(Number(t))}
                >
                  {t} meses
                </button>
              ))}
            </div>
          </fieldset>
          <div className="rtk-result" aria-live="polite">
            <span>Canon mensual de referencia · {assetLabel}</span>
            <strong key={`${fee}`}>{fmt.format(fee)}</strong>
          </div>
          <a href="#contacto" className="rtk-btn rtk-btn-yellow rtk-btn-block">
            Solicitar cotización <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="rtk-stats" aria-label="Rentek en cifras">
        {stats.map((s) => (
          <div key={s.label}>
            <strong>{s.n}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="rtk-pair" id="nosotros">
        <article className="rtk-pair-card">
          <img src={img("keys.webp")} alt="" loading="lazy" />
          <div>
            <h2>Renting de activos</h2>
            <p>Adquirimos los activos que necesitas y te los entregamos en renta para que pongas en marcha tu operación.</p>
          </div>
        </article>
        <article className="rtk-pair-card rtk-pair-dark">
          <img src={img("loan.webp")} alt="" loading="lazy" />
          <div>
            <h2>No te detengas. Te prestamos.</h2>
            <p>Préstamos para capital de trabajo y financiación de vehículos productivos.</p>
          </div>
        </article>
      </section>

      <section className="rtk-services" id="servicios">
        <h2 className="rtk-h2">Nuestros servicios más populares</h2>
        <div className="rtk-service-grid">
          {services.map((s) => (
            <a key={s.title} href="#contacto" className="rtk-service">
              <img src={img(s.photo)} alt="" loading="lazy" />
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <ArrowUpRight size={20} className="rtk-service-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="rtk-trust" id="clientes">
        <div className="rtk-trust-photo">
          <img src={img("team.webp")} alt="Equipo de una empresa cliente revisando su contrato" loading="lazy" />
        </div>
        <div>
          <h2 className="rtk-h2">Rentek no es solo renting, es respaldo inteligente</h2>
          <p className="rtk-lead">Aliado estratégico de empresas pequeñas, medianas y grandes que buscan eficiencia sin endeudamiento.</p>
          <ul className="rtk-clients" aria-label="Algunos clientes">
            {clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rtk-contact" id="contacto">
        <div>
          <h2 className="rtk-h2">Te asesoramos sobre tu arrendamiento</h2>
          <p className="rtk-lead">Cuéntanos qué necesitas y te contactamos lo antes posible.</p>
        </div>
        <form
          className="rtk-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>Nombre<input required autoComplete="given-name" /></label>
          <label>Apellido<input required autoComplete="family-name" /></label>
          <label>Correo<input type="email" required autoComplete="email" /></label>
          <label>Teléfono<input type="tel" required autoComplete="tel" /></label>
          <label className="rtk-wide">
            Interés
            <select defaultValue="Renting de activos productivos">
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>
          </label>
          <label className="rtk-check rtk-wide">
            <input type="checkbox" required /> Autorizo el tratamiento de mis datos personales
          </label>
          <button type="submit" className="rtk-btn rtk-btn-indigo rtk-wide">Enviar</button>
          {sent && <p className="rtk-note rtk-wide" role="status">Formulario de demostración: no se envió ningún dato.</p>}
        </form>
      </section>

      <footer className="rtk-footer">
        <img src={img("logo.svg")} alt="Rentek" className="rtk-logo" />
        <div>
          <p>Calle 76 # 11 – 35 piso 9, Bogotá</p>
          <p>Lunes a viernes, 8:00 a. m. – 6:00 p. m.</p>
          <p>+57 601 646 1200</p>
        </div>
      </footer>
      <RedesignBadge />
    </div>
  );
}
