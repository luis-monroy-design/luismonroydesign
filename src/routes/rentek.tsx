import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage, companyHeadLinks } from "../components/CompanyPage";

const title = "Rentek — UX/UI Design | Luis Monroy";
const description =
  "Rentek case overview: website design on Webflow and an interactive renting loan simulator.";

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
      role="UX/UI Designer"
      period="Oct 2024 – Feb 2025"
      intro="Loan simulator and website design for asset renting, tailored for B2B enterprises and retail clients. Work included UX benchmarking of the renting market and hands-on implementation in Webflow."
      tags={["Webflow", "Loan Simulator", "B2B & B2C", "UX Benchmarking"]}
      impact="Increased lead capture by 30% compared to the previous simulator design."
      projects={[
        {
          name: "Website",
          summary:
            "Corporate site redesign and Webflow implementation, aligning the brand with a clearer B2B and retail offer. (Generic placeholder content — to be replaced.)",
          highlights: [
            "UI design and Webflow build",
            "Content structure for two audience tracks",
            "Responsive desktop and mobile layouts",
          ],
        },
        {
          name: "Simulador",
          summary:
            "Interactive renting simulator that lets users estimate monthly fees and terms before contacting sales. (Generic placeholder content — to be replaced.)",
          highlights: [
            "UX benchmarking of competing simulators",
            "Interactive desktop and mobile prototypes",
            "Lead capture integrated into the results step",
          ],
        },
      ]}
    />
  ),
});
