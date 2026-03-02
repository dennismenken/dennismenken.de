import type { BlogPost } from "./blog";

const SITE_URL = "https://dennismenken.de";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateFeed(posts: BlogPost[]): string {
  const updated = posts.length > 0 ? `${posts[0].date}T00:00:00Z` : new Date().toISOString();

  const entries = posts
    .map(
      (post) => `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${SITE_URL}/log/${post.slug}" rel="alternate" />
    <id>${SITE_URL}/log/${post.slug}</id>
    <updated>${post.date}T00:00:00Z</updated>
    <summary>${escapeXml(post.description)}</summary>
    <content type="html">${escapeXml(post.html)}</content>
  </entry>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Dennis Menken - Log</title>
  <link href="${SITE_URL}/log/feed.xml" rel="self" />
  <link href="${SITE_URL}/log" rel="alternate" />
  <id>${SITE_URL}/log</id>
  <updated>${updated}</updated>
  <author>
    <name>Dennis Menken</name>
  </author>
${entries}
</feed>`;
}
