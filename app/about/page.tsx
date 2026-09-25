import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        About the podcast
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          {site.name} helps acupuncturists and Chinese medicine herbalists
          build thriving, sustainable businesses. Weekly episodes on topics
          such as marketing, business logistics, legal frameworks, financial
          tips, and additional revenue drivers utilizing your degree.
        </p>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <Image
          src="/host.webp"
          alt={site.host.name}
          width={200}
          height={200}
          className="h-16 w-16 shrink-0 rounded-full object-cover"
        />
        <div>
          <h2 className="font-serif text-2xl font-semibold">
            {site.host.name}
          </h2>
          <p className="text-sm font-medium uppercase tracking-wide text-cinnabar">
            {site.host.credentials}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
        {site.host.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
