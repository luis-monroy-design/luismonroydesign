import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Rentek — UX/UI Design | Luis Monroy";
const description =
  "Rentek case overview: website design on Webflow and an interactive renting loan simulator.";

export const Route = createFileRoute("/rentek")({
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
      company="Rentek"
      en={{
        role: "UX/UI Designer",
        period: "Oct 2024 – Feb 2025",
        intro:
          "Loan simulator and website design for asset renting, tailored for B2B enterprises and retail clients. Work included UX benchmarking of the renting market and hands-on implementation in Webflow.",
        tags: ["Webflow", "Loan Simulator", "B2B & B2C", "UX Benchmarking"],
        impact: "Increased lead capture by 30% compared to the previous simulator design.",
        projects: [
          {
            name: "Website",
            summary:
              "Corporate site redesign and Webflow implementation, aligning the brand with a clearer B2B and retail offer.",
            highlights: [
              "UI design and Webflow build",
              "Content structure for two audience tracks",
              "Responsive desktop and mobile layouts",
            ],
          },
          {
            name: "Simulador",
            summary:
              "Interactive renting simulator that lets users estimate monthly fees and terms before contacting sales.",
            highlights: [
              "UX benchmarking of competing simulators",
              "Interactive desktop and mobile prototypes",
              "Lead capture integrated into the results step",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Oct 2024 – Feb 2025",
        intro:
          "Diseño del simulador de préstamos y del sitio web para renting de activos, dirigido a empresas B2B y clientes naturales. Incluyó benchmarking UX del mercado de renting e implementación directa en Webflow.",
        tags: ["Webflow", "Simulador de Crédito", "B2B y B2C", "Benchmarking UX"],
        impact: "Aumentamos la captación de leads en un 30% frente al simulador anterior.",
        projects: [
          {
            name: "Website",
            summary:
              "Rediseño del sitio corporativo e implementación en Webflow, alineando la marca con una oferta B2B y retail más clara.",
            highlights: [
              "Diseño UI e implementación en Webflow",
              "Estructura de contenido para dos audiencias",
              "Layouts responsive para desktop y mobile",
            ],
          },
          {
            name: "Simulador",
            summary:
              "Simulador interactivo de renting que permite estimar cuotas y plazos antes de contactar al equipo comercial.",
            highlights: [
              "Benchmarking UX de simuladores competidores",
              "Prototipos interactivos en desktop y mobile",
              "Captación de leads integrada al paso de resultados",
            ],
          },
        ],
      }}
    />
  ),
});
