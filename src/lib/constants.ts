export const CONTACT_WHATSAPP = import.meta.env.PUBLIC_CONTACT_WHATSAPP ?? "";
export const CONTACT_EMAIL = import.meta.env.PUBLIC_CONTACT_EMAIL ?? "";
export const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? "https://spaceforedu.com";

export const FEATURE_DASHBOARD =
  import.meta.env.PUBLIC_FEATURE_DASHBOARD === "true";

export const LOCALES = ["es", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

// Build-time guard: warn loudly if the .env.example placeholder leaked into a
// production build. CTAs (wa.me, JSON-LD telephone) become non-functional.
if (import.meta.env.PROD && CONTACT_WHATSAPP === "34600000000") {
  console.warn(
    "[space-for-edu] PUBLIC_CONTACT_WHATSAPP is still the placeholder " +
      "'34600000000' — replace it with the real WhatsApp number before deploy.",
  );
}
