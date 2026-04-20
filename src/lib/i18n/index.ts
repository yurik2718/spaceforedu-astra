import es from "./es.json";
import en from "./en.json";
import ru from "./ru.json";
import type { Locale } from "@/lib/constants";

export type Messages = typeof es;

const bundles: Record<Locale, Messages> = { es, en: en as Messages, ru: ru as Messages };

export function getMessages(locale: Locale | string): Messages {
  return bundles[locale as Locale] ?? bundles.es;
}

/** Walk a dot-notation key through the messages object. */
export function lookup(messages: unknown, key: string): string | undefined {
  const parts = key.split(".");
  let cursor: unknown = messages;
  for (const part of parts) {
    if (cursor && typeof cursor === "object" && part in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof cursor === "string" ? cursor : undefined;
}

export function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, name) =>
    params[name] !== undefined ? String(params[name]) : `{{${name}}}`,
  );
}

/** Server/Astro-side translator. Returns the key itself if missing. */
export function makeT(messages: Messages) {
  return function t(key: string, params?: Record<string, string | number>): string {
    const raw = lookup(messages, key);
    if (raw === undefined) return key;
    return interpolate(raw, params);
  };
}
