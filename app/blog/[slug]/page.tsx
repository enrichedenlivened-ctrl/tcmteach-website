import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/episodes";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [post.image ?? "/logo.jpg"],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name, logo: `${site.url}/logo.jpg` },
    image: `${site.url}${post.image ?? "/logo.jpg"}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <script
        type="application/ld+json"
        // Escape "<" so post text can never close the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Link href="/blog" className="text-sm font-medium text-jade hover:text-jade-dark">
        ← All articles
      </Link>
      <header className="mt-6">
        <time
          dateTime={post.date}
          className="text-xs font-medium uppercase tracking-wide text-cinnabar"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-muted">By {post.author}</p>
      </header>
      {post.image && (
        <Image
          src={post.image}
          alt=""
          width={1200}
          height={630}
          className="mt-8 h-auto w-full rounded-xl"
          priority
        />
      )}
      <div
        className="prose prose-lg mt-10 max-w-none prose-headings:font-serif prose-a:text-jade hover:prose-a:text-jade-dark"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
