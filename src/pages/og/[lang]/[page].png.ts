import type { APIRoute, GetStaticPaths } from "astro";
import { LOCALES } from "@/lib/constants";
import { getSeo } from "@/lib/seo";
import { generateOgPng } from "@/lib/og-image";

// SEO page keys for which we generate per-page OG images
const OG_PAGES = ["home", "homologacion", "universidad", "espanol", "precios"] as const;
type OgPageKey = (typeof OG_PAGES)[number];

export const getStaticPaths: GetStaticPaths = () =>
  LOCALES.flatMap((lang) => OG_PAGES.map((page) => ({ params: { lang, page } })));

export const GET: APIRoute = async ({ params }) => {
  const { lang, page } = params as { lang: string; page: OgPageKey };
  const seo = getSeo(page, lang);
  const png = await generateOgPng(seo.title, seo.description, lang);

  return new Response(Buffer.from(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
