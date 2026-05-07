import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

type FontEntry = { name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: "normal" };

let fontCache: FontEntry[] | null = null;

async function loadFont(filename: string): Promise<ArrayBuffer> {
  // process.cwd() is the project root both in dev (astro dev) and at build time.
  // import.meta.url would point to the bundled dist/ path after build, so we avoid it.
  // Using @fontsource/inter (non-variable) WOFF files — satori doesn't support WOFF2.
  const path = join(process.cwd(), "node_modules/@fontsource/inter/files", filename);
  const buf = await readFile(path);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function getFonts(): Promise<FontEntry[]> {
  if (fontCache) return fontCache;
  const [latin400, latin700, cyr400, cyr700] = await Promise.all([
    loadFont("inter-latin-400-normal.woff"),
    loadFont("inter-latin-700-normal.woff"),
    loadFont("inter-cyrillic-400-normal.woff"),
    loadFont("inter-cyrillic-700-normal.woff"),
  ]);
  // Registering Cyrillic under a different family name so satori's CSS font-family
  // fallback ("Inter", "InterCyr") picks Cyrillic glyphs when Latin subset is missing them.
  fontCache = [
    { name: "Inter", data: latin400, weight: 400, style: "normal" },
    { name: "Inter", data: latin700, weight: 700, style: "normal" },
    { name: "InterCyr", data: cyr400, weight: 400, style: "normal" },
    { name: "InterCyr", data: cyr700, weight: 700, style: "normal" },
  ];
  return fontCache;
}

function OgTemplate({
  title,
  description,
  locale,
}: {
  title: string;
  description: string;
  locale: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: "60px 72px",
        fontFamily: '"Inter", "InterCyr"',
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{ fontSize: 20, fontWeight: 700, color: "#E8453C", letterSpacing: "-0.02em" }}
        >
          Space for Edu
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#62625b",
            backgroundColor: "#f6f6f3",
            padding: "5px 14px",
            borderRadius: 6,
            letterSpacing: "0.08em",
          }}
        >
          {locale.toUpperCase()}
        </span>
      </div>

      {/* Main content */}
      <div
        style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#000000",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#62625b",
            marginTop: "20px",
            lineHeight: 1.5,
            maxWidth: "820px",
          }}
        >
          {description}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 40,
            height: 4,
            backgroundColor: "#E8453C",
            borderRadius: 2,
            marginRight: "16px",
          }}
        />
        <span style={{ fontSize: 16, color: "#91918c" }}>spaceforedu.com</span>
      </div>
    </div>
  );
}

export async function generateOgPng(
  title: string,
  description: string,
  locale: string,
): Promise<Uint8Array> {
  const fonts = await getFonts();

  const svg = await satori(<OgTemplate title={title} description={description} locale={locale} />, {
    width: 1200,
    height: 630,
    fonts,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  return resvg.render().asPng();
}
