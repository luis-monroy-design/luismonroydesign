import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export type CompanyProject = {
  name: string;
  summary: string;
  highlights: string[];
};

export type CompanyPageProps = {
  company: string;
  role: string;
  period: string;
  intro: string;
  tags: string[];
  impact: string;
  projects: CompanyProject[];
};

export function CompanyPage({
  company,
  role,
  period,
  intro,
  tags,
  impact,
  projects,
}: CompanyPageProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px 96px" }}>
      <Link
        to="/"
        className="tech-tag"
        style={{ textDecoration: "none", display: "inline-block", marginBottom: 32 }}
      >
        ← Back to portfolio
      </Link>

      <div className="section-header" style={{ marginBottom: 24 }}>
        <span className="section-tag">// CASE OVERVIEW</span>
        <h1 className="section-title" style={{ margin: 0 }}>
          {company}
        </h1>
      </div>

      <div className="company-header" style={{ marginBottom: 16 }}>
        <div className="company-info">
          <div className="company-role">{role}</div>
        </div>
        <span className="company-period">{period}</span>
      </div>

      <p className="company-desc" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
        {intro}
      </p>

      <div className="tag-cloud" style={{ marginTop: 20 }}>
        {tags.map((t) => (
          <span className="tech-tag" key={t}>
            {t}
          </span>
        ))}
      </div>

      <div className="company-impact" style={{ marginTop: 28 }}>
        <div className="impact-text">
          <strong>Key Impact:</strong> {impact}
        </div>
      </div>

      <div className="section-header" style={{ marginTop: 56, marginBottom: 16 }}>
        <span className="section-tag">// ASSOCIATED PROJECTS</span>
        <h2 className="section-title" style={{ margin: 0 }}>
          Projects
        </h2>
      </div>

      <div style={{ display: "grid", gap: 20 }}>
        {projects.map((p) => (
          <article className="company-card tech-bracket" key={p.name}>
            <h3 style={{ margin: "0 0 8px" }}>{p.name}</h3>
            <p className="company-desc">{p.summary}</p>
            <div className="projects-subgrid">
              {p.highlights.map((h) => (
                <div className="project-item" key={h}>
                  <span className="project-item-text">{h}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export const companyHeadLinks = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
  { rel: "stylesheet", href: "/site/portfolio.css" },
];
