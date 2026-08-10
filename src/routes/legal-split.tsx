import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";
import dashboardImg from "../assets/legalsplit-dashboard.jpg.asset.json";
import splitsImg from "../assets/legalsplit-splits.jpg.asset.json";
import cobrosImg from "../assets/legalsplit-cobros.jpg.asset.json";
import contratosImg from "../assets/legalsplit-contratos.jpg.asset.json";
import miembrosImg from "../assets/legalsplit-miembros.jpg.asset.json";

const title = "Legal Split — UX Architecture & UI System | Luis Monroy";
const description =
  "Legal Split case study: information architecture, user experience and a standardized UI system for royalty splits, contracts and payments in the creative industries.";

export const Route = createFileRoute("/legal-split")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: dashboardImg.url },
      { name: "twitter:image", content: dashboardImg.url },
    ],
    links: companyHeadLinks,
  }),
  component: () => (
    <CompanyPage
      company="Legal Split"
      galleryTag={{ en: "// INTERFACE DESIGN", es: "// DISEÑO DE INTERFAZ" }}
      galleryTitle={{ en: "UI Screens", es: "Pantallas de la App" }}
      en={{
        role: "UX/UI Designer",
        period: "Apr 2026 – Jul 2026",
        intro:
          "Legal Split distributes royalties and manages contracts, members and payments for multimedia projects. Its users are musicians, filmmakers, producers, editors, managers and lawyers — people with very different levels of legal and financial literacy. My job was to define the information architecture and the end-to-end user experience, and to build a standardized UI system where every state, amount and responsibility reads clearly at first glance.",
        tags: [
          "UX Architecture",
          "Design System",
          "Web App",
          "Royalties & Contracts",
          "Creative Industries",
        ],
        impact:
          "Turned a legally dense process into a single, predictable interface language: one navigation model, one component vocabulary and one status system reused across dashboard, splits, contracts, payments and members.",
        blocks: [
          {
            title: "Information architecture",
            body: "I organized the whole product around the mental model of the creative team — the project — and hung every other object (members, contracts, splits, collections) off it, so nobody has to understand legal or accounting jargon to find what they need.",
            points: [
              "Single persistent sidebar with 8 predictable destinations",
              "Project as the central entity that connects money, people and documents",
              "Progressive disclosure: summary first, detail on demand",
              "Consistent list → filter → row action pattern on every module",
            ],
          },
          {
            title: "Experience for non-expert users",
            body: "Every screen answers three questions without reading instructions: how much, who gets it and what happens next. Legal and financial terminology is replaced by plain language, visual percentages and explicit statuses.",
            points: [
              "Split distributions shown as readable percentage chips per member",
              "Colour-coded statuses (paid, sent, pending, in review) used identically everywhere",
              "Alerts and pending actions surfaced with an explicit next step",
              "Bilingual product (ES/EN) for cross-border collaborators",
            ],
          },
          {
            title: "Standardized UI system",
            body: "A compact component library keeps the platform coherent as new modules are added: cards, tables, badges, form controls, avatars, empty states and action icons all share the same tokens for spacing, radius, typography and colour.",
            points: [
              "Design tokens for colour, radius, elevation and type scale",
              "One table pattern with reusable filters and row actions",
              "Form controls with a single validation and hierarchy logic",
              "Accessible contrast and clear hierarchy on data-heavy screens",
            ],
          },
        ],
        projects: [
          {
            name: "App Web",
            summary:
              "End-to-end design of the web application: dashboard, projects, splits, members, clients, contracts, collections and notifications, plus the UI system that keeps all of them consistent.",
            highlights: [
              "User flows and information architecture",
              "Interface design for every core module",
              "Reusable component library for the MVP",
              "Frontend implementation with Lovable and GCP integrations",
            ],
          },
        ],
      }}
      es={{
        role: "Diseñador UX/UI",
        period: "Abr 2026 – Jul 2026",
        intro:
          "Legal Split distribuye regalías y gestiona contratos, miembros y cobros de proyectos multimedia. Sus usuarios son músicos, realizadores, productores, editores, managers y abogados: perfiles con niveles muy distintos de conocimiento legal y financiero. Mi trabajo fue definir la arquitectura de información y la experiencia de usuario de punta a punta, y construir un UI estandarizado donde cada estado, monto y responsabilidad se entienda a primera vista.",
        tags: [
          "Arquitectura UX",
          "Design System",
          "App Web",
          "Regalías y Contratos",
          "Industria Creativa",
        ],
        impact:
          "Convertí un proceso legalmente denso en un solo lenguaje de interfaz predecible: un modelo de navegación, un vocabulario de componentes y un sistema de estados reutilizado en dashboard, splits, contratos, cobros y miembros.",
        blocks: [
          {
            title: "Arquitectura de información",
            body: "Organicé el producto alrededor del modelo mental del equipo creativo —el proyecto— y colgué de ahí el resto de objetos (miembros, contratos, splits, cobros), para que nadie necesite dominar jerga legal o contable para encontrar lo que busca.",
            points: [
              "Sidebar persistente con 8 destinos predecibles",
              "El proyecto como entidad central que conecta dinero, personas y documentos",
              "Divulgación progresiva: primero el resumen, el detalle bajo demanda",
              "Patrón consistente lista → filtro → acción en cada módulo",
            ],
          },
          {
            title: "Experiencia para usuarios no expertos",
            body: "Cada pantalla responde tres preguntas sin necesidad de instrucciones: cuánto, para quién y qué sigue. La terminología legal y financiera se reemplaza por lenguaje claro, porcentajes visuales y estados explícitos.",
            points: [
              "Distribución de splits en chips de porcentaje legibles por miembro",
              "Estados por color (pagado, enviado, pendiente, en revisión) idénticos en todo el producto",
              "Alertas y pendientes con una acción siguiente explícita",
              "Producto bilingüe (ES/EN) para colaboradores de distintos países",
            ],
          },
          {
            title: "UI estandarizado",
            body: "Una librería compacta de componentes mantiene la coherencia al sumar módulos: tarjetas, tablas, badges, campos de formulario, avatares, estados vacíos e iconos de acción comparten los mismos tokens de espaciado, radio, tipografía y color.",
            points: [
              "Tokens de color, radio, elevación y escala tipográfica",
              "Un solo patrón de tabla con filtros y acciones reutilizables",
              "Campos de formulario con una única lógica de validación y jerarquía",
              "Contraste accesible y jerarquía clara en pantallas con mucha data",
            ],
          },
        ],
        projects: [
          {
            name: "App Web",
            summary:
              "Diseño end-to-end de la aplicación web: dashboard, proyectos, splits, miembros, clientes, contratos, cobros y notificaciones, más el sistema de UI que los mantiene consistentes.",
            highlights: [
              "Flujos de usuario y arquitectura de información",
              "Diseño de interfaz de todos los módulos clave",
              "Librería de componentes reutilizable para el MVP",
              "Implementación frontend con Lovable e integraciones en GCP",
            ],
          },
        ],
      }}
      gallery={[
        {
          url: dashboardImg.url,
          title: { en: "Dashboard", es: "Dashboard" },
          caption: {
            en: "Financial snapshot, digital assets, alerts and project progress in one scannable view, so any collaborator understands the state of the operation without opening a contract.",
            es: "Balance financiero, activos digitales, alertas y avance de proyectos en una vista escaneable, para que cualquier colaborador entienda el estado de la operación sin abrir un contrato.",
          },
        },
        {
          url: splitsImg.url,
          title: { en: "Splits", es: "Splits" },
          caption: {
            en: "Monetization splits per platform and video: percentage chips, member avatars, status and earnings share one row pattern, making complex royalty deals readable at a glance.",
            es: "Repartos de monetización por plataforma y video: chips de porcentaje, avatares de miembros, estado y ganancias comparten un mismo patrón de fila, haciendo legible un acuerdo de regalías complejo.",
          },
        },
        {
          url: contratosImg.url,
          title: { en: "Contracts", es: "Contratos" },
          caption: {
            en: "Contract lifecycle with explicit signature states and document actions, translating legal steps into a simple, trackable progression.",
            es: "Ciclo de vida del contrato con estados de firma explícitos y acciones sobre el documento, traduciendo pasos legales en una progresión simple y rastreable.",
          },
        },
        {
          url: cobrosImg.url,
          title: { en: "Collections & payment links", es: "Cobros y links de pago" },
          caption: {
            en: "Creating a public payment link in one short form, with connection status and generated links in a single table — no financial setup knowledge required.",
            es: "Creación de un link de cobro público en un formulario corto, con estado de conexión y links generados en una sola tabla — sin requerir conocimientos de configuración financiera.",
          },
        },
        {
          url: miembrosImg.url,
          title: { en: "Members", es: "Miembros" },
          caption: {
            en: "Roles, participation and contact data for every collaborator, so responsibilities and payouts are never ambiguous across artistic, audiovisual and legal profiles.",
            es: "Roles, participación y datos de contacto de cada colaborador, para que responsabilidades y pagos nunca sean ambiguos entre perfiles artísticos, audiovisuales y legales.",
          },
        },
      ]}
    />
  ),
});
