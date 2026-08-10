import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Universidad Nacional de Colombia — UX/UI Design | Luis Monroy";
const description = "UNAL case overview: experience design for the UNAL Alumni Program web portal.";

export const Route = createFileRoute("/unal")({
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
      company="Universidad Nacional de Colombia"
      en={{
        role: "UX/UI Designer",
        period: "Oct 2022 – Sep 2023",
        intro:
          "Experience design for the UNAL Alumni Program web portal, including rebranding work for the 'Diálogos con Egresados' initiative.",
        tags: ["EdTech", "Rebranding", "Web Portal", "UX/UI"],
        impact:
          "Unified the alumni program's digital identity and made program content easier to browse and share.",
        projects: [
          {
            name: "Sitio Web Egresados UNAL",
            summary:
              "Portal design for the alumni community, covering events, benefits and program communication.",
            highlights: [
              "Visual identity and rebranding application",
              "Information architecture for alumni content",
              "Responsive page templates",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Oct 2022 – Sep 2023",
        intro:
          "Diseño de experiencia para el portal web del Programa de Egresados de la UNAL, incluyendo el rebranding de la iniciativa 'Diálogos con Egresados'.",
        tags: ["EdTech", "Rebranding", "Portal Web", "UX/UI"],
        impact:
          "Unificamos la identidad digital del programa y facilitamos la navegación y difusión de sus contenidos.",
        projects: [
          {
            name: "Sitio Web Egresados UNAL",
            summary:
              "Diseño del portal para la comunidad de egresados: eventos, beneficios y comunicación del programa.",
            highlights: [
              "Aplicación de identidad visual y rebranding",
              "Arquitectura de información para contenido de egresados",
              "Plantillas de página responsive",
            ],
          },
        ],
      }}
    />
  ),
});
