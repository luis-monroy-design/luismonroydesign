import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Micrositios S.A.S. — UX/UI Design | Luis Monroy";
const description =
  "Micrositios case: UX for Transmilenio and Unicolmayor government portals, cutting unnecessary scroll through menu reduction.";

const unicolmayor = "/__l5e/assets-v1/e11d2014-70a6-40b7-aea0-0fb418b6e7ca/Home_UnicolMayor-2.jpg";
const transmilenio = "/__l5e/assets-v1/f2f1951e-cd58-4338-935d-40703f95faad/transmilenio1.JPG";

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
      galleryTag={{ en: "// INTERFACE DESIGN", es: "// DISEÑO DE INTERFAZ" }}
      galleryTitle={{ en: "Designed screens", es: "Pantallas diseñadas" }}
      gallery={[
        {
          url: unicolmayor,
          maxWidth: 482,
          title: { en: "Unicolmayor — Home", es: "Unicolmayor — Home" },
          caption: {
            en: "Home restructured around blocks of direct access (services, alumni, library, contracting) and a tabbed programs module, so the full academic offer is readable without endless scrolling.",
            es: "Home reestructurado en bloques de acceso directo (servicios, egresados, biblioteca, contratación) y un módulo de programas con pestañas, para leer toda la oferta académica sin scroll interminable.",
          },
        },
        {
          url: transmilenio,
          title: { en: "Transmilenio — Inner page", es: "Transmilenio — Página interna" },
          caption: {
            en: "Inner page with a compact, collapsible left-hand menu and a related-pages list with a keyword filter, replacing long expanded menus that pushed content below the fold.",
            es: "Página interna con menú lateral izquierdo compacto y colapsable, y listado de páginas relacionadas con filtro por palabra clave, en reemplazo de menús extensos que empujaban el contenido fuera de pantalla.",
          },
        },
      ]}
      en={{
        role: "UX/UI Designer",
        period: "Feb 2026 – Apr 2026",
        intro:
          "User experience design for high-traffic Colombian government websites — Transmilenio and Universidad Colegio Mayor de Cundinamarca (Unicolmayor) — where large volumes of institutional content must stay readable and easy to navigate.",
        tags: ["Gov Web Design", "Information Architecture", "Menu Reduction", "Mobile & Desktop"],
        impact:
          "Optimized the display of long-form content by reducing menus — especially the left-hand lateral menu — to drastically cut unnecessary scrolling. Menu restructuring on the Transmilenio and Unicolmayor portals reduced user scrolling by 68%.",
        projects: [
          {
            name: "Sitio web UnicolMayor",
            summary:
              "Redesign of the university portal, prioritizing findability of academic and administrative content.",
            highlights: [
              "Lateral menu reduced and grouped by task",
              "Programs module condensed into tabs instead of long lists",
              "Direct-access blocks for the most requested services",
              "Responsive desktop and mobile architecture",
            ],
          },
          {
            name: "Sitio web Transmilenio",
            summary:
              "Experience design for the public transport portal, focused on fast access to service information.",
            highlights: [
              "Collapsible left-hand menu on every inner page",
              "Related-pages listing with keyword filtering",
              "Content hierarchy tuned for high-traffic pages",
              "Persistent shortcuts for top-up, map and balance",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Feb 2026 – Abr 2026",
        intro:
          "Diseño de experiencia de usuario para sitios web del Gobierno de Colombia con alto tráfico — Transmilenio y la Universidad Colegio Mayor de Cundinamarca (Unicolmayor) — donde grandes volúmenes de contenido institucional deben mantenerse legibles y fáciles de navegar.",
        tags: [
          "Diseño Web Gov",
          "Arquitectura de Información",
          "Reducción de Menús",
          "Mobile y Desktop",
        ],
        impact:
          "Optimización de visualización de contenidos extensos mediante la reducción de menús (especialmente el lateral izquierdo) para disminuir drásticamente el scroll innecesario. La reestructuración de menús en los portales de Transmilenio y Unicolmayor redujo el scroll del usuario en un 68%.",
        projects: [
          {
            name: "Sitio web UnicolMayor",
            summary:
              "Rediseño del portal universitario, priorizando la localización del contenido académico y administrativo.",
            highlights: [
              "Menú lateral reducido y agrupado por tarea",
              "Módulo de programas condensado en pestañas en vez de listados largos",
              "Bloques de acceso directo a los servicios más solicitados",
              "Arquitectura responsive para desktop y mobile",
            ],
          },
          {
            name: "Sitio web Transmilenio",
            summary:
              "Diseño de experiencia para el portal de transporte público, enfocado en el acceso rápido a la información de servicio.",
            highlights: [
              "Menú lateral izquierdo colapsable en cada página interna",
              "Listado de páginas relacionadas con filtro por palabra clave",
              "Jerarquía de contenido ajustada para páginas de alto tráfico",
              "Accesos permanentes a recarga, mapa y saldo",
            ],
          },
        ],
      }}
    />
  ),
});
