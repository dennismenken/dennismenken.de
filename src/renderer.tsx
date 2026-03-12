import type { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import type { Manifest } from "vite";

const isDev = process.env.NODE_ENV !== "production";

let manifest: Manifest | null = null;

async function getManifestAsync(): Promise<Manifest> {
  if (manifest) return manifest;
  try {
    const text = await Bun.file("dist/client/.vite/manifest.json").text();
    manifest = JSON.parse(text) as Manifest;
  } catch {
    manifest = {};
  }
  return manifest;
}

async function getAssetUrlAsync(entry: string): Promise<string> {
  if (isDev) return `/${entry}`;
  const m = await getManifestAsync();
  const asset = m[entry];
  return asset ? `/${asset.file}` : `/${entry}`;
}

async function getCssUrlsAsync(): Promise<string[]> {
  if (isDev) return ["/src/styles/index.css"];
  const m = await getManifestAsync();
  const urls: string[] = [];
  for (const entry of Object.values(m)) {
    if (entry.file?.endsWith(".css")) {
      urls.push(`/${entry.file}`);
    }
    if (entry.css) {
      for (const css of entry.css) {
        urls.push(`/${css}`);
      }
    }
  }
  return [...new Set(urls)];
}

let inlineCssCache: string | null = null;

async function getInlineCssAsync(): Promise<string | null> {
  if (isDev) return null;
  if (inlineCssCache) return inlineCssCache;
  const m = await getManifestAsync();
  const files: string[] = [];
  for (const entry of Object.values(m)) {
    if (entry.file?.endsWith(".css")) files.push(entry.file);
    if (entry.css) files.push(...entry.css);
  }
  const unique = [...new Set(files)];
  const contents = await Promise.all(unique.map((f) => Bun.file(`dist/client/${f}`).text()));
  inlineCssCache = contents.join("\n");
  return inlineCssCache;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface RenderOptions {
  page: ReactElement;
  title?: string;
  description?: string;
  canonicalPath?: string;
  includeClientScript?: boolean;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export async function renderPage({
  page,
  title = "Dennis Menken",
  description = "End-to-End Solutions Architect",
  canonicalPath,
  includeClientScript = false,
  noIndex = false,
  jsonLd,
}: RenderOptions): Promise<string> {
  const html = renderToString(page);
  const inlineCss = await getInlineCssAsync();
  const cssUrls = inlineCss ? [] : await getCssUrlsAsync();

  let clientScriptTag = "";
  if (includeClientScript) {
    if (isDev) {
      clientScriptTag = `\n    <script type="module" src="/src/client.tsx"></script>`;
    } else {
      const clientUrl = await getAssetUrlAsync("src/client.tsx");
      clientScriptTag = `\n    <script type="module" src="${clientUrl}"></script>`;
    }
  }

  // In dev, Vite client is needed on every page for CSS HMR.
  // The React Refresh preamble must be set BEFORE any module scripts run.
  const viteClient = isDev
    ? `\n    <script>window.$RefreshReg$ = () => {};window.$RefreshSig$ = () => (type) => type;</script>\n    <script type="module" src="/@vite/client"></script>`
    : "";

  const canonicalTag =
    canonicalPath != null
      ? `\n    <link rel="canonical" href="https://dennismenken.de${canonicalPath}" />`
      : "";

  const robotsMeta = noIndex ? '\n    <meta name="robots" content="noindex, nofollow" />' : "";

  const jsonLdTag = jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    : "";

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />${canonicalTag}${robotsMeta}
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/SpaceGrotesk-Variable.woff2" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    ${inlineCss ? `<style>${inlineCss}</style>` : cssUrls.map((url) => `<link rel="stylesheet" href="${url}" />`).join("\n    ")}
    <link rel="alternate" type="application/atom+xml" title="Dennis Menken - Log" href="/log/feed.xml" />${jsonLdTag}${viteClient}${clientScriptTag}
  </head>
  <body>
    <main id="root">${html}</main>
  </body>
</html>`;
}
