import type { Metadata } from "next";
import EpisodeCard from "@/components/EpisodeCard";
import { getEpisodes } from "@/lib/podcast-feed";
import { listenLinks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Episodes",
  description: `All episodes of ${site.name}.`,
};

export const revalidate = 3600;

export default async function EpisodesPage() {
  const { episodes, isLive } = await getEpisodes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        Episodes
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        {isLive
          ? "Every episode, newest first, pulled straight from the show's feed."
          : `${site.episodeCount}+ episodes and counting. Here are a few to start with — browse the full catalog on your favorite app.`}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {listenLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-jade"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
    </div>
  );
}
