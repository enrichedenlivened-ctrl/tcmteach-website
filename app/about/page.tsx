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

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-start">
        <Image
          src="/host.webp"
          alt={site.host.name}
          width={200}
          height={200}
          className="h-28 w-28 shrink-0 rounded-full object-cover"
        />
        <div>
          <h2 className="font-serif text-2xl font-semibold">
            {site.host.name}
          </h2>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-cinnabar">
            {site.host.credentials}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {site.host.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
