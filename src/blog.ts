import { readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const CONTENT_DIR = join(process.cwd(), "content", "log");
const isDev = process.env.NODE_ENV !== "production";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  datetime: string;
  description?: string;
  html: string;
}

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeStringify);

async function parsePost(slug: string, content: string): Promise<BlogPost> {
  const { data, content: markdown } = matter(content);
  const result = await processor.process(markdown);
  const html = String(result);

  // Extract title from first H1
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  let description = typeof data.description === "string" ? data.description.trim() : "";

  if (!description) {
    if (isDev) {
      console.warn(
        `[blog] ${slug}: missing frontmatter description, falling back to first paragraph`,
      );
    }
    const lines = markdown.split("\n");
    let inParagraph = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || trimmed === "") {
        if (inParagraph) break;
        continue;
      }
      if (trimmed.startsWith("---")) continue;
      inParagraph = true;
      description += (description ? " " : "") + trimmed;
    }
    description = description.slice(0, 160);
  }

  const rawDate =
    data.date instanceof Date ? data.date.toISOString() : data.date ? String(data.date) : "";
  const datetime = rawDate.includes("T") ? rawDate : rawDate ? `${rawDate}T00:00:00Z` : "";
  const date = rawDate.split("T")[0] ?? "";

  return {
    slug,
    title,
    date,
    datetime,
    description,
    html,
  };
}

let cachedPosts: BlogPost[] | null = null;

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isDev && cachedPosts) return cachedPosts;

  let files: string[];
  try {
    files = await readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const mdFiles = files.filter((f) => f.endsWith(".md"));
  const posts: BlogPost[] = [];

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, "");
    const raw = await Bun.file(join(CONTENT_DIR, file)).text();
    const post = await parsePost(slug, raw);
    posts.push(post);
  }

  posts.sort((a, b) => (a.datetime > b.datetime ? -1 : 1));

  if (!isDev) cachedPosts = posts;
  return posts;
}
