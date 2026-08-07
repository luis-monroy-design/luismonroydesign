import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import bodyHtml from "../portfolio-body.html?raw";


const title = "Luis Monroy — Product Designer & UX/UI Designer";
const description =
  "Portfolio of Luis Monroy - Digital Product Designer & UX/UI Designer specializing in user research, prototyping, data-driven design, and AI workflows.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: "/site/portfolio.css" },
    ],
  }),
  component: Index,
});

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-portfolio="${src}"]`);
    if (existing) return resolve();
    const el = document.createElement("script");
    el.src = src;
    el.dataset["portfolio"] = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

function Index() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    let cancelled = false;
    (async () => {
      try {
        await loadScript("https://unpkg.com/lucide@latest");
        if (cancelled) return;
        await loadScript("/site/portfolio.js");
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
