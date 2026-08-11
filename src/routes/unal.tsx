import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Universidad Nacional de Colombia — UX/UI Design | Luis Monroy";
const description =
  "UNAL case: WordPress maintenance of the alumni portal and digital pieces designed for the UNAL alumni audience.";

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
      cta={{
        href: "https://egresados.unal.edu.co/",
        label: { en: "Visit egresados.unal.edu.co", es: "Visitar egresados.unal.edu.co" },
        note: {
          en: "The portal is live and continuously updated by the program team. Explore it to see the structure, sections and digital pieces in their real context.",
          es: "El portal está en vivo y el equipo del programa lo actualiza continuamente. Explóralo para ver la estructura, las secciones y las piezas digitales en su contexto real.",
        },
      }}
      en={{
        role: "UX/UI Designer",
        period: "Oct 2022 – Sep 2023",
        intro:
          "WordPress maintenance of the UNAL Alumni Program website and design of digital pieces aimed at the alumni audience of Universidad Nacional de Colombia, including rebranding work for the 'Diálogos con Egresados' initiative.",
        tags: ["WordPress", "Digital Pieces", "Rebranding", "Alumni Audience"],
        impact:
          "Reduced Home page bounce rate by 25% and boosted readership of 'Soy Egresado' magazine articles by 15%, while unifying the program's digital identity across web and campaign pieces.",
        projects: [
          {
            name: "Sitio Web Egresados UNAL",
            summary:
              "Ongoing WordPress maintenance and content design for the alumni portal: events, benefits and program communication.",
            highlights: [
              "WordPress page and content maintenance",
              "Information architecture for alumni content",
              "Digital pieces for campaigns and program events",
              "'Diálogos con Egresados' visual identity applied across the site",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Oct 2022 – Sep 2023",
        intro:
          "Mantenimiento del sitio en WordPress y diseño de piezas digitales dirigidas a la audiencia de egresados de la Universidad Nacional de Colombia, incluyendo el rebranding de la iniciativa 'Diálogos con Egresados'.",
        tags: ["WordPress", "Piezas Digitales", "Rebranding", "Audiencia de Egresados"],
        impact:
          "Disminuimos en un 25% la tasa de rebote en el Home y aumentamos en un 15% las visitas a los artículos de la revista 'Soy Egresado', unificando la identidad digital del programa.",
        projects: [
          {
            name: "Sitio Web Egresados UNAL",
            summary:
              "Mantenimiento continuo en WordPress y diseño de contenidos del portal: eventos, beneficios y comunicación del programa.",
            highlights: [
              "Mantenimiento de páginas y contenidos en WordPress",
              "Arquitectura de información para contenido de egresados",
              "Piezas digitales para campañas y eventos del programa",
              "Identidad visual de 'Diálogos con Egresados' aplicada en el sitio",
            ],
          },
        ],
      }}
    />
  ),
});
