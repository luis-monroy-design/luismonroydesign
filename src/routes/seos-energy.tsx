import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "SEOS Energy — Product Design | Luis Monroy";
const description =
  "How I led end-to-end product design at SEOS Energy: website, SEOS Studio and SEOS Partners.";

export const Route = createFileRoute("/seos-energy")({
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
      company="SEOS Energy"
      en={{
        role: "Product Designer",
        period: "Sep 2023 – Jan 2026",
        intro:
          "Digital platform design and optimization for residential solar energy financing. I owned design strategy, the design system and the full UX/UI across desktop and mobile, working closely with a lean product and engineering team.",
        tags: ["Fintech / Cleantech", "End-to-End Product", "Design Strategy", "Design System"],
        impact:
          "Reduced customer support tickets by 55% while maintaining operations with only 20% of the original Product/Tech team size.",
        projects: [
          {
            name: "Website",
            summary:
              "Public marketing site redesign focused on explaining solar financing clearly and converting qualified leads.",
            highlights: [
              "Information architecture and messaging hierarchy",
              "Responsive desktop and mobile layouts",
              "Lead capture flow and conversion tracking",
            ],
          },
          {
            name: "SEOS Studio",
            summary:
              "Internal design and configuration tool used by the operations team to build and manage solar proposals.",
            highlights: [
              "Workflow mapping with operations stakeholders",
              "Component library and reusable patterns",
              "Usability testing and iterative refinement",
            ],
          },
          {
            name: "SEOS Partners",
            summary:
              "Partner-facing portal for installers and commercial allies to track opportunities and financing status.",
            highlights: [
              "Role-based dashboards and permissions UX",
              "Status tracking and notification design",
              "Onboarding flow for new partners",
            ],
          },
        ],
      }}
      es={{
        role: "Product Designer",
        period: "Sep 2023 – Ene 2026",
        intro:
          "Diseño y optimización de la plataforma digital para financiamiento de energía solar residencial. Lideré la estrategia de diseño, el design system y todo el UX/UI en desktop y mobile, trabajando con un equipo reducido de producto e ingeniería.",
        tags: ["Fintech / Cleantech", "Producto End-to-End", "Estrategia de Diseño", "Design System"],
        impact:
          "Redujimos los tickets de soporte en un 55% manteniendo la operación con solo el 20% del equipo original de Producto/Tech.",
        projects: [
          {
            name: "Website",
            summary:
              "Rediseño del sitio público, enfocado en explicar con claridad el financiamiento solar y convertir leads calificados.",
            highlights: [
              "Arquitectura de información y jerarquía de mensajes",
              "Layouts responsive para desktop y mobile",
              "Flujo de captación de leads y medición de conversión",
            ],
          },
          {
            name: "SEOS Studio",
            summary:
              "Herramienta interna de configuración usada por el equipo de operaciones para construir y gestionar propuestas solares.",
            highlights: [
              "Mapeo de flujos con el equipo de operaciones",
              "Librería de componentes y patrones reutilizables",
              "Pruebas de usabilidad e iteración continua",
            ],
          },
          {
            name: "SEOS Partners",
            summary:
              "Portal para instaladores y aliados comerciales, para hacer seguimiento a oportunidades y estados de financiación.",
            highlights: [
              "Dashboards por rol y UX de permisos",
              "Diseño de seguimiento de estados y notificaciones",
              "Flujo de onboarding para nuevos aliados",
            ],
          },
        ],
      }}
    />
  ),
});
