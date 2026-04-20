// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://spaceforedu.com",
  output: "static",
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es", en: "en", ru: "ru" },
      },
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ru"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
