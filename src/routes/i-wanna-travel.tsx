import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "I Wanna Travel — UX/UI Design | Luis Monroy";
const description =
  "I Wanna Travel case: conversion-focused UX for a boutique travel agency, increasing direct bookings and reducing checkout abandonment.";

const home = "/__l5e/assets-v1/4a74ea39-2237-4b1a-b41b-a7e4b7300844/Home_-_I_Wanna_Travel-2.jpg";
const wfDestinos =
  "/__l5e/assets-v1/30814a09-2910-4063-a00a-aa7586c02a3b/Wireframe_-_Destinos_-_I_Wanna_Travel.jpg";
const wfNosotros =
  "/__l5e/assets-v1/d0e4bcca-b026-4c6e-a383-2c35f1e53281/Wireframe_-_Nosotros_-_I_Wanna_Travel.jpg";

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
      galleryTag={{ en: "// HIGH FIDELITY & WIREFRAMES", es: "// ALTA FIDELIDAD Y WIREFRAMES" }}
      galleryTitle={{ en: "Designed screens", es: "Pantallas diseñadas" }}
      gallery={[
        {
          url: home,
          maxWidth: 788,
          title: { en: "Home — high fidelity", es: "Home — alta fidelidad" },
          caption: {
            en: "Hero with an inline search (destination, dates, travellers) placed above the fold, followed by featured destinations with visible prices, trust reasons, expert packages, a countdown offer, testimonials and a newsletter block — each step designed to move the visitor toward a direct booking request.",
            es: "Hero con buscador integrado (destino, fechas, viajeros) sobre la primera pantalla, seguido de destinos destacados con precio visible, razones de confianza, paquetes de expertos, oferta con cuenta regresiva, testimonios y bloque de newsletter — cada paso diseñado para llevar al visitante a una solicitud de reserva directa.",
          },
        },
        {
          url: wfDestinos,
          maxWidth: 933,
          title: { en: "Wireframe — Destinations", es: "Wireframe — Destinos" },
          caption: {
            en: "Destination catalog structure: continent filters, a featured grid with price and 'Ver itinerarios' as the primary action, and a rescue block ('¿No encuentras tu destino ideal?') to recover users who would otherwise drop off.",
            es: "Estructura del catálogo de destinos: filtros por continente, grilla destacada con precio y 'Ver itinerarios' como acción principal, y un bloque de rescate ('¿No encuentras tu destino ideal?') para recuperar usuarios que abandonarían el flujo.",
          },
        },
        {
          url: wfNosotros,
          maxWidth: 829,
          title: { en: "Wireframe — About us", es: "Wireframe — Nosotros" },
          caption: {
            en: "Trust-building page: metrics bar, brand story, values, team and a year-by-year timeline, closing with a dual CTA (quote your trip / talk to an expert) so credibility converts into contact.",
            es: "Página de construcción de confianza: barra de métricas, historia de marca, valores, equipo y línea de tiempo año a año, cerrando con un CTA doble (cotiza tu viaje / habla con un experto) para que la credibilidad se convierta en contacto.",
          },
        },
      ]}
      en={{
        role: "UX/UI Designer",
        period: "Jan 2022 – Sep 2022",
        intro:
          "Website design for a boutique travel agency: destination catalog, packages and the booking inquiry flow, defined from wireframes through high-fidelity screens.",
        tags: ["Travel", "Web Design", "Conversion UX", "Wireframing"],
        impact:
          "Conversion-focused UX strategy, achieving an increase in direct bookings and a reduction in the abandonment rate during the purchase process.",
        projects: [
          {
            name: "Sitio web Agencia de Viajes",
            summary:
              "Full website design covering home, destinations, packages, about and the inquiry flow.",
            highlights: [
              "Search and quote entry point above the fold",
              "Destination and package catalog with visible pricing",
              "Rescue blocks and dual CTAs to reduce drop-off",
              "Wireframes validated before high-fidelity design",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador Web",
        period: "Ene 2022 – Sep 2022",
        intro:
          "Diseño del sitio web de una agencia de viajes boutique: catálogo de destinos, paquetes y flujo de solicitud de reserva, definido desde wireframes hasta pantallas de alta fidelidad.",
        tags: ["Turismo", "Diseño Web", "UX de Conversión", "Wireframing"],
        impact:
          "Estrategia UX enfocada en la conversión, logrando un aumento en reservas directas y la reducción de la tasa de abandono en el proceso de compra.",
        projects: [
          {
            name: "Sitio web Agencia de Viajes",
            summary:
              "Diseño completo del sitio: home, destinos, paquetes, nosotros y flujo de consulta.",
            highlights: [
              "Buscador y punto de cotización sobre la primera pantalla",
              "Catálogo de destinos y paquetes con precio visible",
              "Bloques de rescate y CTAs dobles para reducir el abandono",
              "Wireframes validados antes del diseño en alta fidelidad",
            ],
          },
        ],
      }}
    />
  ),
});
