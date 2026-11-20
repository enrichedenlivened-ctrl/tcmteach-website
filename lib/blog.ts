import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  image?: string;
};

export type Post = PostMeta & { html: string };

function toIsoDate(value: unknown) {
  // gray-matter parses unquoted YAML dates into Date objects.
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function readPost(fileName: string): Post | null {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const date = toIsoDate(data.date);
  if (!data.title || !date) {
    console.warn(`Skipping blog post "${fileName}": it needs a title and a valid date.`);
    return null;
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date,
    author: String(data.author ?? "Matthew Sabey Smith"),
    image: data.image ? String(data.image) : undefined,
    html: marked.parse(content, { async: false }),
  };
}

// Files starting with "_" (like the template) are never published.
function postFileNames() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"));
}

export function getAllPosts(): Post[] {
  return postFileNames()
    .map(readPost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}
