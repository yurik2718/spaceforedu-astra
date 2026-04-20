export const CONTACT_WHATSAPP = import.meta.env.PUBLIC_CONTACT_WHATSAPP ?? "";
export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL ?? "";
export const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? "https://spaceforedu.com";

export const LOCALES = ["es", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";
