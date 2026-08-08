import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Legal Split — UX/UI Design | Luis Monroy";
const description = "Legal Split case overview: UX/UI design for a legal-tech web application.";

export const Route = createFileRoute("/legal-split")({
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
      company="Legal Split"
      role="UX/UI Designer"
      period="Apr 2026 – Jul 2026"
      intro="UX/UI design for a legal-tech product that simplifies how legal costs and processes are split and tracked between parties."
      tags={["Legal Tech", "Web App", "UX Research", "UI Design"]}
      impact="Defined the product's first coherent interface language and flow structure for the MVP."
      projects={[
        {
          name: "App Web",
          summary:
            "End-to-end design of the web application, from onboarding to case management. (Generic placeholder content — to be replaced.)",
          highlights: [
            "User flows and information architecture",
            "Interface design for core case management screens",
            "Reusable UI components for the MVP",
          ],
        },
      ]}
    />
  ),
});
