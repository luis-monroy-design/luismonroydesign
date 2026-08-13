import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Rentek — UX/UI Design | Luis Monroy";
const description =
  "Rentek case: renting simulator redesign (+30% leads) and full corporate website redesign built on Webflow.";

const simulator = "/__l5e/assets-v1/1719db25-f09e-4bdc-a3c6-c13f13c8ea5d/Simulador-Mobile-02.jpg";
const simLogin = "/__l5e/assets-v1/81ca75a5-9e74-4531-b559-baf65d54cf43/Simulador-Mobile-01-1.jpg";
const simStep = "/__l5e/assets-v1/c142774b-5ee0-462b-899e-4bd87beb7764/Simulador-Mobile-01.jpg";
const website = "/__l5e/assets-v1/c1877d06-2b87-4b31-9797-48866a6b21d0/Home_Rentek_Website.jpg";

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
      galleryTag={{ en: "// INTERFACE DESIGN", es: "// DISEÑO DE INTERFAZ" }}
      galleryTitle={{ en: "Designed screens", es: "Pantallas diseñadas" }}
      gallery={[
        {
          url: website,
          title: { en: "rentek.com.co — Home", es: "rentek.com.co — Home" },
          caption: {
            en: "Corporate home built on Webflow: value proposition, renting vs. lending tracks, popular services and an advisory form as the main conversion point.",
            es: "Home corporativo desarrollado en Webflow: propuesta de valor, rutas de renting y préstamo, servicios más populares y formulario de asesoría como punto principal de conversión.",
          },
        },
        {
          url: simLogin,
          maxWidth: 420,
          title: { en: "Simulator — Access", es: "Simulador — Ingreso" },
          caption: {
            en: "Entry screen: a single email field to start the simulation, keeping friction minimal while capturing the contact that becomes the lead.",
            es: "Pantalla de ingreso: un solo campo de correo para iniciar la simulación, con la mínima fricción posible mientras se captura el contacto que se convierte en lead.",
          },
        },
        {
          url: simStep,
          maxWidth: 420,
          title: { en: "Simulator — Product and amount", es: "Simulador — Producto y monto" },
          caption: {
            en: "Step one and two on a single screen: product type (renting, technology renting, loan) and amount with slider plus manual input, with inline validation of the minimum allowed amount.",
            es: "Pasos uno y dos en una sola pantalla: tipo de producto (renting, renting de tecnología, préstamo) y monto con slider más ingreso manual, con validación en línea del monto mínimo permitido.",
          },
        },
        {
          url: simulator,
          maxWidth: 420,
          title: { en: "Renting simulator (mobile)", es: "Simulador de renting (mobile)" },
          caption: {
            en: "Two-step simulation: product type and amount, with term selection and the monthly fee as the immediate result. The share action turns the result into a lead.",
            es: "Simulación en dos pasos: tipo de producto y monto, con selección de plazo y el canon mensual como resultado inmediato. La acción de compartir convierte el resultado en un lead.",
          },
        },
      ]}
      en={{
        role: "UX/UI Designer",
        period: "Oct 2024 – Feb 2025",
        intro:
          "Redesign of the renting simulator and of the corporate website (rentek.com.co) for an asset renting and business financing company, serving both B2B enterprises and retail clients.",
        tags: ["Webflow", "Renting Simulator", "B2B & B2C", "Conversion / Lead Gen"],
        impact:
          "Renting simulator redesign delivering a 30% increase in lead capture compared to the previous version. In addition, a full redesign of the corporate website (rentek.com.co) built on Webflow, optimizing copy and visual assets to communicate the company's purpose and its portfolio of financial products with total clarity.",
        projects: [
          {
            name: "Corporate website (rentek.com.co)",
            summary: "Full redesign and hands-on Webflow implementation of the public site.",
            highlights: [
              "Copy optimization to clarify the company purpose",
              "Visual assets aligned to the financial product portfolio",
              "Renting and lending tracks split for two audiences",
              "Responsive desktop and mobile build in Webflow",
            ],
          },
          {
            name: "Renting simulator",
            summary:
              "Simulator that lets a user estimate a monthly fee in two simple steps, before talking to sales.",
            highlights: [
              "Two-step flow: product type and amount",
              "Term selection with instant monthly fee",
              "Share action used as the lead capture point",
              "+30% lead capture vs. the previous simulator",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Oct 2024 – Feb 2025",
        intro:
          "Rediseño del simulador de renting y del sitio web corporativo (rentek.com.co) para una compañía de arrendamiento de activos y financiación empresarial, dirigida a empresas B2B y clientes naturales.",
        tags: ["Webflow", "Simulador de Renting", "B2B y B2C", "Conversión / Leads"],
        impact:
          "Rediseño del simulador de renta, logrando un aumento del 30% en la captación de leads en comparación con la versión anterior. Adicionalmente, rediseño integral del sitio web corporativo (rentek.com.co) desarrollado en Webflow, optimizando los copys y las piezas visuales para comunicar con total claridad el propósito de la empresa y su portafolio de productos financieros.",
        projects: [
          {
            name: "Sitio web corporativo (rentek.com.co)",
            summary: "Rediseño integral e implementación directa del sitio público en Webflow.",
            highlights: [
              "Optimización de copys para clarificar el propósito de la empresa",
              "Piezas visuales alineadas al portafolio de productos financieros",
              "Rutas de renting y préstamo separadas para dos audiencias",
              "Construcción responsive en Webflow (desktop y mobile)",
            ],
          },
          {
            name: "Simulador de renting",
            summary:
              "Simulador que permite estimar el canon mensual en dos pasos simples, antes de hablar con el equipo comercial.",
            highlights: [
              "Flujo en dos pasos: tipo de producto y monto",
              "Selección de plazo con canon mensual inmediato",
              "Acción de compartir como punto de captación de leads",
              "+30% en captación de leads frente al simulador anterior",
            ],
          },
        ],
      }}
    />
  ),
});
