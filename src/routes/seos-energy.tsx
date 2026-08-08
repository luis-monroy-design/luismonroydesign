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
      role="Product Designer"
      period="Sep 2023 – Jan 2026"
      intro="Digital platform design and optimization for residential solar energy financing. I owned design strategy, the design system and the full UX/UI across desktop and mobile, working closely with a lean product and engineering team."
      tags={["Fintech / Cleantech", "End-to-End Product", "Design Strategy", "Design System"]}
      impact="Reduced customer support tickets by 55% while maintaining operations with only 20% of the original Product/Tech team size."
      projects={[
        {
          name: "Website",
          summary:
            "Public marketing site redesign focused on explaining solar financing clearly and converting qualified leads. (Generic placeholder content — to be replaced.)",
          highlights: [
            "Information architecture and messaging hierarchy",
            "Responsive desktop and mobile layouts",
            "Lead capture flow and conversion tracking",
          ],
        },
        {
          name: "SEOS Studio",
          summary:
            "Internal design and configuration tool used by the operations team to build and manage solar proposals. (Generic placeholder content — to be replaced.)",
          highlights: [
            "Workflow mapping with operations stakeholders",
            "Component library and reusable patterns",
            "Usability testing and iterative refinement",
          ],
        },
        {
          name: "SEOS Partners",
          summary:
            "Partner-facing portal for installers and commercial allies to track opportunities and financing status. (Generic placeholder content — to be replaced.)",
          highlights: [
            "Role-based dashboards and permissions UX",
            "Status tracking and notification design",
            "Onboarding flow for new partners",
          ],
        },
      ]}
    />
  ),
});
