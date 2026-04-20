import type { Messages } from "@/lib/i18n";
import { lookup } from "@/lib/i18n";
import { SITE_URL, CONTACT_WHATSAPP, CONTACT_EMAIL, LOCALES } from "@/lib/constants";
import { publicRoute } from "@/lib/routes";
import type { Locale } from "@/lib/constants";

const ORG_ID = `${SITE_URL}/#org`;

export function organization(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Space for Edu",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og.jpg`,
    areaServed: "ES",
    ...(CONTACT_WHATSAPP || CONTACT_EMAIL
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: Array.from(LOCALES),
            ...(CONTACT_WHATSAPP ? { telephone: `+${CONTACT_WHATSAPP}` } : {}),
            ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
          },
        }
      : {}),
  };
}

export function service(params: {
  locale: Locale;
  name: string;
  description: string;
  page: string;
  serviceType: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    areaServed: "ES",
    provider: { "@id": ORG_ID },
    url: SITE_URL + publicRoute(params.page, params.locale),
  };
}

/** Build a FAQPage JSON-LD from i18n keys matching `<prefix>.faq_<i>_q/_a`. */
export function faqPage(
  messages: Messages,
  prefix: string,
  count: number,
): object | null {
  const mainEntity = [];
  for (let i = 1; i <= count; i++) {
    const q = lookup(messages, `${prefix}.faq_${i}_q`);
    const a = lookup(messages, `${prefix}.faq_${i}_a`);
    if (!q || !a) continue;
    mainEntity.push({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    });
  }
  if (mainEntity.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
