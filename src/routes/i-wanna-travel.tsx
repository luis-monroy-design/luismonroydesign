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
      role="UX/UI Designer"
      period="Travel agency project"
      intro="Website design for a travel agency, focused on presenting destinations and packages clearly and driving booking inquiries."
      tags={["Travel", "Web Design", "UX/UI", "Conversion"]}
      impact="Gave the agency a clearer digital storefront for its destination and package offer."
      projects={[
        {
          name: "Sitio web Agencia de Viajes",
          summary:
            "Full website design covering destinations, packages and contact flow. (Generic placeholder content — to be replaced.)",
          highlights: [
            "Destination and package catalog structure",
            "Responsive desktop and mobile layouts",
            "Inquiry and contact flow design",
          ],
        },
      ]}
    />
  ),
});
