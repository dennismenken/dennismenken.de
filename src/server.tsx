import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { secureHeaders } from "hono/secure-headers";
import { getAllPosts } from "./blog";
import { generateFeed } from "./feed";
import Imprint from "./pages/Imprint";
import Index from "./pages/Index";
import Log from "./pages/Log";
import LogEntry from "./pages/LogEntry";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import { renderPage } from "./renderer";

const app = new Hono();

const isDev = process.env.NODE_ENV !== "production";

// Static files
if (!isDev) {
  app.use("/assets/*", serveStatic({ root: "dist/client" }));
}
app.use("/fonts/*", serveStatic({ root: "public" }));
app.use("/favicon.svg", serveStatic({ root: "public" }));
app.use("/robots.txt", serveStatic({ root: "public" }));

// Security headers
app.use(secureHeaders());

// Health check
app.get("/healthz", (c) => c.text("ok"));

// Routes
app.get("/", async (c) => {
  const html = await renderPage({
    page: <Index />,
    title: "Dennis Menken | End-to-End Solutions Architect",
    description:
      "Das Bindeglied zwischen Mensch und Maschine. Ich übersetze die Bedürfnisse von Kunden und deren Nutzern in greifbare technologische Architektur.",
    includeClientScript: true,
  });
  return c.html(html);
});

app.get("/imprint", async (c) => {
  const html = await renderPage({
    page: <Imprint />,
    title: "Impressum - Dennis Menken",
    noIndex: true,
  });
  return c.html(html);
});

app.get("/privacy", async (c) => {
  const html = await renderPage({
    page: <Privacy />,
    title: "Datenschutzerklärung - Dennis Menken",
    noIndex: true,
  });
  return c.html(html);
});

app.get("/log", async (c) => {
  const posts = await getAllPosts();
  const html = await renderPage({
    page: <Log posts={posts} />,
    title: "Logbuch von Dennis Menken",
    description:
      "Persönliches Logbuch eines End to End Solutions Architects. Gedanken über Systemarchitektur, Problemlösung und die Brücke zwischen Business und Technik.",
  });
  return c.html(html);
});

app.get("/log/feed.xml", async (c) => {
  const posts = await getAllPosts();
  const xml = generateFeed(posts);
  return c.text(xml, 200, { "Content-Type": "application/atom+xml; charset=utf-8" });
});

app.get("/sitemap.xml", async (c) => {
  const posts = await getAllPosts();
  const base = "https://dennismenken.de";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `  <url>\n    <loc>${base}/</loc>\n  </url>\n`;
  xml += `  <url>\n    <loc>${base}/log</loc>\n${posts[0] ? `    <lastmod>${posts[0].date}</lastmod>\n` : ""}  </url>\n`;

  for (const post of posts) {
    xml += `  <url>\n    <loc>${base}/log/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n  </url>\n`;
  }

  xml += `</urlset>`;
  return c.text(xml, 200, { "Content-Type": "application/xml; charset=utf-8" });
});

app.get("/log/:slug", async (c) => {
  const slug = c.req.param("slug");
  const posts = await getAllPosts();
  const postIndex = posts.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    const html = await renderPage({
      page: <NotFound />,
      title: "404 - Dennis Menken",
    });
    return c.html(html, 404);
  }

  const post = posts[postIndex];
  const newer = postIndex > 0 ? posts[postIndex - 1] : null;
  const older = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Dennis Menken",
      url: "https://dennismenken.de",
    },
    url: `https://dennismenken.de/log/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dennismenken.de/log/${post.slug}`,
    },
  };

  const html = await renderPage({
    page: <LogEntry post={post} newer={newer} older={older} />,
    title: `${post.title} - Dennis Menken`,
    description: post.description,
    jsonLd,
  });
  return c.html(html);
});

// 404 catch-all
app.notFound(async (c) => {
  const html = await renderPage({
    page: <NotFound />,
    title: "404 - Dennis Menken",
  });
  return c.html(html, 404);
});

// In production, Bun uses the default export to start the server.
// In dev, dev.ts imports { app } and handles serving.
const port = parseInt(process.env.PORT || "3000", 10);

if (!isDev) {
  console.log(`Server running on http://localhost:${port}`);
}

export { app };

export default {
  port,
  fetch: app.fetch,
};
