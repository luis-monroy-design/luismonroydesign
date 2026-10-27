import { ArrowLeft } from "lucide-react";

/** Small fixed link back to the portfolio, shown on every redesigned client site. */
export function RedesignBadge() {
  return (
    <a
      href="/"
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 60,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px 8px 10px",
        borderRadius: 999,
        background: "rgba(10, 10, 12, 0.82)",
        color: "#fff",
        font: "500 13px/1 system-ui, sans-serif",
        textDecoration: "none",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 24px rgba(0,0,0,.25)",
      }}
    >
      <ArrowLeft size={14} aria-hidden="true" />
      Rediseño por Luis Monroy
    </a>
  );
}

/** Shared head entries for a redesigned site: its fonts and stylesheet. */
export function siteHead(opts: { title: string; description: string; fonts: string; css: string }) {
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      { rel: "stylesheet", href: opts.fonts },
      { rel: "stylesheet", href: opts.css },
    ],
  };
}
