import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "I Wanna Travel — UX/UI Design | Luis Monroy";
const description = "I Wanna Travel case overview: website design for a travel agency.";

export const Route = createFileRoute("/i-wanna-travel")({
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
      company="I Wanna Travel"
      en={{
        role: "UX/UI Designer",
        period: "Jan 2022 – Sep 2022",
        intro:
          "Website design for a boutique travel agency, focused on presenting destinations and packages clearly and driving booking inquiries.",
        tags: ["Travel", "Web Design", "UX/UI", "Conversion"],
        impact:
          "Gave the agency a clearer digital storefront for its destination and package offer, improving direct booking conversions.",
        projects: [
          {
            name: "Sitio web Agencia de Viajes",
            summary:
              "Full website design covering destinations, packages and the contact flow.",
            highlights: [
              "Destination and package catalog structure",
              "Responsive desktop and mobile layouts",
              "Inquiry and booking flow design",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador Web",
        period: "Ene 2022 – Sep 2022",
        intro:
          "Diseño del sitio web de una agencia de viajes boutique, enfocado en presentar destinos y paquetes con claridad e impulsar solicitudes de reserva.",
        tags: ["Turismo", "Diseño Web", "UX/UI", "Conversión"],
        impact:
          "Le dimos a la agencia una vitrina digital más clara para sus destinos y paquetes, mejorando la conversión de reservas directas.",
        projects: [
          {
            name: "Sitio web Agencia de Viajes",
            summary:
              "Diseño completo del sitio: destinos, paquetes y flujo de contacto.",
            highlights: [
              "Estructura del catálogo de destinos y paquetes",
              "Layouts responsive para desktop y mobile",
              "Diseño del flujo de consulta y reserva",
            ],
          },
        ],
      }}
    />
  ),
});
