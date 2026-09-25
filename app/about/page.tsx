import type { Metadata } from "next";
import { listenLinks, site } from "@/lib/site";

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
          build thriving, sustainable businesses. With {site.episodeCount}+
          episodes, the show covers what practitioners actually need to grow a
          practice: marketing, patient attraction, pricing, legal and business
          structure, branding, and storytelling.
        </p>
        <p>
          Members get deeper resources and community through the TCM Teach
          membership on Patreon.
        </p>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">
        {site.host.name}
      </h2>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-cinnabar">
        {site.host.credentials}
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {site.host.bio}
      </p>

      <h2 className="mt-12 font-serif text-2xl font-semibold">
        Listen &amp; join
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={site.links.patreon}
          className="rounded-lg bg-cinnabar px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Join the membership
        </a>
        {listenLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-lg border border-line bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-jade"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
