import type { Messages } from "@/lib/i18n";
import { lookup } from "@/lib/i18n";
import { SITE_URL, CONTACT_WHATSAPP, CONTACT_EMAIL, LOCALES } from "@/lib/constants";
import { publicRoute } from "@/lib/routes";
import type { Locale } from "@/lib/constants";

const ORG_ID = `${SITE_URL}/#org`;

export function organization(): object {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": ORG_ID,
    name: "Space for Edu",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/og.jpg`,
    foundingDate: "2010",
    areaServed: "ES",
    knowsLanguage: ["es", "en", "ru"],
    slogan: "Educación en España, de principio a fin",
    description:
      "Spain-based education consultancy specialising in degree homologation, university admission and Spanish courses. 15+ years of experience, 1700+ successful cases, 98% favourable resolution rate.",
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
  audience?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    serviceType: params.serviceType,
    areaServed: "ES",
    availableLanguage: ["es", "en", "ru"],
    provider: { "@id": ORG_ID },
    url: SITE_URL + publicRoute(params.page, params.locale),
    ...(params.audience
      ? { audience: { "@type": "Audience", audienceType: params.audience } }
      : {}),
  };
}

export function website(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Space for Edu",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#org` },
    inLanguage: Array.from(LOCALES),
  };
}

const SERVICE_LIST_LABELS: Record<
  Locale,
  {
    listName: string;
    services: Array<{ name: string; description: string }>;
  }
> = {
  es: {
    listName: "Servicios educativos en España",
    services: [
      { name: "Homologación de títulos", description: "Reconocimiento oficial de títulos extranjeros ante el Ministerio de Educación español." },
      { name: "Acceso a universidades", description: "Acompañamiento integral para ingresar a una universidad española." },
      { name: "Clases de español", description: "Clases individuales y grupales con profesores nativos certificados, niveles A1–C2." },
    ],
  },
  en: {
    listName: "Educational services in Spain",
    services: [
      { name: "Degree homologation", description: "Official recognition of foreign degrees by the Spanish Ministry of Education." },
      { name: "University admission", description: "End-to-end support for enrolment in Spanish universities." },
      { name: "Spanish language courses", description: "Individual and group lessons with certified native teachers, levels A1–C2." },
    ],
  },
  ru: {
    listName: "Образовательные услуги в Испании",
    services: [
      { name: "Омологация диплома", description: "Официальное признание иностранных дипломов Министерством образования Испании." },
      { name: "Поступление в вузы", description: "Комплексная помощь с поступлением в испанские университеты." },
      { name: "Уроки испанского", description: "Индивидуальные и групповые занятия с сертифицированными носителями языка, уровни A1–C2." },
    ],
  },
};

export function serviceList(locale: Locale): object {
  const labels = SERVICE_LIST_LABELS[locale] ?? SERVICE_LIST_LABELS.es;
  const pages = ["homologation", "university", "spanish"];
  const services = labels.services.map((s, i) => ({ ...s, url: publicRoute(pages[i], locale) }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: labels.listName,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: SITE_URL + s.url,
        provider: { "@id": `${SITE_URL}/#org` },
        areaServed: "ES",
      },
    })),
  };
}

type BreadcrumbLabels = {
  home: string;
};

const BREADCRUMB_LABELS: Record<Locale, BreadcrumbLabels> = {
  es: { home: "Inicio" },
  en: { home: "Home" },
  ru: { home: "Главная" },
};

/**
 * Build a BreadcrumbList JSON-LD: Home → current page.
 * `pageName` is the human-readable label of the current page (e.g. "Homologación").
 * `pagePath` is the route key used by publicRoute (e.g. "homologation").
 */
export function breadcrumbList(
  locale: Locale,
  pageName: string,
  pagePath: string,
): object {
  const labels = BREADCRUMB_LABELS[locale] ?? BREADCRUMB_LABELS.es;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: labels.home,
        item: SITE_URL + publicRoute("", locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: SITE_URL + publicRoute(pagePath, locale),
      },
    ],
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
