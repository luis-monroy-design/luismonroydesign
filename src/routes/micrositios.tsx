import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Micrositios S.A.S. — UX/UI Design | Luis Monroy";
const description =
  "Micrositios case overview: UX/UI design for high-traffic Colombian government websites.";

export const Route = createFileRoute("/micrositios")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: companyHeadLinks,
  }),
  component: () => (
    <CompanyPage
      company="Micrositios S.A.S."
      en={{
        role: "UX/UI Designer",
        period: "Feb 2026 – Apr 2026",
        intro:
          "User experience design for high-traffic Colombian government websites, with a focus on navigation, content visibility and responsive architecture.",
        tags: ["Gov Web Design", "High-Fidelity Prototyping", "Mobile & Desktop", "UX Architecture"],
        impact:
          "Redesigned lateral menu systems for Transmilenio and Unicolmayor portals, reducing user scrolling by 68%.",
        projects: [
          {
            name: "Sitio web UnicolMayor",
            summary:
              "Redesign of the university portal, prioritizing findability of academic and administrative content.",
            highlights: [
              "Navigation and lateral menu restructure",
              "Mid and high-fidelity interactive prototypes",
              "Responsive desktop and mobile architecture",
            ],
          },
          {
            name: "Sitio web Transmilenio",
            summary:
              "Experience design for the public transport portal, focused on fast access to routes and service information.",
            highlights: [
              "Content hierarchy for high-traffic pages",
              "Accessible, mobile-first layouts",
              "Prototype validation with stakeholders",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Feb 2026 – Abr 2026",
        intro:
          "Diseño de experiencia de usuario para sitios web del Gobierno de Colombia con alto tráfico, con foco en navegación, visibilidad del contenido y arquitectura responsive.",
        tags: [
          "Diseño Web Gov",
          "Prototipado de Alta Fidelidad",
          "Mobile y Desktop",
          "Arquitectura UX",
        ],
        impact:
          "Rediseñé los menús laterales de los portales de Transmilenio y Unicolmayor, reduciendo el scroll del usuario en un 68%.",
        projects: [
          {
            name: "Sitio web UnicolMayor",
            summary:
              "Rediseño del portal universitario, priorizando la localización del contenido académico y administrativo.",
            highlights: [
              "Reestructuración de navegación y menú lateral",
              "Prototipos interactivos en media y alta fidelidad",
              "Arquitectura responsive para desktop y mobile",
            ],
          },
          {
            name: "Sitio web Transmilenio",
            summary:
              "Diseño de experiencia para el portal de transporte público, enfocado en el acceso rápido a rutas e información de servicio.",
            highlights: [
              "Jerarquía de contenido para páginas de alto tráfico",
              "Layouts accesibles y mobile-first",
              "Validación de prototipos con stakeholders",
            ],
          },
        ],
      }}
    />
  ),
});
