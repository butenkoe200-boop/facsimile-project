import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { RU_EN } from "./translations";

export type Lang = "ru" | "en";

const KEY = "tp-lang";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; toggle: () => void }>({
  lang: "ru",
  setLang: () => {},
  toggle: () => {},
});

/* ---------- dictionary lookup ---------- */

const NORM = new Map<string, string>();
for (const [ru, en] of Object.entries(RU_EN)) {
  NORM.set(normalize(ru), en);
}
// Longest-first list for substring replacement inside composite strings.
const PAIRS = Object.entries(RU_EN).sort((a, b) => b[0].length - a[0].length);

function normalize(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

const CYR = /[А-Яа-яЁё]/;

function translateString(raw: string): string | null {
  if (!CYR.test(raw)) return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  const direct = NORM.get(normalize(raw));
  if (direct !== undefined) {
    // preserve surrounding whitespace of the original node
    const lead = raw.slice(0, raw.length - raw.trimStart().length);
    const tail = raw.slice(raw.trimEnd().length);
    return lead + direct + tail;
  }

  // fall back to substring replacement (handles composites like "Заказ TP-245789")
  let out = raw;
  let changed = false;
  for (const [ru, en] of PAIRS) {
    if (ru.length < 4) continue;
    if (out.includes(ru)) {
      out = out.split(ru).join(en);
      changed = true;
      if (!CYR.test(out)) break;
    }
  }
  return changed ? out : null;
}

/* ---------- DOM translation ---------- */

const ORIGINAL_TEXT = new WeakMap<Node, string>();
const ORIGINAL_ATTR = new WeakMap<Element, Record<string, string>>();
const ATTRS = ["placeholder", "aria-label", "title", "alt", "value", "aria-placeholder"];
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);

function applyText(node: Text, lang: Lang) {
  const raw = node.nodeValue ?? "";
  if (lang === "ru") {
    const orig = ORIGINAL_TEXT.get(node);
    if (orig !== undefined && orig !== raw) node.nodeValue = orig;
    return;
  }
  const source = ORIGINAL_TEXT.get(node) ?? raw;
  const translated = translateString(source);
  if (translated !== null && translated !== raw) {
    ORIGINAL_TEXT.set(node, source);
    node.nodeValue = translated;
  }
}

function applyAttrs(el: Element, lang: Lang) {
  const stored = ORIGINAL_ATTR.get(el);
  if (lang === "ru") {
    if (stored) {
      for (const [name, orig] of Object.entries(stored)) {
        if (el.getAttribute(name) !== orig) el.setAttribute(name, orig);
      }
    }
    return;
  }
  for (const name of ATTRS) {
    if (!el.hasAttribute(name)) continue;
    const current = el.getAttribute(name) ?? "";
    const source = stored?.[name] ?? current;
    const translated = translateString(source);
    if (translated !== null && translated !== current) {
      const next = { ...(stored ?? {}), [name]: source };
      ORIGINAL_ATTR.set(el, next);
      el.setAttribute(name, translated);
    }
  }
}

function walk(root: Node, lang: Lang) {
  if (root.nodeType === Node.TEXT_NODE) {
    applyText(root as Text, lang);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (SKIP_TAGS.has(el.tagName)) return;

  applyAttrs(el, lang);

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) =>
      n.nodeType === Node.ELEMENT_NODE && SKIP_TAGS.has((n as Element).tagName)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  let current = walker.nextNode();
  while (current) {
    if (current.nodeType === Node.TEXT_NODE) applyText(current as Text, lang);
    else applyAttrs(current as Element, lang);
    current = walker.nextNode();
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "ru") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  // Translate current DOM + anything React renders afterwards.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.body;
    let scheduled = false;
    let observer: MutationObserver | null = null;

    const run = () => {
      scheduled = false;
      observer?.disconnect();
      walk(root, lang);
      document.documentElement.lang = lang;
      observer?.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ATTRS,
      });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(run);
    };

    observer = new MutationObserver(schedule);
    run();

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, toggle: () => setLang(lang === "ru" ? "en" : "ru") }),
    [lang, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLanguage() {
  return useContext(Ctx);
}
