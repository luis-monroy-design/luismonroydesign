import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "SEOS Energy — Product Design | Luis Monroy";
const description =
  "SEOS Energy case: SEOS Partners mobile app, SEOS Studio solar CRM and the seosenergy.co website built on Webflow.";

const partners = "/__l5e/assets-v1/50be8150-b46c-4b46-bac5-1af4f955b367/SEOS_Partners-2.jpg";
const studio = "/__l5e/assets-v1/c37ef322-acef-4725-bc4d-53d3b6abd2ea/SEOS_Studio-2.jpg";
const site = "/__l5e/assets-v1/6c4ae9d4-8914-4c87-bf9e-99e46bbe761e/SEOS_WEBSITE-2.jpg";

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
      galleryTag={{ en: "// CASE BOARDS", es: "// TABLEROS DEL CASO" }}
      galleryTitle={{ en: "Process & interfaces", es: "Proceso e interfaces" }}
      gallery={[
        {
          url: partners,
          maxWidth: 458,
          title: { en: "SEOS Partners — Product design", es: "SEOS Partners — Product design" },
          caption: {
            en: "Discovery, UX research and Design Sprint: How Might We definition, user flow for the credit request, usability testing, service design (Auth0, Treble.ai, HubSpot) and the MVP screens of the native mobile app.",
            es: "Discovery, UX research y Design Sprint: definición de How Might We, flujo de uso para la solicitud de crédito, prueba de usabilidad, diseño de servicios (Auth0, Treble.ai, HubSpot) y las pantallas del MVP de la app nativa.",
          },
        },
        {
          url: studio,
          maxWidth: 644,
          title: { en: "SEOS Studio — Solar CRM", es: "SEOS Studio — CRM solar" },
          caption: {
            en: "Context and objective, role and module system, workflow builder (Stages, Checks, Tools, AI Agents), look & feel of the operational tables and the updated features of the platform.",
            es: "Contexto y objetivo, sistema de roles y de módulos, creación de workflows (Stages, Checks, Tools, AI Agents), look & feel de las tablas operativas y funcionalidades actualizadas de la plataforma.",
          },
        },
        {
          url: site,
          maxWidth: 464,
          title: { en: "Web 2.0 — seosenergy.co", es: "Web 2.0 — seosenergy.co" },
          caption: {
            en: "Problem statement, objectives, benchmark (Niko, Solara, Ruut) and the resulting visual design of the public website, built and shipped on Webflow.",
            es: "Problemática, objetivos, benchmark (Niko, Solara, Ruut) y el resultado visual del sitio web público, construido e implementado en Webflow.",
          },
        },
      ]}
      en={{
        role: "Product Designer",
        period: "Sep 2023 – Jan 2026",
        intro:
          "End-to-end product design for residential solar energy financing across three products: a native mobile app for fast project simulation, an all-in-one operational platform, and the public website. I owned design strategy, the design system and the full UX/UI on desktop and mobile alongside a lean product and engineering team.",
        tags: ["Fintech / Cleantech", "Native Mobile App", "Operational Platform", "Webflow"],
        impact:
          "Reduced customer support tickets by 55% while maintaining operations with only 20% of the original Product/Tech team size.",
        projects: [
          {
            name: "SEOS Partners",
            summary:
              "Native mobile app for fast simulation of solar energy projects, used by both end customers and the sales force.",
            highlights: [
              "Quick project simulation and credit request flow",
              "Discovery, UX research and Design Sprint (How Might We)",
              "Service design with Auth0, Treble.ai and HubSpot",
              "MVP screens validated through usability testing",
            ],
          },
          {
            name: "SEOS Studio",
            summary:
              "All-in-one platform grouping simulation, credit assessment, portfolio/collections, technical site visits, project tracking and energy consumption monitoring.",
            highlights: [
              "Role system and modular structure per team",
              "Workflow builder with stages, checks, tools and AI agents",
              "Operational tables and dashboards for daily management",
              "Design system reused across every module",
            ],
          },
          {
            name: "SEOS website",
            summary:
              "Public website (seosenergy.co) redesigned and implemented on Webflow to modernize the brand and attract investors and customers.",
            highlights: [
              "Benchmark of solar market references (Niko, Solara, Ruut)",
              "Clearer messaging hierarchy for the solar offer",
              "Modern, transparent visual language for investors",
              "Responsive build and shipping on Webflow",
            ],
          },
        ],
      }}
      es={{
        role: "Product Designer",
        period: "Sep 2023 – Ene 2026",
        intro:
          "Diseño de producto end-to-end para financiamiento de energía solar residencial en tres productos: una app nativa mobile para simulación rápida de proyectos, una plataforma operativa integral y el sitio web público. Lideré la estrategia de diseño, el design system y todo el UX/UI en desktop y mobile junto a un equipo reducido de producto e ingeniería.",
        tags: ["Fintech / Cleantech", "App Nativa Mobile", "Plataforma Operativa", "Webflow"],
        impact:
          "Redujimos los tickets de soporte en un 55% manteniendo la operación con solo el 20% del equipo original de Producto/Tech.",
        projects: [
          {
            name: "SEOS Partners",
            summary:
              "App nativa mobile para la simulación rápida de proyectos de energía solar, usada tanto por clientes como por vendedores.",
            highlights: [
              "Simulación rápida del proyecto y flujo de solicitud de crédito",
              "Discovery, UX research y Design Sprint (How Might We)",
              "Diseño de servicios con Auth0, Treble.ai y HubSpot",
              "Pantallas del MVP validadas con pruebas de usabilidad",
            ],
          },
          {
            name: "SEOS Studio",
            summary:
              "Plataforma integral que agrupa la simulación, los estudios de crédito, la cartera, las visitas técnicas, el seguimiento de proyectos y el monitoreo de consumo energético.",
            highlights: [
              "Sistema de roles y estructura modular por equipo",
              "Creación de workflows con stages, checks, tools y AI agents",
              "Tablas y dashboards operativos para la gestión diaria",
              "Design system reutilizado en todos los módulos",
            ],
          },
          {
            name: "Sitio Web SEOS",
            summary:
              "Sitio web público (seosenergy.co) rediseñado e implementado en Webflow para modernizar la marca y atraer inversionistas y clientes.",
            highlights: [
              "Benchmark de referentes del mercado solar (Niko, Solara, Ruut)",
              "Jerarquía de mensajes más clara para la oferta solar",
              "Lenguaje visual moderno y transparente para inversionistas",
              "Construcción e implementación responsive en Webflow",
            ],
          },
        ],
      }}
    />
  ),
});
