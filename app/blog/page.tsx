import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/episodes";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on marketing, business, legal, and financial topics for acupuncturists and Chinese medicine herbalists.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 text-lg text-muted">
        Practical articles on building a thriving, sustainable TCM practice.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">New articles are coming soon.</p>
      ) : (
        <ul className="mt-10 divide-y divide-line">
          {posts.map((post) => (
            <li key={post.slug} className="py-6 first:pt-0">
              <article>
                <time
                  dateTime={post.date}
                  className="text-xs font-medium uppercase tracking-wide text-cinnabar"
                >
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 font-serif text-2xl font-semibold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-jade-dark">
                    {post.title}
                  </Link>
                </h2>
                {post.description && (
                  <p className="mt-2 leading-relaxed text-muted">{post.description}</p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-jade hover:text-jade-dark"
                >
                  Read article →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
