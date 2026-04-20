import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Messages } from "./index";
import { lookup, interpolate } from "./index";
import type { Locale } from "@/lib/constants";

interface I18nValue {
  locale: Locale | string;
  messages: Messages;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale | string;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <I18nProvider>");
  }
  return ctx;
}

export function useTranslation() {
  const { locale, messages } = useI18n();
  const t = (key: string, params?: Record<string, string | number>): string => {
    const raw = lookup(messages, key);
    if (raw === undefined) return key;
    return interpolate(raw, params);
  };
  return { t, locale };
}
