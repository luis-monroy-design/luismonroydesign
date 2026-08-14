import { useEffect, useState } from "react";

export type Lang = "en" | "es";

const KEY = "lm-lang";
const EVENT = "lm-langchange";

export const CV_URLS: Record<Lang, string> = {
  en: "/__l5e/assets-v1/aa5e97cf-78c2-4613-82d0-0f4e62a4ef48/CV_Luis-Monroy_EN_PD-2026.pdf",
  es: "/__l5e/assets-v1/eb079817-8ec9-4b63-9401-d8ffc739010e/CV_Luis-Monroy_ES_PD-2026.pdf",
};

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(KEY) === "es" ? "es" : "en";
}

export function setLang(lang: Lang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, lang);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(getLang());
    const onChange = () => setLangState(getLang());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  return [lang, setLang];
}
